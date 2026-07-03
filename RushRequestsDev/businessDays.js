/*
 * businessDays.js — pure business-day date math (no DOM, no dependencies).
 *
 * Attaches a single namespace, window.businessDays, mirroring the data-module
 * pattern used by fingerSizes.js / contacts.js in DesignBuddyDesktop. Every
 * function is pure so this file can be dropped into DesignBuddyDesktop verbatim
 * (or inlined at module scope next to calcEternityStoneCount) when the
 * questionnaire is migrated into a tab.
 *
 * Holidays are passed in as an array of "YYYY-MM-DD" strings; this file never
 * imports the rules config, so the owner maintains holidays in rushRules.js.
 */
window.businessDays = (function () {
    // Strip the time component -> local midnight. Avoids DST / time-of-day drift.
    function startOfDay(date) {
        var d = new Date(date);
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }

    // Stable "YYYY-MM-DD" key in LOCAL time (used for holiday lookups + <input min>).
    function ymd(date) {
        var d = startOfDay(date);
        var m = String(d.getMonth() + 1).padStart(2, "0");
        var day = String(d.getDate()).padStart(2, "0");
        return d.getFullYear() + "-" + m + "-" + day;
    }

    function addCalendarDays(date, n) {
        var d = startOfDay(date);
        d.setDate(d.getDate() + n);
        return d;
    }

    function isWeekend(date) {
        var day = startOfDay(date).getDay(); // 0 = Sunday ... 6 = Saturday
        return day === 0 || day === 6;
    }

    function isHoliday(date, holidays) {
        if (!holidays || !holidays.length) return false;
        return holidays.indexOf(ymd(date)) !== -1;
    }

    function isBusinessDay(date, holidays) {
        return !isWeekend(date) && !isHoliday(date, holidays);
    }

    // First business day on OR after `date`.
    function nextBusinessDayOnOrAfter(date, holidays) {
        var d = startOfDay(date);
        var guard = 0;
        while (!isBusinessDay(d, holidays)) {
            d = addCalendarDays(d, 1);
            if (++guard > 3650) break; // safety valve
        }
        return d;
    }

    // First business day STRICTLY after `date`.
    function nextBusinessDay(date, holidays) {
        return nextBusinessDayOnOrAfter(addCalendarDays(date, 1), holidays);
    }

    // Advance `n` business days from `startDate`.
    //   n = 0  -> the soonest business day on/after startDate.
    //   n >= 1 -> that many business days beyond that soonest day.
    function addBusinessDays(startDate, n, holidays) {
        var d = nextBusinessDayOnOrAfter(startDate, holidays);
        var remaining = Math.max(0, Math.floor(n || 0));
        var guard = 0;
        while (remaining > 0) {
            d = addCalendarDays(d, 1);
            if (isBusinessDay(d, holidays)) remaining--;
            if (++guard > 3650) break; // safety valve
        }
        return d;
    }

    // Count of business days in the interval (a, b] — excludes a, includes b.
    // Returns 0 when b is on or before a.
    function businessDaysBetween(a, b, holidays) {
        var start = startOfDay(a);
        var end = startOfDay(b);
        if (end <= start) return 0;
        var count = 0;
        var d = addCalendarDays(start, 1);
        var guard = 0;
        while (d <= end) {
            if (isBusinessDay(d, holidays)) count++;
            d = addCalendarDays(d, 1);
            if (++guard > 3650) break; // safety valve
        }
        return count;
    }

    // Parse a "YYYY-MM-DD" string (from <input type="date">) as LOCAL midnight,
    // NOT UTC, to avoid an off-by-one day across timezones.
    function parseInputDate(value) {
        if (!value) return null;
        var parts = String(value).split("-").map(Number);
        if (parts.length !== 3 || parts.some(isNaN)) return null;
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }

    function formatDate(date, locale) {
        return startOfDay(date).toLocaleDateString(locale || "en-CA", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    }

    return {
        startOfDay: startOfDay,
        ymd: ymd,
        isWeekend: isWeekend,
        isHoliday: isHoliday,
        isBusinessDay: isBusinessDay,
        nextBusinessDay: nextBusinessDay,
        nextBusinessDayOnOrAfter: nextBusinessDayOnOrAfter,
        addBusinessDays: addBusinessDays,
        businessDaysBetween: businessDaysBetween,
        parseInputDate: parseInputDate,
        formatDate: formatDate
    };
})();
