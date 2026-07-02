/*
 * app.js — Rush Requests questionnaire controller (standalone dev build).
 *
 * A small render-from-state wizard in plain vanilla JS. The whole body inside
 * the DOMContentLoaded handler is written so it can be lifted, almost verbatim,
 * into a setupRushRequests() function inside DesignBuddyDesktop/app.js when this
 * is migrated into a tab (loadTabContent already calls tab.setup?.() after the
 * partial is injected, which is the same "run after the DOM exists" contract).
 *
 * Depends on window.rushRules (rushRules.js) and window.businessDays
 * (businessDays.js) — both must load before this file.
 */
document.addEventListener("DOMContentLoaded", function () {
    var rules = window.rushRules;
    var bd = window.businessDays;
    var root = document.getElementById("rush-app");
    if (!root || !rules || !bd) return;

    // All user-facing chrome strings live here so Phase 2 can move them into the
    // DesignBuddyDesktop i18n `translations` object (en + fr) with t("rush.*").
    var STRINGS = {
        progress: function (i, n) { return "Step " + i + " of " + n; },
        back: "Back",
        next: "Next",
        seeAnswer: "See my answer",
        startOver: "Start over",
        copy: "Copy summary",
        copied: "Copied!",
        required: "Please fill this in before continuing.",
        chooseOne: "Please choose an option.",
        resultHeading: "Rush request result",
        earliest: "Earliest achievable date",
        capacityNote: function (n) { return "Guideline: up to " + n + " rush requests per day."; },
        verdict: { approved: "Approved", escalate: "Needs approval", denied: "Not possible" }
    };

    var state = {
        steps: rules.questions.slice(), // wizard renders these in order
        index: 0,
        answers: {},
        result: null
    };

    // ---- helpers -----------------------------------------------------------
    function currentStep() {
        return state.steps[state.index];
    }

    function optionsFor(step) {
        if (step.options) return step.options;
        if (step.optionsFrom === "workTypes") {
            return Object.keys(rules.workTypes).map(function (key) {
                return { value: key, label: rules.workTypes[key].label };
            });
        }
        return [];
    }

    function stepError(step) {
        if (!step.required) return null;
        var val = state.answers[step.id];
        if (val === undefined || val === null || String(val).trim() === "") {
            return step.type === "single" ? STRINGS.chooseOne : STRINGS.required;
        }
        return null;
    }

    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    // ---- rendering ---------------------------------------------------------
    function render() {
        if (state.result) {
            renderResult(state.result);
            return;
        }
        var step = currentStep();
        var html = "";
        html += '<div class="rush-progress">' +
            escapeHtml(STRINGS.progress(state.index + 1, state.steps.length)) + "</div>";
        html += '<div class="rush-step">' + renderStep(step) + "</div>";
        html += '<div class="rush-error" id="rush-error" role="alert"></div>';
        html += renderActions();
        root.innerHTML = html;
        wireStep(step);
    }

    function renderStep(step) {
        if (step.type === "info") {
            return '<div class="calculator-description">' + escapeHtml(step.label) + "</div>";
        }
        var label = "<label>" + escapeHtml(step.label) + "</label>";
        if (step.type === "single") {
            var chips = optionsFor(step).map(function (opt) {
                var active = state.answers[step.id] === opt.value ? " active" : "";
                return '<button type="button" class="coverage-button rush-choice' + active +
                    '" data-value="' + escapeHtml(opt.value) + '">' + escapeHtml(opt.label) + "</button>";
            }).join("");
            return label + '<div class="rush-choice-grid">' + chips + "</div>";
        }
        if (step.type === "date") {
            var min = bd.ymd(new Date());
            var dval = state.answers[step.id] ? ' value="' + escapeHtml(state.answers[step.id]) + '"' : "";
            return label + '<input type="date" id="rush-field" min="' + min + '"' + dval + " />";
        }
        var type = step.type === "number" ? "number" : "text";
        var ph = step.placeholder ? ' placeholder="' + escapeHtml(step.placeholder) + '"' : "";
        var val = state.answers[step.id] !== undefined
            ? ' value="' + escapeHtml(String(state.answers[step.id])) + '"' : "";
        return label + '<input type="' + type + '" id="rush-field"' + ph + val + " />";
    }

    function renderActions() {
        var isLast = state.index === state.steps.length - 1;
        var backDisabled = state.index === 0 ? " disabled" : "";
        var nextLabel = isLast ? STRINGS.seeAnswer : STRINGS.next;
        return '<div class="rush-actions">' +
            '<button type="button" class="coverage-button" id="rush-back"' + backDisabled + ">" +
            escapeHtml(STRINGS.back) + "</button>" +
            '<button type="button" class="coverage-button rush-primary" id="rush-next">' +
            escapeHtml(nextLabel) + "</button>" +
            "</div>";
    }

    function renderResult(result) {
        var verdictLabel = STRINGS.verdict[result.verdict] || result.verdict;
        var summary = result.summaryLines.join("\n");
        var html = "";
        html += '<div class="rush-result is-' + escapeHtml(result.verdict) + '">';
        html += '<div class="rush-verdict-badge">' + escapeHtml(verdictLabel) + "</div>";
        html += "<h4>" + escapeHtml(STRINGS.resultHeading) + "</h4>";
        html += "<p>" + escapeHtml(result.message) + "</p>";
        html += '<p class="rush-earliest"><strong>' + escapeHtml(STRINGS.earliest) + ":</strong> " +
            escapeHtml(bd.formatDate(result.earliestDate)) + "</p>";
        if (rules.maxRushPerDay) {
            html += '<p class="muted">' + escapeHtml(STRINGS.capacityNote(rules.maxRushPerDay)) + "</p>";
        }
        html += '<pre class="rush-summary">' + escapeHtml(summary) + "</pre>";
        html += '<div class="rush-actions">' +
            '<button type="button" class="coverage-button" id="rush-restart">' + escapeHtml(STRINGS.startOver) + "</button>" +
            '<button type="button" class="coverage-button rush-primary" id="rush-copy">' + escapeHtml(STRINGS.copy) + "</button>" +
            "</div>";
        html += "</div>";
        root.innerHTML = html;

        var restart = root.querySelector("#rush-restart");
        if (restart) restart.addEventListener("click", function () {
            state.index = 0;
            state.answers = {};
            state.result = null;
            render();
        });
        var copy = root.querySelector("#rush-copy");
        if (copy) copy.addEventListener("click", function () { copyText(summary, copy); });
    }

    // ---- events ------------------------------------------------------------
    function wireStep(step) {
        var chips = root.querySelectorAll(".rush-choice");
        Array.prototype.forEach.call(chips, function (chip) {
            chip.addEventListener("click", function () {
                state.answers[step.id] = chip.getAttribute("data-value");
                render(); // re-render so the .active highlight updates
            });
        });
        var field = root.querySelector("#rush-field");
        if (field) {
            field.addEventListener("input", function () { state.answers[step.id] = field.value; });
        }
        var back = root.querySelector("#rush-back");
        if (back) back.addEventListener("click", goBack);
        var next = root.querySelector("#rush-next");
        if (next) next.addEventListener("click", goNext);
    }

    function showError(msg) {
        var el = root.querySelector("#rush-error");
        if (el) el.textContent = msg || "";
    }

    function goBack() {
        if (state.index > 0) {
            state.index--;
            state.result = null;
            render();
        }
    }

    function goNext() {
        var step = currentStep();
        var err = stepError(step);
        if (err) { showError(err); return; }
        if (state.index === state.steps.length - 1) {
            compute();
        } else {
            state.index++;
        }
        render();
    }

    function compute() {
        state.result = rules.decide(state.answers, {
            now: new Date(),
            bd: bd,
            holidays: rules.holidays
        });
    }

    // ---- clipboard ---------------------------------------------------------
    function copyText(text, btn) {
        function done() {
            var old = btn.textContent;
            btn.textContent = STRINGS.copied;
            setTimeout(function () { btn.textContent = old; }, 1500);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
        } else {
            fallbackCopy(text);
            done();
        }
    }

    function fallbackCopy(text) {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e) { /* ignore */ }
        document.body.removeChild(ta);
    }

    render();
});
