/*
 * This file is part of the fundo_ project.
 * Copyright (c) 2025 Robin Exner (https://robinexner.de)
 * GitHub: https://github.com/robinexner/fundo_
 * This software is licensed under the MIT License.
 * See the LICENSE file for more information.
 */


document.body.classList.remove("noscript")
document.body.classList.add("loading")

document.addEventListener("DOMContentLoaded", function(event) {
    document.body.classList.remove("loading")
    document.body.classList.add("loaded")
});