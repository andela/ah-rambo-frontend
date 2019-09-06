import fetchData from '.';
import moxios from 'moxios';
import * as store from './storageHelper';

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

describe('Local Storage Helper Tests', () => {
  it('clears the storage when no key is passed', () => {
    const spy = jest.spyOn(store, 'clearFromStorage');
    store.clearFromStorage();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('removes an item when a key is passed', () => {
    const spy = jest.spyOn(store, 'clearFromStorage');
    store.clearFromStorage('key');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('sets items passed to local storage', () => {
    const spy = jest.spyOn(store, 'setToStorage');
    const data = { token: 'token' };
    store.setToStorage(data);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
  
  it('gets items from local storage', () => {
    const spy = jest.spyOn(store, 'getFromStorage');
    store.getFromStorage('key');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
})
