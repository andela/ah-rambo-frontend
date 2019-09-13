import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;

class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || undefined
  };

  setItem(key, value) {
    this.store[key] = value.toString();
  };

  removeItem(key) {
    delete this.store[key];
  };

  clear() {
    this.store = {};
  };
}
global.localStorage = new LocalStorageMock();
