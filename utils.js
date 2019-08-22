const baseUrl = 'https://api.spacexdata.com/v3';
const getUrl = endpoint => `${baseUrl}/${endpoint}`;
const getData = ({ data }) => data;
const addParams = ({ baseScope, params }) => {
  // params IN order, sort, limit, offset
  let newUrl = baseScope;

  let i=0;
  for (const [key, value] of Object.entries(params)) {
    // let symbol = i===0 ? '?' : '&';
    // Notes: the URI already has a starting ? ...
    newUrl = `${newUrl}&${key}=${value}`;
  }
  return newUrl;
};

module.exports = {
  addParams,
  baseUrl,
  getUrl,
  getData,
};
