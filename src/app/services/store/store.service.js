
class StoreService {
  constructor() {
    this.store = {};
    this.listeners = {};
  }

  get(prop) {
    return this.store[prop];
  }

  getAll() {
    return this.store;
  }

  set(prop, value) {
    this.store[prop] = value;
    this.dispatch(prop);
  }

  dispatch(prop) {
    if (!this.listeners[prop] || !this.listeners[prop].length) {
      return;
    }

    this.listeners[prop].forEach(listenerCallback => {
      const propValue = this.get(prop);
      listenerCallback(propValue);
    });
  }

  subscribe(prop, listenerCallback) {
    if (!this.listeners[prop]) {
      this.listeners[prop] = [];
    }

    this.listeners[prop].push(listenerCallback);
  }
}

export const Store = new StoreService();
