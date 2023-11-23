import axios from 'axios';
import { withExtractedData } from './apiUtils';

const client = axios.create({
    baseURL: "http://localhost:8080"
});

const {
    get, post, put, patch
} = withExtractedData(client, (res) => res.data?.data || res.data);
const { get: getResponse } = client;
export {
    get, post, put, patch, getResponse
};
