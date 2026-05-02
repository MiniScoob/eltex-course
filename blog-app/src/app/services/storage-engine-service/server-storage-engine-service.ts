import { Injectable } from '@angular/core';

import type { StorageEngine } from './storage-engine-service.model';

@Injectable()
export class ServerStorageEngineService implements StorageEngine {
  public getItem(key: string) {
    return null;
  }

  public setItem(key: string, value: string) {}

  public removeItem(key: string) {}
}
