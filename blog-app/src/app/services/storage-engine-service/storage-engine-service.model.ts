import { InjectionToken } from '@angular/core';

export interface StorageEngine {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export const STORAGE_ENGINE_TOKEN = new InjectionToken<StorageEngine>('StorageEngine');
