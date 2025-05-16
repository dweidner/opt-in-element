export class Store {
  #key;
  #storage;

  /**
   * @param {string} key
   * @param {Storage} storage
   */
  constructor(key, storage = localStorage) {
    this.#key = key;
    this.#storage = storage;
  }

  /**
   * @returns {string[]}
   */
  getAll() {
    return JSON.parse(this.#storage.getItem(this.#key) || '[]');
  }

  /**
   * @param {string} item
   * @returns {boolean}
   */
  contains(item) {
    return this.getAll().includes(item);
  }

  /**
   * @param {string} item
   * @returns {this}
   */
  add(item) {
    const items = this.getAll();
    items.push(item);

    this.#storage.setItem(this.#key, JSON.stringify(items));

    return this;
  }

  /**
   * @param {string} item
   * @returns {this}
   */
  remove(item) {
    const items = this.getAll();
    const index = items.indexOf(item);

    if (index !== -1) {
      items.splice(index, 1);
    }

    this.#storage.setItem(this.#key, JSON.stringify(items));

    return this;
  }

  /**
   * @param {string} item
   * @returns {this}
   */
  clear() {
    this.#storage.removeItem(this.#key);

    return this;
  }
}
