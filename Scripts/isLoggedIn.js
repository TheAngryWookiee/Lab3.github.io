"use strict";

(() =>{
    // check if the user is already logged in
    if(sessionStorage.getItem("user"))
    {
    // redirect to the secure area
    location.href = "contact-list.html";
    }
})();

function ensureLoggedIn(req, res, next) {
    if(req.isLoggedIn()) {
        return next();
    } else {
        res.redirect('../OldContent/login.html');
    }
}

module.exports = {
    ensureLoggedIn,
}