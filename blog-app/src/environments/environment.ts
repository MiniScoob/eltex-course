import { GRAPHQL_STORAGE_TOKEN } from '../app/services/graphql-storage-service';

export const environment = {
  production: true,
  useBackend: false,
  providers: [
    { provide: GRAPHQL_STORAGE_TOKEN, useValue: null },
  ],
};
