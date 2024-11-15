import fetch from 'isomorphic-fetch';

const local = process.env.NEXT_PUBLIC_API_SERVER_URL


export const getResouceCategory = () => {

    return fetch(`${local}/university/getResouceCategory?libraryId=${process.env.NEXT_PUBLIC_LIBRARY_ID}`, {
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
                    throw new Error(data.message || 'Failed to getResouceCategory'); // Throw error with the message from response body
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            return { error: true, message: error.message };
        });
};