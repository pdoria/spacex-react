const axios = require('axios');
const { getData, getUrl, addParams } = require('../utils');

module.exports = {
  launches: (_, { scope, params }) => {
    const url = (() => {
      const baseScope = `${getUrl(
        `launches${scope ? `/${scope}` : ''}`
      )}?id=true`;

      // order || sort || limit || offset
      if (params) {
        return addParams({ baseScope, params });
      }

      return baseScope;
    })();

    if (scope === 'latest' || scope === 'next') {
      return [axios.get(url).then(getData)];
    }

    return axios.get(url).then(getData);
  },
  launch: (_, { id }) => {
    const url = `${getUrl('launches')}?id=true&flight_id=${id}`;

    return axios.get(url).then(({ data }) => data[0]);
  },
};