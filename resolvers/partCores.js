const axios = require('axios');
const { getData, getUrl, addParams } = require('../utils');

module.exports = {
  partCores: (_, { params }) => {
    const url = (() => {
      const baseScope = getUrl(`parts/cores`);

      if (params) {
        return addParams({ baseScope, params });
      }

      return baseScope;
    })();

    return axios.get(url).then(getData);
  },
  partCore: (_, { id }) => {
    const url = `${getUrl('parts/cores')}/${id}`;

    return axios.get(url).then(getData);
  },
};
