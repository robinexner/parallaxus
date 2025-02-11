/*
 * This file is part of the fundo_ project.
 * Copyright (c) 2025 Robin Exner (https://robinexner.de)
 * GitHub: https://github.com/robinexner/fundo_
 * This software is licensed under the MIT License.
 * See the LICENSE file for more information.
 */

export class FundoLocale {
    constructor(locales = {}, defaultLocale = this.detectBrowserLocale()) {
        this.locales = locales;
        this.currentLocale = defaultLocale;
        this.translations = locales[defaultLocale] || {};
    }

    /**
     * Detect the user's preferred language from the browser.
     * @returns {string} Detected language code (e.g., 'en', 'fr').
     */
    detectBrowserLocale() {
        return (navigator.language || 'en').slice(0, 2);
    }

    /**
     * Set the current language and load translations.
     * @param {string} locale - The language code (e.g., 'en', 'fr').
     */
    setLocale(locale) {
        if (this.locales[locale]) {
            this.currentLocale = locale;
            this.translations = this.locales[locale];
        } else {
            console.warn(`Locale '${locale}' not available.`);
        }
    }

    /**
     * Get the current language code.
     * @returns {string} Current language code.
     */
    getLocale() {
        return this.currentLocale;
    }

    /**
     * Translate a key to the current locale.
     * Supports dot-notation for nested keys and placeholders.
     * @param {string} key - The translation key, e.g., "cookieCategories.0.title".
     * @param {object} [placeholders={}] - Optional placeholders.
     * @returns {string} Translated text or the key if not found.
     */
    t(key, placeholders = {}) {
        let text = this._getNestedValue(this.translations, key) || key;

        if (typeof text === 'string') {
            for (const [placeholder, value] of Object.entries(placeholders)) {
                text = text.replace(new RegExp(`{{${placeholder}}}`, 'g'), value);
            }
        }

        return text;
    }

    /**
     * Add new translations or extend existing ones.
     * @param {object} locales - Object containing locale data.
     */
    extend(locales) {
        const mergeDeep = (target, source) => {
            for (const key of Object.keys(source)) {
                if (Array.isArray(source[key])) {
                    target[key] = source[key]; // Replace arrays
                } else if (source[key] instanceof Object && key in target) {
                    target[key] = mergeDeep(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
            return target;
        };

        for (const [locale, translations] of Object.entries(locales)) {
            this.locales[locale] = mergeDeep(this.locales[locale] || {}, translations);
        }
    }

    /**
     * Check if a specific translation key exists.
     * @param {string} key - Translation key.
     * @returns {boolean} True if the key exists.
     */
    has(key) {
        return this._getNestedValue(this.translations, key) !== undefined;
    }

    /**
     * Get the list of available locales.
     * @returns {string[]} Array of available locale codes.
     */
    langs() {
        return Object.keys(this.locales);
    }

    /**
     * Retrieve nested values from an object using dot notation.
     * Supports array indexing, e.g., "cookieCategories.0.title".
     * @param {object} obj - The object to search.
     * @param {string} path - Dot-separated path.
     * @returns {*} The value found, or undefined.
     */
    _getNestedValue(obj, path) {
        return path.split('.').reduce((acc, part) => {
            if (acc && typeof acc === 'object') {
                return acc[part];
            }
            return undefined;
        }, obj);
    }
}

export default FundoLocale;