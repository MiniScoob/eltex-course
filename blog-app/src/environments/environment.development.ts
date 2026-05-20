import { GRAPHQL_STORAGE_TOKEN, GraphqlStorageService } from '../app/services/graphql-storage-service';

export const environment = {
  production: false,
  useBackend: true,
  providers: [
    {
      provide: GRAPHQL_STORAGE_TOKEN,
      useClass: GraphqlStorageService,
    },
  ],
};
