console.log({ starting: true });

import express from 'express';
import basicAuth from 'basic-auth-connect';

const app = express();

import graphqlHTTP from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLString,
  GraphQLNonNull, GraphQLID, GraphQLEnumType } from 'graphql';

import {
  NodeInterface,
  UserType,
  PostType
} from './src/types';

import * as loaders from './src/loaders';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query',
  fields: {
    viewer: {
      type: NodeInterface,
      resolve(source, args, context) {
        return loaders.getNodeById(context);
      }
    },
    node: {
      type: NodeInterface,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(source, args, context, info) {
        return loaders.getNodeById(args.id);
      }
    }
  }
});

const LevelEnum = new GraphQLEnumType({
  name: 'PrivacyLevel',
  values: {
    PUBLIC: {
      value: 'public'
    },
    ACQUAINTANCE: {
      value: 'acquaintance'
    },
    FRIEND: {
      value: 'friend'
    },
    TOP: {
      value: 'top'
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'The root mutation',
  fields: {
    createPost: {
      type: PostType,
      args: {
        body: {
          type: new GraphQLNonNull(GraphQLString)
        },
        level: {
          type: new GraphQLNonNull(LevelEnum),
        }
      },
      resolve(source, args, context) {
        return loaders.createPost(args.body, args.level, context).then((nodeId) => {
          return loaders.getNodeById(nodeId);
        });
      }
    }
  }
});

const Schema = new GraphQLSchema({
  types: [UserType, PostType],
  query: RootQuery,
  mutation: RootMutation,
});

app.use(basicAuth(function(user, pass) {
  return pass === 'mypassword1';
}));

app.use('/graphql', graphqlHTTP((req) => {
  const context = 'users:' + req.user;
  return { schema: Schema, graphiql: true, context: context, pretty: true };
}));

app.listen(3000, () => {
  console.log({ running: true });
});
