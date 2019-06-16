import StatesApi from "./StatesApi";
import LevelsAPi from "./LevelsApi";
import QueryApi from "./QueryApi";


const endpoints = {
    states: StatesApi,
    levels: LevelsAPi,
    query: QueryApi
};
export const ApiFactory = {
    /**
     * @param string name , represents an api factory endpoint
     * @return api factory endpoint 
     */
    get: name => endpoints[name]
};