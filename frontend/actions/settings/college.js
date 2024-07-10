import fetch from 'isomorphic-fetch';
import { college } from '../../utils/url';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const getCollege = () => {
    return fetch(`${college.college}`, {
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
                    throw new Error(data.message || 'Failed to get college'); // Throw error with the message from response body
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            return { error: true, message: error.message };
        });
};

export const createCollege = (data) => {
    return fetch(`${college.collegeAdd}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Pass the name in the request body
    })
        .then(response => {
            if (!response.ok) {
                // If the response status is not within the range 200-299
                return response.json().then(data => {
                    throw new Error(data.error || 'Failed to create college'); // Throw error with the message from response body
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            return { error: true, message: error.message };
        });
};
export const updateCollege = (id, data) => {
    return fetch(`${college.collegeUpdate}/${id}`, {
        method: 'PUT', // Assuming you use PUT method for updating
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Pass the updated data in the request body
    })
        .then(response => {
            if (!response.ok) {
                // If the response status is not within the range 200-299
                return response.json().then(data => {
                    throw new Error(data.error || 'Failed to update college'); // Throw error with the message from response body
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            return { error: true, message: error.message };
        });
};
export const updateCollegeStatus = (id, data) => {
    return fetch(`${college.collegeStatus}/${id}`, {
        method: 'PUT', // Assuming you use PUT method for updating
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Pass the updated data in the request body
    })
        .then(response => {
            if (!response.ok) {
                // If the response status is not within the range 200-299
                return response.json().then(data => {
                    throw new Error(data.error || 'Failed to update college'); // Throw error with the message from response body
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            return { error: true, message: error.message };
        });
};