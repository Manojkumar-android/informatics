import fetch from 'isomorphic-fetch';
import { specification } from '../../utils/url';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const getSpecification = () => {
    return fetch(`${specification.specification}`, {
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
                    throw new Error(data.message || 'Failed to get specification'); // Throw error with the message from response body
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            return { error: true, message: error.message };
        });
};

export const createSpecification = (data) => {
    return fetch(`${specification.specificationAdd}`, {
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
                    throw new Error(data.error || 'Failed to create Specification'); // Throw error with the message from response body
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            return { error: true, message: error.message };
        });
};
export const updateSpecification = (id, data) => {
    return fetch(`${specification.specificationUpdate}/${id}`, {
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
                    throw new Error(data.error || 'Failed to update specification'); // Throw error with the message from response body
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            return { error: true, message: error.message };
        });
};
export const updateSpecificationStatus = (id, data) => {
    return fetch(`${specification.specificationStatus}/${id}`, {
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
                    throw new Error(data.error || 'Failed to update specification'); // Throw error with the message from response body
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            return { error: true, message: error.message };
        });
};