const axios = require('axios');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const API_HOST_URI = process.env.API_HOST_URI;

if (!GITHUB_TOKEN) {
  throw new Error('missing .env GITHUB_TOKEN');
}

if (!API_HOST_URI) {
  throw new Error('missing .env _URI');
}

module.exports = {
  callAPI: function (req) {
    return axios.get(`${API_HOST_URI}${req.url}`, {
      headers: {
        Authorization: GITHUB_TOKEN
      }
    })
  }
}