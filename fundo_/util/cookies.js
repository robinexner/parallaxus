/*
 * This file is part of the fundo_ project.
 * Copyright (c) 2025 Robin Exner (https://robinexner.de)
 * GitHub: https://github.com/robinexner/fundo_
 * This software is licensed under the MIT License.
 * See the LICENSE file for more information.
 */


import FundoLocale from './locale.js';
import { Notification } from '../notification/notification.js';

/**
 * Class representing the FundoCookies.
 */
export class FundoCookies {
    constructor() {
        this.locales = {
            en: {
                cookieMessageHeadline: "A cookie here, a cookie there. That's how it works.",
                cookieMessage: "We use cookies to enhance your experience on our website. By continuing to browse, you consent to our use of cookies. You can manage your preferences or opt-out at any time.",
                allowAllCookies: 'Allow all cookies',
                saveSettings: 'Save settings',
                cancel: 'Cancel',
                showMore: 'Have a look at more details',
                showLess: 'Show less',
                description: "Description",
                expires: "Expires",
                provider: "Provider",
                cookieCategories: [{
                    identifier: "necessary",
                    title: "Necessary",
                    description: "Necessary Cookies are always active. They help make a website usable by enabling basic functions like storing your cookie consent status and general settings.",
                    cookieList: [
                        { name: "consentSettings", description: "Stores the user's consent settings for cookies.", expires: "365 Days", provider: "cookiejars.js" },
                        { name: "cookieCategories", description: "Stores the categories of cookies the user has allowed to be able to remove cookies when changing the settings at a later time.", expires: "365 Days", provider: "cookiejars.js" }
                    ],
                    necessary: true
                }, {
                    identifier: "functional",
                    title: "Functional",
                    description: "Functional Cookies help improve the functionality of the website. They enable the website to provide enhanced functionality and personalization.",
                    cookieList: [
                        { name: "DarkMode", description: "Saves the user's preference for dark mode.", expires: "365 Days", provider: "Example Page" },
                        { name: "Language", description: "Saves the user's preferred language.", expires: "365 Days", provider: "Example Page" }
                    ]
                }, {
                    identifier: "analytics",
                    title: "Analytics",
                    description: "Analytics Cookies help improve this website. They help us understand how visitors interact with the website by collecting and reporting information.",
                    cookieList: [
                        { name: "UnicornTracker", description: "Tracks unicorn sightings and rainbow generation.", expires: "365 Days", provider: "Unicorn Society" },
                        { name: "DragonHeatmap", description: "Provides heatmaps of dragon lairs and treasure locations.", expires: "365 Days", provider: "Dragon Watchers" }
                    ]
                }, {
                    identifier: "marketing",
                    title: "Marketing",
                    description: "Marketing Cookies help pay the bills. They are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.",
                    cookieList: [
                        { name: "FaceLookPixel", description: "Tracks how often you look at your own profile picture.", expires: "365 Days", provider: "FaceLook" },
                        { name: "GiggleAds", description: "Tracks how many times you clicked away their stupid ads.", expires: "365 Days", provider: "Giggle" }
                    ]
                }],
            },
            de: {
                cookieMessageHeadline: "Ein Keks hier, ein Keks da. So läuft das hier.",
                cookieMessage: "Wir verwenden Cookies, um Ihr Erlebnis auf unserer Website zu verbessern. Wenn Sie weiterhin auf der Website surfen, stimmen Sie der Verwendung von Cookies zu. Sie können Ihre Einstellungen verwalten oder jederzeit widerrufen.",
                allowAllCookies: "Alle Cookies erlauben",
                saveSettings: "Einstellungen speichern",
                cancel: "Abbrechen",
                showMore: "Schau Dir mehr Details an",
                showLess: "Weniger anzeigen",
                description: "Beschreibung",
                expires: "Läuft ab",
                provider: "Anbieter",
                cookieCategories: [{
                    identifier: "necessary",
                    title: "Notwendig",
                    description: "Notwendige Cookies sind immer aktiv. Sie helfen dabei, eine Website nutzbar zu machen, indem sie beispielsweise die Speicherung der Zustimmung zum Cookie-Hinweis und allgemeine Einstellungen ermöglichen.",
                    cookieList: [
                        { name: "consentSettings", description: "Speichert die Benutzereinstellungen für Cookies.", expires: "365 Tage", provider: "cookiejars.js" },
                        { name: "cookieCategories", description: "Speichert die Kategorien von Cookies, die der Benutzer erlaubt hat, um Cookies bei Änderung der Einstellungen wieder entfernen zu können.", expires: "365 Tage", provider: "cookiejars.js" }
                    ],
                    necessary: true
                }, {
                    identifier: "functional",
                    title: "Funktional",
                    description: "Funktionale Cookies verbessern die Funktionalität der Website. Sie ermöglichen es der Website, erweiterte Funktionalitäten und Personalisierung bereitzustellen.",
                    cookieList: [
                        { name: "DarkMode", description: "Speichert die Benutzereinstellung für den Dunkelmodus.", expires: "365 Tage", provider: "Beispiel Seite" },
                        { name: "Language", description: "Speichert die bevorzugte Sprache des Benutzers.", expires: "365 Tage", provider: "Beispiel Seite" }
                    ]
                }, {
                    identifier: "analytics",
                    title: "Analyse",
                    description: "Analyse Cookies helfen, diese Website zu verbessern. Sie helfen uns zu verstehen, wie Besucher mit der Website interagieren, indem Informationen gesammelt und gemeldet werden.",
                    cookieList: [
                        { name: "Einhorn Tracker", description: "Verfolgt Einhornsichtungen und Regenbogenerzeugung.", expires: "365 Tage", provider: "Einhorn Gesellschaft" },
                        { name: "Drachen Heatmap", description: "Bietet Heatmaps von Drachenhöhlen und Schatzstandorten.", expires: "365 Tage", provider: "Drachen Beobachter" }
                    ]
                }, {
                    identifier: "marketing",
                    title: "Marketing",
                    description: "Marketing Cookies helfen, die Rechnungen zu bezahlen. Sie werden verwendet, um Besucher über Websites hinweg zu verfolgen. Das Ziel ist es, Anzeigen zu schalten, die für den einzelnen Nutzer relevant und ansprechend sind und damit für Publisher und Drittanbieter-Werbetreibende wertvoller sind.",
                    cookieList: [
                        { name: "GesichtsbuchPixel", description: "Verfolgt, wie häufig Du Dein eigenes Profilbild ansiehst.", expires: "365 Tage", provider: "Gesichtsbuch" },
                        { name: "GugelWerbung", description: "Verfolgt, wie oft Du ihre blöden Anzeigen wegklickst.", expires: "365 Tage", provider: "Gugel" }
                    ]
                }],
            }
        };

        this.locs = new FundoLocale(this.locales);
        this.cookieConsentNotification = false;
        this.consentSettings = this.getConsentSettings();
        this.cookieCategories = this.getCookieCategories();

        window.showCookieConsentNotification = this.showCookieConsentNotification.bind(this);

        this.updateAllCookieExpirations();
    }

    /**
     * Creates a notification element.
     * @param {string} title - The title of the notification.
     * @param {string} content - The content of the notification.
     * @param {Array} buttons - The buttons to be added to the notification.
     * @returns {HTMLElement} The notification element.
     */
    createNotification(title, content, buttons = []) {
        let notificationRef = document.createElement("div");
        notificationRef.classList.add("notification");

        let notificationHeader = document.createElement("h3");
        notificationHeader.innerHTML = title;
        notificationRef.append(notificationHeader);

        let notificationContent = document.createElement("div");
        notificationContent.classList.add("notification__content");
        notificationContent.innerHTML = content;
        notificationRef.append(notificationContent);

        let notificationButtons = document.createElement("div");
        notificationButtons.classList.add("notification__buttons");

        buttons.forEach((butt) => {
            let tmpButtElement = document.createElement("div");
            tmpButtElement.classList.add("button");
            butt.classnames.forEach((cn) => {
                tmpButtElement.classList.add(cn);
            });

            tmpButtElement.innerHTML = butt.title;

            tmpButtElement.addEventListener("click", butt.handler);
            notificationButtons.append(tmpButtElement);
        });

        notificationRef.append(notificationButtons);

        document.body.append(notificationRef);

        return notificationRef;
    }

    /**
     * Checks if a category is allowed based on consent settings.
     * @param {string} category - The category to check.
     * @returns {boolean} True if the category is allowed, false otherwise.
     */
    isCategoryAllowed(category) {
        this.consentSettings = this.getConsentSettings();
        return this.consentSettings[category] === "true";
    }

    /**
     * Shows the cookie consent notification.
     * @returns {Promise} A promise that resolves when the notification is shown.
     */
    async showCookieConsentNotification() {
        return new Promise((resolve, reject) => {
            if (this.cookieConsentNotification) {
                reject("Error: Cookie consent notification already open");
                return;
            }

            let title = this.locs.t('cookieMessageHeadline');
            let content = "<div>" + this.locs.t('cookieMessage') + "</div>";
            content += "<p class='show-more-details link' data-category-id='all-categories' style='cursor: pointer;'>" + this.locs.t('showMore') + "</p>";
            content += "<div id='cookie-categories' style='display: none;'>";

            this.locs.t('cookieCategories').forEach(category => {
                let isChecked = category.necessary || this.isCategoryAllowed(category.identifier);
                content += "<div style='display: flex; align-items: center;'>";
                content += "<h3 style='display: inline;'><label for='" + category.identifier + "'><input type='checkbox' style='margin-right: .5em;' id='" + category.identifier + "' name='" + category.identifier + "' " + (isChecked ? " checked" : "") + " " + (category.necessary ? " disabled" : "") + ">" + category.title + "</label></h3>";
                content += "</div>";
                content += "<p>" + category.description + "<br><span class='show-more-details link' data-category-id='" + category.identifier + "' style='cursor: pointer;'>" + this.locs.t('showMore') + "</span></p>";
                content += "";
                content += "<div class='details' id='details-" + category.identifier + "' style='display: none;'>";
                content += "<table>";
                content += "<thead>";
                content += "<tr>";
                content += "<th>Cookie</th>";
                content += "<th>" + this.locs.t('description') + "</th>";
                content += "<th>" + this.locs.t('expires') + "</th>";
                content += "<th>" + this.locs.t('provider') + "</th>";
                content += "</tr>";
                content += "</thead>";
                category.cookieList.forEach(cookie => {
                    content += "<tr>";
                    content += "<td>" + cookie.name + "</td>";
                    content += "<td>" + cookie.description + "</td>";
                    content += "<td>" + cookie.expires + "</td>";
                    content += "<td>" + cookie.provider + "</td>";
                    content += "</tr>";
                });
                content += "</table>";
                content += "</div>";
            });

            content += "</div>";

            const buttons = [{
                title: this.locs.t('allowAllCookies'),
                handler: () => {
                    this.locs.translations.cookieCategories.forEach(category => {
                        this.updateConsentSettings(category.identifier, "true");
                    });

                    this.hideCookieConsentNotification();
                    resolve();
                },
                classnames: ["button", "button--highlighted", "button--cookie-action"]
            }, {
                title: this.locs.t('saveSettings'),
                handler: () => {
                    this.locs.translations.cookieCategories.forEach(category => {
                        const checkbox = document.getElementById(category.identifier);
                        if (checkbox && checkbox.checked) {
                            this.updateConsentSettings(category.identifier, "true");
                        } else {
                            this.updateConsentSettings(category.identifier, "false");
                        }
                    });

                    this.hideCookieConsentNotification();
                    resolve();
                },
                classnames: ["button", "button--highlighted", "button--cookie-action", "hidden"]
            }, {
                title: this.locs.t('allowAllCookies'),
                handler: () => {
                    this.locs.translations.cookieCategories.forEach(category => {
                        this.updateConsentSettings(category.identifier, "true");
                    });

                    this.hideCookieConsentNotification();
                    resolve();
                },
                classnames: ["button", "button--cookie-action", "hidden"]
            }, {
                title: this.locs.t('cancel'),
                handler: () => {
                    this.hideCookieConsentNotification();
                    reject("User canceled cookie consent notification");
                },
                classnames: ["button"]
            }];

            const notification = new Notification(title, content, buttons);
            notification.show();
            this.cookieConsentNotification = notification.element;

            this.cookieConsentNotification.querySelectorAll('.show-more-details').forEach(element => {
                element.addEventListener('click', event => {
                    const categoryId = event.target.getAttribute('data-category-id');
                    const detailsElement = categoryId === 'all-categories' ?
                        document.getElementById('cookie-categories') :
                        document.getElementById(`details-${categoryId}`);
                    if (detailsElement) {
                        const isHidden = detailsElement.style.display === 'none';
                        detailsElement.style.display = isHidden ? 'block' : 'none';
                        event.target.textContent = isHidden ? this.locs.t('showLess') : this.locs.t('showMore');

                        if (isHidden) {
                            this.cookieConsentNotification.querySelectorAll('.button--cookie-action').forEach(button => {
                                button.classList.toggle('hidden');
                                button.classList.remove('button--cookie-action');
                            });
                        }
                    }
                });
            });

            if (Object.keys(this.consentSettings).length > 0) {
                document.getElementById('cookie-categories').style.display = 'block';
                this.cookieConsentNotification.getElementsByClassName('show-more-details')[0].textContent = this.locs.t('showLess');
                this.cookieConsentNotification.querySelectorAll('.button--cookie-action').forEach(button => {
                    button.classList.toggle('hidden');
                    button.classList.remove('button--cookie-action');
                });
            }

            document.body.append(this.cookieConsentNotification);
        });
    }

    /**
     * Hides the cookie consent notification.
     */
    hideCookieConsentNotification() {
        if (this.cookieConsentNotification) {
            this.cookieConsentNotification.remove();
            this.cookieConsentNotification = false;
        }
    }

    /**
     * Gets the expiration date from milliseconds.
     * @param {number} ms - The milliseconds to add to the current date.
     * @returns {string} The expiration date in UTC string format.
     */
    getExpirationDateFromMilliseconds(ms) {
        const d = new Date();
        d.setTime(d.getTime() + ms);
        return d.toUTCString();
    }

    /**
     * Stores a cookie.
     * @param {string} name - The name of the cookie.
     * @param {string} value - The value of the cookie.
     * @param {string} expirationdate - The expiration date of the cookie.
     */
    storeCookie(name, value, expirationdate, rolling = false) {
        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expirationdate + ";path=/;SameSite=Strict";
    }

    /**
     * Adds a cookie to the list of rolling expiration cookies.
     * @param {string} name - The name of the cookie.
     */
    addRollingExpirationCookie(name) {
        let rollingCookies = this.getCookieValue('rollingCookies');
        rollingCookies = rollingCookies ? JSON.parse(rollingCookies) : [];
        if (!rollingCookies.includes(name)) {
            rollingCookies.push(name);
            const expirationdate = this.getExpirationDateFromMilliseconds(365 * 24 * 60 * 60 * 1000); // 1 year
            this.storeCookie('rollingCookies', JSON.stringify(rollingCookies), expirationdate);
        }
    }

    /**
     * Updates the expiration dates of all cookies with rolling expiration.
     */
    updateAllCookieExpirations() {
        const rollingCookies = this.getCookieValue('rollingCookies');
        if (rollingCookies) {
            const cookies = JSON.parse(rollingCookies);
            cookies.forEach(cookie => {
                this.updateCookieExpiration(cookie);
            });
            // Update the rollingCookies cookie itself
            const expirationdate = this.getExpirationDateFromMilliseconds(365 * 24 * 60 * 60 * 1000); // 1 year
            this.storeCookie('rollingCookies', JSON.stringify(cookies), expirationdate);
        }
    }

    /**
     * Updates the expiration date of a cookie.
     * @param {string} name - The name of the cookie.
     * @param {number} exdays - The number of days until the cookie expires.
     */
    updateCookieExpiration(name, exdays = 365) {
        const value = this.getCookieValue(name);
        if (value) {
            const expirationdate = this.getExpirationDateFromMilliseconds(exdays * 24 * 60 * 60 * 1000);
            this.storeCookie(name, value, expirationdate);
        }
    }

    /**
     * Gets the value of a cookie.
     * @param {string} name - The name of the cookie.
     * @returns {string|null} The value of the cookie, or null if not found.
     */
    getCookieValue(name) {
        const cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].split('=');
            if (cookie[0] === name) {
                return decodeURIComponent(cookie[1]);
            }
        }
        return null;
    }

    /**
     * Stores the consent settings in a cookie.
     * @param {Object} consentSettings - The consent settings to store.
     */
    storeConsentSettings(consentSettings) {
        const expirationdate = this.getExpirationDateFromMilliseconds(365 * 24 * 60 * 60 * 1000); // 1 year
        this.storeCookie('consentSettings', JSON.stringify(consentSettings), expirationdate);
        this.addRollingExpirationCookie('consentSettings');
    }

    /**
     * Gets the consent settings from a cookie.
     * @returns {Object} The consent settings.
     */
    getConsentSettings() {
        const consentSettings = this.getCookieValue('consentSettings');
        return consentSettings ? JSON.parse(consentSettings) : {};
    }

    /**
     * Stores the cookie categories in a cookie.
     * @param {Object} cookieCategories - The cookie categories to store.
     */
    storeCookieCategories(cookieCategories) {
        const expirationdate = this.getExpirationDateFromMilliseconds(365 * 24 * 60 * 60 * 1000); // 1 year
        this.storeCookie('cookieCategories', JSON.stringify(cookieCategories), expirationdate);
        this.addRollingExpirationCookie('cookieCategories');
    }

    /**
     * Checks if consent was given for a specific category.
     * @param {string} category - The category to check.
     * @returns {boolean} True if consent was given, false otherwise.
     */
    isConsentGivenForCategory(category) {
        const consentSettings = this.getConsentSettings();
        return consentSettings[category] === "true";
    }

    /**
     * Gets the cookie categories from a cookie.
     * @returns {Object} The cookie categories.
     */
    getCookieCategories() {
        const cookieCategories = this.getCookieValue('cookieCategories');
        return cookieCategories ? JSON.parse(cookieCategories) : {};
    }

    /**
     * Updates the consent settings for a category.
     * @param {string} category - The category to update.
     * @param {string} value - The value to set for the category.
     */
    updateConsentSettings(category, value) {
        this.consentSettings[category] = value;
        this.storeConsentSettings(this.consentSettings);

        if (value !== "true") {
            Object.keys(this.cookieCategories).forEach(cookieName => {
                if (this.cookieCategories[cookieName] === category) {
                    this.removeCookie(cookieName);
                    delete this.cookieCategories[cookieName];
                }
            });
            this.storeCookieCategories(this.cookieCategories);
        }
    }

    /**
     * Removes a cookie.
     * @param {string} name - The name of the cookie to remove.
     */
    removeCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999;path=/;SameSite=Strict';
    }

    /**
     * Removes cookies from a list.
     * @param {Array} cookieList - The list of cookie names to remove.
     */
    removeCookiesFromList(cookieList) {
        cookieList.forEach(cookieName => {
            this.removeCookie(cookieName);
        });
    }

    /**
     * Processes and stores a cookie with the given parameters.
     * 
     * @param {string} name - The name of the cookie.
     * @param {string} value - The value of the cookie.
     * @param {string} expirationdate - The expiration date of the cookie.
     * @param {string} category - The category of the cookie.
     * @param {boolean} rolling - Whether the cookie should have a rolling expiration.
     */
    processCookie(name, value, expirationdate, category, rolling) {
        this.storeCookie(name, value, expirationdate);
        this.cookieCategories[name] = category;
        this.storeCookieCategories(this.cookieCategories);
        if (rolling) {
            this.addRollingExpirationCookie(name);
        }
    }

    /**
     * Sets a cookie.
     * @param {string} name - The name of the cookie.
     * @param {string} [value="true"] - The value of the cookie.
     * @param {number} [exdays=365] - The number of days until the cookie expires.
     * @param {string} [category="functional"] - The category of the cookie.
     * @param {boolean} [rolling=true] - Whether the cookie should have a rolling expiration.
     * @returns {Promise} A promise that resolves when the cookie is set.
     */
    async setCookie(name, value = "true", exdays = 365, category = "functional", rolling = true) {
        return new Promise((resolve, reject) => {
            let expirationdate = this.getExpirationDateFromMilliseconds(exdays * 24 * 60 * 60 * 1000);

            const isCookieInList = this.locs.translations.cookieCategories.some(cat =>
                cat.cookieList.some(cookie => cookie.name === name)
            );
            if (!isCookieInList) {
                console.error(`Error: Cookie "${name}" is not represented in the cookieList.`);
                reject(`Error: Cookie "${name}" is not represented in the cookieList.`);
                return;
            }

            if (category === "necessary" || this.isCategoryAllowed(category)) {
                this.processCookie(name, value, expirationdate, category, rolling);
                resolve();
                return;
            }

            this.showCookieConsentNotification().then(() => {
                if (this.isCategoryAllowed(category)) {
                    this.processCookie(name, value, expirationdate, category, rolling);
                    resolve();
                } else {
                    console.error(`Error: User did not allow cookies for category "${category}".`);
                    reject(`Error: User did not allow cookies for category "${category}".`);
                }
            }).catch(() => {
                console.error(`Error: User canceled cookie consent notification for cookie "${name}".`);
                reject(`Error: Failed to show cookie consent notification for cookie "${name}".`);
            });
        });
    }

    /**
     * Handles the click event for showing more details.
     */
    showMoreDetailsClickhandler() {
        const cookieCategoriesElement = document.getElementById("cookie-categories");
        const showMoreDetailsElement = document.getElementById("show-more-details");
        if (cookieCategoriesElement.style.display === "none") {
            cookieCategoriesElement.style.display = "block";
            showMoreDetailsElement.innerHTML = this.locs.t('showLess');
        } else {
            cookieCategoriesElement.style.display = "none";
            showMoreDetailsElement.innerHTML = this.locs.t('showMore');
        }
    }
}

export default FundoCookies;