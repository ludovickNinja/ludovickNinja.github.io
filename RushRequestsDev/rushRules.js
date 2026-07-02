/*
 * ============================================================================
 *  RUSH REQUEST BUSINESS RULES  —  *** EDIT ME ***
 * ============================================================================
 *  This is the ONLY file you need to touch to change how Rush Requests behave.
 *  Every value below is a PLACEHOLDER guess — replace them with the real
 *  CrownRing policy (holidays, cutoff, lead times, approval thresholds).
 *
 *  Loads as a plain <script> and attaches window.rushRules, exactly like
 *  fingerSizes.js / contacts.js in DesignBuddyDesktop.
 *  Requires window.businessDays (businessDays.js must load BEFORE this file).
 * ============================================================================
 */
window.rushRules = {

    // ---- 1. Calendar / capacity context ------------------------------------

    // Company holidays (no production on these days). "YYYY-MM-DD".
    // EDIT ME — use real CrownRing closure dates, and keep them current yearly.
    holidays: [
        "2026-01-01", // New Year's Day
        "2026-07-01", // Canada Day
        "2026-09-07", // Labour Day
        "2026-12-25", // Christmas Day
        "2026-12-26"  // Boxing Day
    ],

    // Daily order cutoff (local time, 24h "HH:MM"). A request submitted AFTER
    // this time is treated as if it arrived the next business day. EDIT ME.
    dailyCutoff: "12:00",

    // Informational ceiling: how many rushes we think can be absorbed per day.
    // NOTE: the dev build has no backend, so this is NOT enforced yet (there is
    // no shared counter) — it is shown to the agent as guidance only. EDIT ME.
    maxRushPerDay: 5,

    // ---- 2. Per-work-type lead times (in BUSINESS days) --------------------
    // key -> {
    //   label                 : shown in the questionnaire,
    //   leadTimeDays          : normal business-day lead time,
    //   rushable              : false => ALWAYS escalate (cannot be auto-approved),
    //   autoApproveWithinDays : auto-APPROVE only if the requested date leaves AT
    //                           LEAST this many business days of buffer beyond the
    //                           earliest achievable date; otherwise ESCALATE.
    //                           Set to 0 to approve as soon as it is achievable.
    // }
    // EDIT ME — these numbers are placeholders.
    workTypes: {
        newCad:         { label: "New CAD design",              leadTimeDays: 5,  rushable: true,  autoApproveWithinDays: 2 },
        cadRevision:    { label: "CAD revision",                leadTimeDays: 2,  rushable: true,  autoApproveWithinDays: 0 },
        casting:        { label: "Casting",                     leadTimeDays: 7,  rushable: true,  autoApproveWithinDays: 3 },
        stoneSetting:   { label: "Stone setting",               leadTimeDays: 4,  rushable: true,  autoApproveWithinDays: 1 },
        finishing:      { label: "Polishing / finishing",       leadTimeDays: 2,  rushable: true,  autoApproveWithinDays: 0 },
        fullProduction: { label: "Full production (all steps)", leadTimeDays: 15, rushable: false, autoApproveWithinDays: 0 }
    },

    // ---- 3. Questionnaire definition (drives the wizard UI) ----------------
    // The wizard renders these steps in array order. EDIT ME freely.
    //   type: "text" | "single" | "date" | "number" | "info"
    //   id  : the key the answer is stored under
    //   optionsFrom: "workTypes" auto-builds the choices from workTypes above
    questions: [
        { id: "agentName",     type: "text",   label: "Your name",                     required: true,  placeholder: "e.g. Alex" },
        { id: "orderRef",      type: "text",   label: "Order / job number",            required: true,  placeholder: "e.g. CR-12345" },
        { id: "workType",      type: "single", label: "What work is being requested?", required: true,  optionsFrom: "workTypes" },
        { id: "requestedDate", type: "date",   label: "Requested delivery date",       required: true },
        { id: "notes",         type: "text",   label: "Anything else we should know?", required: false, placeholder: "Optional" }
    ],

    // ---- 4. Decision function: answers -> verdict --------------------------
    // ctx = { now: Date, bd: window.businessDays, holidays: [...] }
    // returns { earliestDate, verdict, message, summaryLines }
    //   verdict is one of: "approved" | "escalate" | "denied"
    // EDIT ME — this single function is the whole policy.
    decide: function (answers, ctx) {
        var bd = ctx.bd;
        var holidays = this.holidays;
        var wt = this.workTypes[answers.workType];

        // 1) Clock start = today, bumped to the next business day if we're past
        //    the daily cutoff (or today isn't a business day).
        var start = bd.startOfDay(ctx.now);
        var cutoff = String(this.dailyCutoff || "23:59").split(":").map(Number);
        var pastCutoff =
            ctx.now.getHours() > cutoff[0] ||
            (ctx.now.getHours() === cutoff[0] && ctx.now.getMinutes() >= (cutoff[1] || 0));
        if (pastCutoff || !bd.isBusinessDay(start, holidays)) {
            start = bd.nextBusinessDay(start, holidays);
        }

        // 2) Earliest achievable date = start + lead time (in business days).
        var leadTime = wt ? wt.leadTimeDays : 0;
        var earliestDate = bd.addBusinessDays(start, leadTime, holidays);

        // 3) Compare the requested date against the earliest achievable date.
        var requested = bd.parseInputDate(answers.requestedDate);
        var verdict, message;

        if (!wt || !wt.rushable) {
            verdict = "escalate";
            message = (wt ? wt.label : "This work") +
                " can't be auto-approved as a rush — escalating to a manager. Earliest realistic date: " +
                bd.formatDate(earliestDate) + ".";
        } else if (requested && requested < earliestDate) {
            verdict = "escalate";
            message = "Requested date " + bd.formatDate(requested) +
                " is sooner than the earliest achievable date " + bd.formatDate(earliestDate) +
                ". Escalating for manager review.";
        } else {
            // Business days of buffer between the earliest date and the requested date.
            var runway = requested ? bd.businessDaysBetween(earliestDate, requested, holidays) : 0;
            if (runway >= (wt.autoApproveWithinDays || 0)) {
                verdict = "approved";
                message = "Approved. We can deliver " + wt.label.toLowerCase() +
                    " by " + bd.formatDate(requested || earliestDate) + ".";
            } else {
                verdict = "escalate";
                message = "Tight timeline — only " + runway +
                    " business day(s) of buffer past the earliest date. Escalating for confirmation. Earliest safe date: " +
                    bd.formatDate(earliestDate) + ".";
            }
        }

        return {
            earliestDate: earliestDate,
            verdict: verdict,
            message: message,
            summaryLines: buildSummary(answers, earliestDate, verdict, this)
        };
    }
};

// Builds the copy-to-clipboard summary lines. EDIT ME to change the format.
function buildSummary(answers, earliestDate, verdict, rules) {
    var wt = rules.workTypes[answers.workType];
    return [
        "RUSH REQUEST — " + verdict.toUpperCase(),
        "Agent: " + (answers.agentName || "-"),
        "Order: " + (answers.orderRef || "-"),
        "Work: " + (wt ? wt.label : (answers.workType || "-")),
        "Requested: " + (answers.requestedDate || "-"),
        "Earliest achievable: " + window.businessDays.formatDate(earliestDate),
        answers.notes ? "Notes: " + answers.notes : null
    ].filter(Boolean);
}
