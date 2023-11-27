require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const API_HOST_URI = process.env.API_HOST_URI;

if (!GITHUB_TOKEN) {
  throw new Error('missing .env GITHUB_TOKEN');
}

if (!API_HOST_URI) {
  throw new Error('missing .env _URI');
}

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/*', (req, res) => {
  axios
    .get(`${API_HOST_URI}${req.url}`, {
      headers: {
        Authorization: GITHUB_TOKEN,
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res
        .status(err?.response?.status ?? 500)
        .send(err?.response?.statusText ?? 'error');
    });
});
app.post('/*', (req, res) => {
  axios
    .post(`${API_HOST_URI}${req.url}`, req?.body ?? {}, {
      headers: {
        Authorization: GITHUB_TOKEN,
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res
        .status(err?.response?.status ?? 500)
        .send(err?.response?.statusText ?? 'error');
    });
});
app.put('/*', (req, res) => {
  axios
    .put(`${API_HOST_URI}${req.url}`, req?.body ?? {}, {
      headers: {
        Authorization: GITHUB_TOKEN,
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res
        .status(err?.response?.status ?? 500)
        .send(err?.response?.statusText ?? 'error');
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);