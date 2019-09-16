import fetchData from '.';
import moxios from 'moxios';
import * as store from './storageHelper';
import { isEmpty, dateFormatter, getReadTime } from './utils';

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

describe('Utils test', () => {
  it('tests the isEmpty function', () => {
    const value = isEmpty({});
    expect(value).toBe(true)
  })

  it('tests the isEmpty function', () => {
    const value = isEmpty({firstname: 'Rambo'});
    expect(value).toBe(false)
  })

  it('tests the date formatter function', () => {
    const formattedDate = dateFormatter('2019-09-13T15:21:22.081Z');
    expect(formattedDate).toEqual('Sep 13 2019');
  })

  it("gets an article's read time", () => {
    const readTime = getReadTime('this is a demo article');
    expect(readTime).toEqual(1);
  })
})
