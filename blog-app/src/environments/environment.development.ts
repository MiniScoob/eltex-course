import { GRAPHQL_STORAGE_TOKEN, GraphqlStorageService } from '../app/services/graphql-storage-service';
import {
  ARTICLE_EVENT_SUBSCRIBER_TOKEN,
  ArticleEventSubscriberService,
} from '../app/services/article-event-subscriber-service';

export const environment = {
  production: false,
  useBackend: true,
  providers: [
    {
      provide: GRAPHQL_STORAGE_TOKEN,
      useClass: GraphqlStorageService,
    },
  ],
  articleProviders: [
    { provide: ARTICLE_EVENT_SUBSCRIBER_TOKEN, useClass: ArticleEventSubscriberService },
  ],
};
