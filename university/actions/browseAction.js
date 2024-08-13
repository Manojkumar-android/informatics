import fetch from 'isomorphic-fetch';

const url = process.env.NEXT_PUBLIC_API_SERVER_URL
const j_gate = "https://demosearchapi.jgatenext.com/api/searchterm="
export const dSpaceBrowse = (body) => {

    return fetch(`${url}/university/getBrowseData`, {
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
                    throw new Error(data.message || 'Failed to getBrowseData'); // Throw error with the message from response body
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            return { error: true, message: error.message };
        });
};

