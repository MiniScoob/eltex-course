const ERROR_MESSAGES = {
  SET: 'Ошибка записи',
  GET: 'Ошибка чтения',
  REMOVE: 'Ошибка при попытке удаления',
  CLEAR: 'Ошибка при очистке хранилища',
};

export class StorageService {
  static get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      throw Error(ERROR_MESSAGES.GET);
    }
  }

  static set(key, value) {
    try {
      const serialized = JSON.stringify(value);

      localStorage.setItem(key, serialized);
    } catch (err) {
      throw Error(ERROR_MESSAGES.SET);
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      throw Error(ERROR_MESSAGES.REMOVE);
    }
  }

  static clear() {
    try {
      localStorage.clear();
    } catch (err) {
      throw Error(ERROR_MESSAGES.CLEAR);
    }
  }
}
