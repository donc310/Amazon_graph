import Api from "./Api";
const resource = "/leveloptions";

export default {
    /**
     * lists all the leveloptions 
     */
    get() {
        return Api.get(`${resource}`);
    },
    /**
     * 
     * @param {string} location 
     */
    getcat(location) {
        return Api.get(`${resource}?location=${location}`);
    },
    /**
     * 
     * @param {string} location 
     * @param {string} cat 
     */
    getsubcat(location, cat) {
        return Api.get(`${resource}?location=${location}&level=${cat}`);

    }
};