require('dotenv').config()
const axios = require('axios');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const API_HOST = process.env.API_HOST;

if (!GITHUB_TOKEN) {
  throw new Error('missing .env GITHUB_TOKEN');
}

if (!API_HOST) {
  throw new Error('missing .env API_HOST');
}

module.exports = {
  callAPI: function (req) {
    return axios.get(`${API_HOST}${req.url}`, {
      headers: {
        Authorization: GITHUB_TOKEN
      }
    })
  }
}