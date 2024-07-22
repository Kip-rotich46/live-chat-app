import { StreamClient } from "@stream-io/node-sdk";

const apiKey = '4ar926p6bgh5';
const apiSecret = '3czfjmbgbsmbddmr2nyhvrunrpzdehbs6ccsxrmchr6uws5drp3cv8cah2cgyd8d';

export const client = new StreamClient(apiKey, apiSecret);