/*
 * This file is part of the fundo_ project.
 * Copyright (c) 2025 Robin Exner (https://robinexner.de)
 * GitHub: https://github.com/robinexner/fundo_
 * This software is licensed under the MIT License.
 * See the LICENSE file for more information.
 */

import { loadCSS } from '../util/util.js';

/**
 * Class representing a notification.
 */
class Notification {
    /**
     * Create a notification.
     * @param {string} title - The title of the notification.
     * @param {string} content - The content of the notification.
     * @param {Array} buttons - The buttons of the notification.
     */
    constructor(title, content, buttons = []) {
        this.title = title;
        this.content = content;
        this.buttons = buttons;
        this.element = null; // Store the created element
        this.autoExecuteTimer = null; // Store the timer for auto-executing buttons

        // Load the notification CSS file
        loadCSS('notification.css');
    }

    /**
     * Create the notification element.
     * @returns {HTMLElement} The created notification element.
     */
    createElement() {
        const notificationRef = document.createElement("div");
        notificationRef.classList.add("notification");

        const notificationHeader = document.createElement("h3");
        notificationHeader.innerHTML = this.title;
        notificationRef.append(notificationHeader);

        const notificationContent = document.createElement("div");
        notificationContent.classList.add("notification__content");
        notificationContent.innerHTML = this.content;
        notificationRef.append(notificationContent);

        const notificationButtons = document.createElement("div");
        notificationButtons.classList.add("notification__buttons");

        this.buttons.forEach(({ title, classnames, handler }) => {
            const buttonElement = this.createButtonElement(title, classnames, handler);
            notificationButtons.append(buttonElement);
        });

        notificationRef.append(notificationButtons);
        this.element = notificationRef; // Store the created element
        return notificationRef;
    }

    /**
     * Create a button element.
     * @param {string} title - The title of the button.
     * @param {Array} classnames - The class names for the button.
     * @param {Function} handler - The click handler for the button.
     * @returns {HTMLElement} The created button element.
     */
    createButtonElement(title, classnames, handler) {
        const buttonElement = document.createElement("div");
        buttonElement.classList.add("button");
        classnames.forEach(cn => buttonElement.classList.add(cn));
        buttonElement.innerHTML = title;
        buttonElement.addEventListener("click", handler);
        return buttonElement;
    }

    /**
     * Destroy the notification element.
     */
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
        this.clearAutoExecuteTimer();
    }

    /**
     * Update the content of the notification.
     * @param {string} newContent - The new content of the notification.
     */
    updateContent(newContent) {
        if (this.element) {
            const contentElement = this.element.querySelector('.notification__content');
            if (contentElement) {
                contentElement.innerHTML = newContent;
            }
        }
        this.content = newContent;
    }

    /**
     * Update the title of the notification.
     * @param {string} newTitle - The new title of the notification.
     */
    updateTitle(newTitle) {
        if (this.element) {
            const titleElement = this.element.querySelector('h3');
            if (titleElement) {
                titleElement.innerHTML = newTitle;
            }
        }
        this.title = newTitle;
    }

    /**
     * Update the buttons of the notification.
     * @param {Array} newButtons - The new buttons of the notification.
     */
    updateButtons(newButtons) {
        if (this.element) {
            const buttonsContainer = this.element.querySelector('.notification__buttons');
            if (buttonsContainer) {
                buttonsContainer.innerHTML = ''; // Clear existing buttons
                newButtons.forEach(({ title, classnames, handler }) => {
                    const buttonElement = this.createButtonElement(title, classnames, handler);
                    buttonsContainer.append(buttonElement);
                });
            }
        }
        this.buttons = newButtons;
    }

    /**
     * Update the style of the notification.
     * @param {string} newClass - The new class name for the notification.
     */
    updateStyle(newClass) {
        if (this.element) {
            this.element.className = ''; // Clear existing classes
            this.element.classList.add(newClass);
        }
    }

    /**
     * Set a timeout to hide the notification.
     * @param {number} duration - The duration in milliseconds.
     */
    setTimeout(duration) {
        setTimeout(() => {
            this.hide();
        }, duration);
    }

    /**
     * Add a button to the notification.
     * @param {Object} button - The button to add.
     */
    addButton(button) {
        this.buttons.push(button);
        if (this.element) {
            const buttonElement = this.createButtonElement(button.title, button.classnames, button.handler);
            this.element.querySelector('.notification__buttons').append(buttonElement);
        }
    }

    /**
     * Remove a button from the notification by its title.
     * @param {string} buttonTitle - The title of the button to remove.
     */
    removeButton(buttonTitle) {
        this.buttons = this.buttons.filter(button => button.title !== buttonTitle);
        if (this.element) {
            const buttonElement = this.findButtonElement(buttonTitle);
            if (buttonElement) {
                buttonElement.remove();
            }
        }
    }

    /**
     * Show the notification.
     */
    show() {
        if (!this.element) {
            this.createElement();
        }
        document.body.append(this.element);
    }

    /**
     * Hide the notification.
     */
    hide() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }

    /**
     * Toggle the visibility of the notification.
     */
    toggleVisibility() {
        if (this.element && this.element.parentNode) {
            this.hide();
        } else {
            this.show();
        }
    }

    /**
     * Set a button to auto-execute after a duration.
     * @param {string} buttonTitle - The title of the button to auto-execute.
     * @param {number} duration - The duration in milliseconds.
     */
    setAutoExecuteButton(buttonTitle, duration) {
        const button = this.buttons.find(butt => butt.title === buttonTitle);
        if (button) {
            const buttonElement = this.findButtonElement(buttonTitle);
            if (buttonElement) {
                let remainingTime = duration / 1000;
                this.autoExecuteTimer = setInterval(() => {
                    if (remainingTime > 0) {
                        buttonElement.innerHTML = `${button.title} (${remainingTime--}s)`;
                    } else {
                        clearInterval(this.autoExecuteTimer);
                        button.handler();
                    }
                }, 1000);
            }
        }
    }

    /**
     * Clear the auto-execute timer.
     */
    clearAutoExecuteTimer() {
        if (this.autoExecuteTimer) {
            clearInterval(this.autoExecuteTimer);
            this.autoExecuteTimer = null;
        }
    }

    /**
     * Update the text of a button.
     * @param {string} buttonTitle - The title of the button to update.
     * @param {string} newText - The new text for the button.
     */
    updateButtonText(buttonTitle, newText) {
        const buttonElement = this.findButtonElement(buttonTitle);
        if (buttonElement) {
            buttonElement.innerHTML = newText;
        }
    }

    /**
     * Find a button element by its title.
     * @param {string} buttonTitle - The title of the button to find.
     * @returns {HTMLElement|null} The found button element or null if not found.
     */
    findButtonElement(buttonTitle) {
        return Array.from(this.element.querySelectorAll('.button')).find(button => button.innerHTML.includes(buttonTitle));
    }
}

/**
 * Class representing a notification manager.
 */
class NotificationManager {
    constructor() {
        this.notifications = [];
    }

    /**
     * Add a notification.
     * @param {string} title - The title of the notification.
     * @param {string} content - The content of the notification.
     * @param {Array} buttons - The buttons of the notification.
     */
    addNotification(title, content, buttons = []) {
        const notification = new Notification(title, content, buttons);
        this.notifications.push(notification);
        notification.show();
    }

    /**
     * Clear all notifications.
     */
    clearNotifications() {
        this.notifications.forEach(notification => {
            notification.destroy();
        });
        this.notifications = [];
    }

    /**
     * Remove a notification by its index.
     * @param {number} index - The index of the notification to remove.
     */
    removeNotification(index) {
        if (index >= 0 && index < this.notifications.length) {
            this.notifications[index].destroy();
            this.notifications.splice(index, 1);
        }
    }

    /**
     * Remove a notification by its title.
     * @param {string} title - The title of the notification to remove.
     */
    removeNotificationByTitle(title) {
        const notification = this.findNotificationByTitle(title);
        if (notification) {
            notification.destroy();
            this.notifications = this.notifications.filter(notif => notif.title !== title);
        }
    }

    /**
     * Remove a notification by its content.
     * @param {string} content - The content of the notification to remove.
     */
    removeNotificationByContent(content) {
        const notification = this.findNotificationByContent(content);
        if (notification) {
            notification.destroy();
            this.notifications = this.notifications.filter(notif => notif.content !== content);
        }
    }

    /**
     * Update a notification by its index.
     * @param {number} index - The index of the notification to update.
     * @param {string} newTitle - The new title of the notification.
     * @param {string} newContent - The new content of the notification.
     * @param {Array} newButtons - The new buttons of the notification.
     */
    updateNotification(index, newTitle, newContent, newButtons) {
        if (index >= 0 && index < this.notifications.length) {
            const notification = this.notifications[index];
            if (newTitle) notification.updateTitle(newTitle);
            if (newContent) notification.updateContent(newContent);
            if (newButtons) notification.updateButtons(newButtons);
        }
    }

    /**
     * Update a notification by its title.
     * @param {string} title - The title of the notification to update.
     * @param {string} newTitle - The new title of the notification.
     * @param {string} newContent - The new content of the notification.
     * @param {Array} newButtons - The new buttons of the notification.
     */
    updateNotificationByTitle(title, newTitle, newContent, newButtons) {
        const notification = this.findNotificationByTitle(title);
        if (notification) {
            if (newTitle) notification.updateTitle(newTitle);
            if (newContent) notification.updateContent(newContent);
            if (newButtons) notification.updateButtons(newButtons);
        }
    }

    /**
     * Show all notifications.
     */
    showAllNotifications() {
        this.notifications.forEach(notification => notification.show());
    }

    /**
     * Hide all notifications.
     */
    hideAllNotifications() {
        this.notifications.forEach(notification => notification.hide());
    }

    /**
     * Get all notifications.
     * @returns {Array} The list of notifications.
     */
    getNotifications() {
        return this.notifications;
    }

    /**
     * Find a notification by its title.
     * @param {string} title - The title of the notification to find.
     * @returns {Notification|null} The found notification or null if not found.
     */
    findNotificationByTitle(title) {
        return this.notifications.find(notification => notification.title === title);
    }

    /**
     * Find a notification by its content.
     * @param {string} content - The content of the notification to find.
     * @returns {Notification|null} The found notification or null if not found.
     */
    findNotificationByContent(content) {
        return this.notifications.find(notification => notification.content === content);
    }

    /**
     * Count the number of notifications.
     * @returns {number} The number of notifications.
     */
    countNotifications() {
        return this.notifications.length;
    }
}

export { Notification, NotificationManager };