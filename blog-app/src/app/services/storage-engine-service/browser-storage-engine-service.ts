import { Injectable } from '@angular/core';

import type { StorageEngine } from './storage-engine-service.model';

@Injectable()
export class BrowserStorageEngineService implements StorageEngine {
  public getItem(key: string) {
    return localStorage.getItem(key);
  }

  public setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
