import axios from 'axios';
import { withExtractedData } from './apiUtils';
import {ENDPOINTS} from "../constants.ts";

const client = axios.create({
    baseURL: ENDPOINTS.BASE_URL
});

const {
    get, post, put, patch
} = withExtractedData(client, (res) => res.data?.data || res.data);
const { get: getResponse } = client;
export {
    get, post, put, patch, getResponse
};
