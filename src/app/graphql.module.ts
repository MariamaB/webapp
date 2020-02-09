import { NgModule } from "@angular/core";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const GRAPHQL_ENDPOINT = "ws://localhost:3000/graphql";

const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true
});

const uri = "http://localhost:4000/"; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({ uri }),
    networkInterface: client,
    cache: new InMemoryCache()
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
