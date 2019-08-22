const axios = require('axios');
const { getData, getUrl } = require('../utils');

module.exports = {
  rockets: () => {
    const url = getUrl('rockets');

    return axios.get(url).then(getData);
  },
  rocket: (_, { id }) => {
    const url = `${getUrl('rockets')}/${id}`;

    return axios.get(url).then(getData);
  },
};
