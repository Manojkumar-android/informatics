import fetch from 'isomorphic-fetch';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const login = (mod) => {

    return fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/admin/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mod)
    })
        .then(response => {
            if (!response.ok) {
                // If the response status is not within the range 200-299
                return response.json().then(data => {
                    throw new Error(data.message || 'Failed to login'); // Throw error with the message from response body
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            return { error: true, message: error.message };
        });
};

// autheticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {
    setCookie('token', data.token);

    next();
};
export const isAuth = () => {

    if (localStorage.getItem('token')) {
        return JSON.parse(localStorage.getItem('token'));
    } else {
        return false;
    }


};

// set cookie
export const setCookie = (key, value) => {
    if (typeof window !== 'undefined') {
        // var now = new Date();
        // now.setTime(now.getTime() + 1 * 3600 * 1000);
        cookies.set(key, value)
    }
};
