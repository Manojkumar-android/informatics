import fetch from 'isomorphic-fetch';

const url = process.env.NEXT_PUBLIC_IRAS_API
const local = process.env.NEXT_PUBLIC_API_SERVER_URL
export const login = (body) => {

    return fetch(`${url}/auth/proxy/login`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        },
        body: JSON.stringify(body)

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
export const resetPassword = (body) => {

    return fetch(`${url}/auth/proxy/password-reset`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        },
        body: JSON.stringify(body)

    })
        .then(response => {
            if (!response.ok) {
                // If the response status is not within the range 200-299
                return response.json().then(data => {
                    throw new Error(data.message || 'Failed to resetPassword'); // Throw error with the message from response body
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            return { error: true, message: error.message };
        });
};

export const forgotPassword = (body) => {

    return fetch(`${url}/auth/forgot-password`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        },
        body: JSON.stringify(body)

    })
        .then(response => {
            if (!response.ok) {
                // If the response status is not within the range 200-299
                return response.json().then(data => {
                    throw new Error(data.message || 'Failed to forgotPassword'); // Throw error with the message from response body
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            return { error: true, message: error.message };
        });
};


export const getAssignedResource = () => {

    return fetch(`${local}/university/getAssignedResource?universityId=${process.env.NEXT_PUBLIC_UNIVERSITY_ID}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        }

    })
        .then(response => {
            //  console.log("inaction" + JSON.stringify(response))
            if (!response.ok) {
                // If the response status is not within the range 200-299
                return response.json().then(data => {
                    throw new Error(data.message || 'Failed to getDetails'); // Throw error with the message from response body
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            return { error: true, message: error.message };
        });
};



