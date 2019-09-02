import fetchData from '.';
import moxios from 'moxios';

describe('API call helper test', () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it('specify response for a specific request', done => {
    const method = 'get';
    const url = 'http://localhost:5000/api/v1';
    const data = {};
    const headers = { Authorization: 'token' };
    fetchData(method, url, data, headers);

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{ id: 1, firstName: 'JhayXXX', lastName: 'Escanorrr' }]
      });
      done();
    });
  });
});
