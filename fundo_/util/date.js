/*
 * This file is part of the fundo_ project.
 * Copyright (c) 2025 Robin Exner (https://robinexner.de)
 * GitHub: https://github.com/robinexner/fundo_
 * This software is licensed under the MIT License.
 * See the LICENSE file for more information.
 */

/**
 * @namespace DateUtils
 * @description A collection of helpful functions to handle dates in JavaScript.
 */

const FundoLocale = require('./locale');

const FundoDateUtils = {
    /**
     * Get the current date and time.
     * @returns {Date} The current date and time.
     */
    getCurrentDateTime: function() {
        return new Date();
    },

    /**
     * Format a date to a string.
     * If a format string is provided, it formats the date according to the format.
     * If no format string is provided, it formats the date based on the user's locale.
     * @param {Date} date - The date to format.
     * @param {string} [format] - The format string (e.g., 'YYYY-MM-DD').
     * @returns {string} The formatted date string.
     */
    formatDate: function(date, format) {
        if (format) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return format.replace('YYYY', year).replace('MM', month).replace('DD', day);
        } else {
            const locale = this.detectUserLocale();
            return new Intl.DateTimeFormat(locale).format(date);
        }
    },

    /**
     * Parse a date string in the format YYYY-MM-DD to a Date object.
     * @param {string} dateString - The date string to parse.
     * @returns {Date} The parsed Date object.
     */
    parseDate: function(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    },

    /**
     * Add days to a date.
     * @param {Date} date - The date to add days to.
     * @param {number} days - The number of days to add.
     * @returns {Date} The new date.
     */
    addDays: function(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    },

    /**
     * Subtract days from a date.
     * @param {Date} date - The date to subtract days from.
     * @param {number} days - The number of days to subtract.
     * @returns {Date} The new date.
     */
    subtractDays: function(date, days) {
        return this.addDays(date, -days);
    },

    /**
     * Get the difference in days between two dates.
     * @param {Date} date1 - The first date.
     * @param {Date} date2 - The second date.
     * @returns {number} The difference in days.
     */
    differenceInDays: function(date1, date2) {
        const diffTime = Math.abs(date2 - date1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },

    /**
     * Check if a date is before another date.
     * @param {Date} date1 - The first date.
     * @param {Date} date2 - The second date.
     * @returns {boolean} True if date1 is before date2.
     */
    isBefore: function(date1, date2) {
        return date1 < date2;
    },

    /**
     * Check if a date is after another date.
     * @param {Date} date1 - The first date.
     * @param {Date} date2 - The second date.
     * @returns {boolean} True if date1 is after date2.
     */
    isAfter: function(date1, date2) {
        return date1 > date2;
    },

    /**
     * Check if a date is between two dates.
     * @param {Date} date - The date to check.
     * @param {Date} startDate - The start date.
     * @param {Date} endDate - The end date.
     * @returns {boolean} True if date is between startDate and endDate.
     */
    isBetween: function(date, startDate, endDate) {
        return date > startDate && date < endDate;
    },

    /**
     * Detect the user's locale.
     * @returns {string} The detected locale code.
     */
    detectUserLocale: function() {
        const fundoLocale = new FundoLocale();
        return fundoLocale.detectBrowserLocale();
    }
};

module.exports = DateUtils;