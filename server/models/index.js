require('dotenv').config()
const axios = require('axios');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const API_ENDPOINT = process.env.API_ENDPOINT;

if (!GITHUB_TOKEN) {
  throw new Error('missing .env GITHUB_TOKEN');
}

if (!API_ENDPOINT) {
  throw new Error('missing .env API_ENDPOINT');
}

module.exports = {
  callAPI: function (req) {
    return axios.get(`${API_ENDPOINT}${req.url}`, {
      headers: {
        Authorization: GITHUB_TOKEN
      }
    })
  }
}