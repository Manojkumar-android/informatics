import fetch from 'isomorphic-fetch';

const url = process.env.NEXT_PUBLIC_API_SERVER_URL
const j_gate = "https://demosearchapi.jgatenext.com/api/searchterm="
export const getSearchData = (body) => {

    return fetch(`${url}/university/getSearchData`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        },
        body: JSON.stringify(body)

    })
        .then(response => {
            //  console.log("inaction" + JSON.stringify(response))
            if (!response.ok) {
                // If the response status is not within the range 200-299
                return response.json().then(data => {
                    throw new Error(data.message || 'Failed to dSpaceSearch'); // Throw error with the message from response body
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            return { error: true, message: error.message };
        });
};


export const getFacetsData = (data) => {

    return fetch(`${url}/university/getFacetsData`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        },
        body: JSON.stringify(data)

    })
        .then(response => {
            //  console.log("inaction" + JSON.stringify(response))
            if (!response.ok) {
                // If the response status is not within the range 200-299
                return response.json().then(data => {
                    throw new Error(data.message || 'Failed to getFacetsData'); // Throw error with the message from response body
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            return { error: true, message: error.message };
        });
};

export const getDetails = (body) => {

    return fetch(`${url}/university/getSearchDetails`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        },
        body: JSON.stringify(body)
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