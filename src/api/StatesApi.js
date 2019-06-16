import Api from "./Api";
const resource = "/states";
export default {
    get() {
        return Api.get(`${resource}`);
    },
    getState(stateId) {
        return Api.get(`${resource}/${stateId}`);
    },
};