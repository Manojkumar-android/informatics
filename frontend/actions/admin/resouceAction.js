import fetch from 'isomorphic-fetch';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get("token");
const url = `${process.env.NEXT_PUBLIC_IRAS_API}/resourceCategories?limit=50&library_id=${process.env.NEXT_PUBLIC_UNIVERSITY_ID}`


export const createResource = (formData) => {
    const token = cookies.get('admin_token');

    return fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/admin/resource/createResource`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                // If the response status is not within the range 200-299
                return response.json().then(data => {
                    const error = new Error(data.message || 'Failed to fetch createResource');
                    error.status = response.status; // Add status to the error object
                    throw error; // Throw the error object
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            console.error('Error fetching createResource:', error);
            return { error: true, message: error.message, status: error.status }; // Return error object
        });
};

export const updateResource = (formData, id) => {
    const token = cookies.get('admin_token');

    return fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/admin/resource/updateResource?resourceId=${id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                // If the response status is not within the range 200-299
                return response.json().then(data => {
                    const error = new Error(data.message || 'Failed to fetch updateResource');
                    error.status = response.status; // Add status to the error object
                    throw error; // Throw the error object
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            console.error('Error fetching createResource:', error);
            return { error: true, message: error.message, status: error.status }; // Return error object
        });
};

export const getResource = (body) => {
    const token = cookies.get('admin_token');

    return fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/admin/resource/resource`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                // If the response status is not within the range 200-299
                return response.json().then(data => {
                    const error = new Error(data.message || 'Failed to fetch getResource');
                    error.status = response.status; // Add status to the error object
                    throw error; // Throw the error object
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            console.error('Error fetching getResource:', error);
            return { error: true, message: error.message, status: error.status }; // Return error object
        });
};
export const getResourcesById = (id) => {
    const token = cookies.get('admin_token');

    return fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/admin/resource/getResourcesById?resourceId=${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                // If the response status is not within the range 200-299
                return response.json().then(data => {
                    const error = new Error(data.message || 'Failed to fetch getResourcesById');
                    error.status = response.status; // Add status to the error object
                    throw error; // Throw the error object
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            console.error('Error fetching getResource:', error);
            return { error: true, message: error.message, status: error.status }; // Return error object
        });
};

export const getResourceType = () => {

    return fetch(url, {
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
                    throw new Error(data.message || 'getResourceType'); // Throw error with the message from response body
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            return { error: true, message: error.message };
        });
};
