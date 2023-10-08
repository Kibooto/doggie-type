const regForm = document.getElementById('RegisterForm');
const loginForm = document.getElementById('LoginForm');

const usernameInput = document.getElementById("reg-username");
const emailInput = document.getElementById("reg-email");
const verifyEmailInput = document.getElementById("reg-email-submit");
const passwordInput = document.getElementById("reg-password");
const verifyPasswordInput = document.getElementById("reg-password-submit");

const loginUsernameInput = document.getElementById("login-username");
const loginPasswordInput = document.getElementById("login-password");

const usernameError = document.querySelector('#reg-username-error');

usernameInput.addEventListener("input", (event) => {
    const formData = new FormData();
    formData.append('username', usernameInput.value);

    fetch('/api/auth/check_username', {
        method: 'POST',
        body: formData
    }).then(function (response) {
        if (response.status === 400) {
            throw new Error('Username already taken');
        }
        return response.text();
    }).then(function (text) {
        console.log(text);
        usernameError.innerHTML = '';
    }).catch(function (error) {
        console.error(error);
        usernameError.innerHTML = `<p class="error">${error}</p>`;
    });
});

const emailError = document.querySelector('#reg-email-error');

emailInput.addEventListener("input", (event) => {
    const formData = new FormData();
    formData.append('email', emailInput.value);

    fetch('/api/auth/check_email', {
        method: 'POST',
        body: formData
    }).then(function (response) {
        if (response.status === 400) {
            throw new Error('Email already taken');
        }
        return response.text();
    }).then(function (text) {
        console.log(text);
        emailError.innerHTML = '';
    }).catch(function (error) {
        console.error(error);
        emailError.innerHTML = `<p class="error">${error}</p>`;
    });
});

const verifyEmailError = document.querySelector('#reg-ver-email-error');

verifyEmailInput.addEventListener("input", (event) => {
    if (emailInput.value.substring(0, verifyEmailInput.value.length) !== verifyEmailInput.value ) {
        verifyEmailError.innerHTML = `<p class="error">Emails do not match</p>`;
    } else {
        verifyEmailError.innerHTML = '';
    }
});

const passwordError = document.querySelector('#reg-password-error');

const shortError = 'Password must be at least 6 characters';
const longError = 'Password must be less than 24 characters';
const symbolError = 'Password must contain at least one symbol';
const numberError = 'Password must contain at least one number';
let passErrors = []

passwordInput.addEventListener("input", (event) => {
    passwordError.innerHTML = '';
    if (passwordInput.value.length < 6) {
        if (!(passErrors.includes(shortError))) {
            passErrors.push(shortError);
        }
    } else if (passwordInput.value.length > 24) {
        if (!(passErrors.includes(longError))) {
            passErrors.push(longError);
        }
    } else {
        if (passErrors.includes(shortError)) {
            passErrors.splice(passErrors.indexOf(shortError), 1);
        }
        
        if (passErrors.includes(longError)) {
            passErrors.splice(passErrors.indexOf(longError), 1);
        }
    }

    if (!passwordInput.value.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)) {
        if (!(passErrors.includes(symbolError))) {
            passErrors.push(symbolError);
        }
    } else {
        if (passErrors.includes(symbolError)) {
            passErrors.splice(passErrors.indexOf(symbolError), 1);
        }
    }

    if (!passwordInput.value.match(/[0123456789]+/)) {
        if (!(passErrors.includes(numberError))) {
            passErrors.push(numberError);
        }
    } else {
        if (passErrors.includes(numberError)) {
            passErrors.splice(passErrors.indexOf(numberError), 1);
        }
    }

    for (i in passErrors) {
        passwordError.innerHTML += `<p class="error">${passErrors[i]}</p>`;
    }
});

const verifyPasswordError = document.querySelector('#reg-ver-password-error');
verifyPasswordInput.addEventListener("input", (event) => {
    if (passwordInput.value.substring(0, verifyPasswordInput.value.length) !== verifyPasswordInput.value ) {
        verifyPasswordError.innerHTML = `<p class="error">Passwords do not match</p>`;
    } else {
        verifyPasswordError.innerHTML = '';
    }
});

regForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append('username', usernameInput.value);
    formData.append('email', emailInput.value);
    formData.append('password', passwordInput.value);

    fetch('/api/register', {
        method: 'POST',
        body: formData
    }).then(function (response) {
        return response.text();
    }).then(function (text) {
        window.location.replace("/");
    }).catch(function (error) {
        console.error(error);
    });
})

const loginError = document.querySelector('#login-error');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append('username', loginUsernameInput.value);
    formData.append('password', loginPasswordInput.value);

    fetch('/api/login', {
        method: 'POST',
        body: formData
    }).then(function (response) {
        if (response.status === 400) {
            throw new Error('Invalid username or password');
        }
        return response.text();
    }).then(function (text) {
        window.location.replace("/");
        console.log(text);
    }).catch(function (error) {
        console.error(error);
        loginError.innerHTML = `<p class="error">${error}</p>`
    });
})