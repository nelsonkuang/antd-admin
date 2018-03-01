const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

module.exports = {

  [`POST ${apiPrefix}/form/basic`] (req, res) {
    console.log(req.body);
    res.json({ success: true, message: 'Ok' });
  },

  [`POST ${apiPrefix}/form/step`] (req, res) {
    console.log(req.body);
    res.json({ success: true, message: 'Ok' });
  },

  [`POST ${apiPrefix}/form/advanced`] (req, res) {
    console.log(req.body);
    res.json({ success: true, message: 'Ok' });
  },

}
