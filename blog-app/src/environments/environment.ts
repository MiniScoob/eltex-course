import { GRAPHQL_STORAGE_TOKEN } from '../app/services/graphql-storage-service';
import { ARTICLE_EVENT_SUBSCRIBER_TOKEN } from '../app/services/article-event-subscriber-service';

export const environment = {
  production: true,
  useBackend: false,
  providers: [
    { provide: GRAPHQL_STORAGE_TOKEN, useValue: null },
  ],
  articleProviders: [
    { provide: ARTICLE_EVENT_SUBSCRIBER_TOKEN, useValue: null },
  ],
};
