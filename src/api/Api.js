import axios from "axios";
const baseDomain = "http://envtesting.us-east-1.elasticbeanstalk.com";
const baseURL = `${baseDomain}/api`;
/**
 * creates an Axios instance 
 */
export default axios.create({
    baseURL
});
