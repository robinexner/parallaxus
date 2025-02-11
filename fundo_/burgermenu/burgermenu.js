/*
 * This file is part of the fundo_ project.
 * Copyright (c) 2025 Robin Exner (https://robinexner.de)
 * GitHub: https://github.com/robinexner/fundo_
 * This software is licensed under the MIT License.
 * See the LICENSE file for more information.
 */

import { loadCSS } from "../util/util.js";

loadCSS("burgermenu.css");

document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelectorAll(".burgermenu__main-navigation a").forEach(bml => {
        bml.addEventListener("click", burgerMenuLinkClickHandler)
    })
});


function burgerMenuLinkClickHandler() {
    closeBurgerMenu();
    document.querySelectorAll('.burgermenu__content').forEach(function(bc) {
        bc.scrollTo(0, 0);
    });
}

function closeBurgerMenu() {
    document.querySelectorAll('.burgermenu__checkbox').forEach(function(burgemenu) {
        burgemenu.checked = false;
    });
}