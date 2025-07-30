import { dbapi_baseurl } from './dbapi_baseurl.js';

async function setUsername(token) {
    let response = await fetch(dbapi_baseurl + '/me', {
        method: 'GET',
        headers: {
            'X-User-Token': token
        }
    });

    if (response.status == 200) {
        let responseJson = await response.json()
        // console.log(responseJson);

        window.username = responseJson['username'];
        window.userbalance = responseJson['balance'];
        loginP.innerHTML = window.username;
        loginP.style.display = 'block';
        loginLink.style.display = 'none';

        window.dispatchEvent(new CustomEvent('dataChanged', { detail: window.username }));
    }
}

let loginP = document.querySelector('.login-p');
let loginLink = document.querySelector('.login-link');

let acceptCookiesButton = document.querySelector('.accept-cookies-button');
let cookieWarning = document.querySelector('.cookie-warning');

acceptCookiesButton.addEventListener('click', function () {
    cookieWarning.style.display = 'none';
})

let cookieAccepted = false;

let cookies = document.cookie.split(';');
for (let cookie of cookies) {
    console.log(cookie);
    let cookie_parts = cookie.split('=');
    let cookie_name = cookie_parts[0].trim();
    let cookie_content = cookie_parts[1];

    if (cookie_name == 'cookie_accepted') {
        cookieAccepted = true;
    } else if (cookie_name == 'usertoken') {
        setUsername(cookie_content);
    }
}

if (cookieAccepted == false) {
    cookieWarning.style.display = 'block';
    document.cookie = 'cookie_accepted=yes; max-age=315360000; path=/;';
}