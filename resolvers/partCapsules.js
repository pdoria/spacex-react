const axios = require('axios');
const { getData, getUrl, addParams } = require('../utils');

module.exports = {
  partCapsules: (_, { params }) => {
    const url = (() => {
      const baseScope = getUrl(`parts/caps`);

      if (params) {
        return addParams({ baseScope, params });
      }

      return baseScope;
    })();

    return axios.get(url).then(getData);
  },
  partCapsule: (_, { id }) => {
    const url = `${getUrl('parts/caps')}/${id}`;

    return axios.get(url).then(getData);
  },
};
