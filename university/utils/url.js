// urls.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

const auth = {
    login: `${API_BASE_URL}/login`,

};
const location = {
    locationCounts: `${API_BASE_URL}/settings/location/locationCounts`,
    country: `${API_BASE_URL}/settings/location/country`,
    countryStatus: `${API_BASE_URL}/settings/location/countryStatus`,
    state: `${API_BASE_URL}/settings/location/state`,
    city: `${API_BASE_URL}/settings/location/city`,
    pincode: `${API_BASE_URL}/settings/location/pincode`,

};
const specification = {
    specification: `${API_BASE_URL}/settings/specification`,
    specificationAdd: `${API_BASE_URL}/settings/specification/add`,
    specificationUpdate: `${API_BASE_URL}/settings/specification/update`,
    specificationStatus: `${API_BASE_URL}/settings/specification/updateStatus`,


};

const college = {
    college: `${API_BASE_URL}/settings/college`,
    collegeAdd: `${API_BASE_URL}/settings/college/add`,
    collegeUpdate: `${API_BASE_URL}/settings/college/update`,
    collegeStatus: `${API_BASE_URL}/settings/college/updateStatus`,


};
export { auth, location, specification, college };
