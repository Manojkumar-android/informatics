

import fetch from 'isomorphic-fetch';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get("token");
export const getAssignedUniversity = () => {
    const token = cookies.get('admin_token');

    return fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/admin/resource/getAssignedUniversity`, {
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
                    const error = new Error(data.message || 'Failed to fetch getAssignedUniversity');
                    error.status = response.status; // Add status to the error object
                    throw error; // Throw the error object
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            console.error('Error fetching getAssignedUniversity:', error);
            return { error: true, message: error.message, status: error.status }; // Return error object
        });
};

export const getUniversityNames = () => {
    const token = cookies.get('admin_token');

    return fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/admin/resource/getUniversityNames`, {
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
                    const error = new Error(data.message || 'Failed to fetch getUniversityNames');
                    error.status = response.status; // Add status to the error object
                    throw error; // Throw the error object
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            console.error('Error fetching getUniversityNames:', error);
            return { error: true, message: error.message, status: error.status }; // Return error object
        });
};

export const getAssignedDetails = (uId) => {
    const token = cookies.get('admin_token');

    return fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/admin/resource/getAssignedDetails?universityId=${uId}`, {
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
                    const error = new Error(data.message || 'Failed to fetch getAssignedDetails');
                    error.status = response.status; // Add status to the error object
                    throw error; // Throw the error object
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            console.error('Error fetching getAssignedDetails:', error);
            return { error: true, message: error.message, status: error.status }; // Return error object
        });
};
export const updateResources = (uId, resources) => {
    const token = cookies.get('admin_token');

    return fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/admin/resource/updateResources?universityId=${uId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(resources) // Send the resources array as the body
    })
        .then(response => {
            if (!response.ok) {
                // If the response status is not within the range 200-299
                return response.json().then(data => {
                    const error = new Error(data.message || 'Failed to update resources');
                    error.status = response.status; // Add status to the error object
                    throw error; // Throw the error object
                });
            }
            return response.json(); // Parse JSON here
        })
        .catch(error => {
            // Handle network errors or other errors during the HTTP request
            console.error('Error updating resources:', error);
            return { error: true, message: error.message, status: error.status }; // Return error object
        });
};
