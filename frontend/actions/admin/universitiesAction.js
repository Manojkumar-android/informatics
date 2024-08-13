import fetch from 'isomorphic-fetch';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get("token");

const url = "https://api.informaticsglobal.com"
export const getUniversities = (page) => {

    return fetch(`${url}/libraries?page=${page}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'

        },
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

export const getAllUniversities = () => {

    return fetch(`${url}/libraries`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'

        },
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

export const createUniversities = (institutesData) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/admin/addUniversity`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(institutesData) // Convert the data to JSON format
    })
        .then(response => {
            if (!response.ok) {
                // If the response status is not within the range 200-299
                return response.json().then(data => {
                    throw new Error(data.message || 'Failed to create universities'); // Throw error with the message from response body
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            return { error: true, message: error.message };
        });
};