import axios from "axios";

// export const API_URL = "http://ec2-3-9-171-171.eu-west-2.compute.amazonaws.com:8000/api/"

export const API_URL = "http://allminds.us-west-2.elasticbeanstalk.com/api/";
export function get(url, params) {
    const config = { params: params };
    return axios.get(API_URL + url, config);
}

export function post(url, data) {
    axios.post(API_URL + url, data).then(res => console.log(res.data));
}