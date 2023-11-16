const { callAPI } = require('../../models')
module.exports = {
  get: function (req, res) {
    callAPI(req)
      .then(response => {
        res.json(response.data);
      })
      .catch(err => {
        res.status(err?.response?.status ?? 500).send(err?.response?.statusText ?? 'error');
      })
  }
}