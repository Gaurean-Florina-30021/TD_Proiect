function users() {
  get = function () {
    return axios.get('http://localhost:3000/laptops');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/laptops/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
