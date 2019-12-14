import {
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';

import * as tables from './tables';
import * as loaders from './loaders';

export const NodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolveType: (source) => {
    if (source.__tableName === tables.users.getName()) {
      return UserType;
    }
    return PostType;
  }
});

const resolveId = (source) => {
  return tables.dbIdToNodeId(source.id, source.__tableName);
};

const PageInfoType = new GraphQLObjectType({
  name: 'PageInfo',
  fields: {
    hasNextPage: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    hasPreviousPage: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    startCursor: {
      type: GraphQLString,
    },
    endCursor: {
      type: GraphQLString,
    }
  }
});

const PostEdgeType = new GraphQLObjectType({
  name: 'PostEdge',
  fields: () => {
    return {
      cursor: {
        type: new GraphQLNonNull(GraphQLString)
      },
      node: {
        type: new GraphQLNonNull(PostType)
      }
    }
  }
});

const PostsConnectionType = new GraphQLObjectType({
  name: 'PostsConnection',
  fields: {
    pageInfo: {
      type: new GraphQLNonNull(PageInfoType)
    },
    edges: {
      type: new GraphQLList(PostEdgeType)
    }
  }
});

export const UserType = new GraphQLObjectType({
  name: 'User',
  interfaces: [ NodeInterface ],
  // Note that this is now a function
  fields: () => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve: resolveId
      },
      name: { type: new GraphQLNonNull(GraphQLString) },
      about: { type: new GraphQLNonNull(GraphQLString) },
      friends: {
        type: new GraphQLList(UserType),
        resolve(source) {
          return loaders.getFriendIdsForUser(source).then((rows) => {
            const promises = rows.map((row) => {
              const friendNodeId = tables.dbIdToNodeId(row.user_id_b, row.__tableName);
              return loaders.getNodeById(friendNodeId);
            });
            return Promise.all(promises);
          })
        }
      },
      posts: {
        type: PostsConnectionType,
        args: {
          after: {
            type: GraphQLString
          },
          first: {
            type: GraphQLInt
          },
        },
        resolve(source, args) {
          return loaders.getPostIdsForUser(source, args).then(({ rows, pageInfo }) => {
            const promises = rows.map((row) => {
              const postNodeId = tables.dbIdToNodeId(row.id, row.__tableName);
              return loaders.getNodeById(postNodeId).then((node) => {
                const edge = {
                  node,
                  cursor: row.__cursor,
                };
                return edge;
              });
            });

            return Promise.all(promises).then((edges) => {
              return {
                edges,
                pageInfo
              }
            });

          })
        }
      }
    };
  }
});

export const PostType = new GraphQLObjectType({
  name: 'Post',
  interfaces: [ NodeInterface ],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: resolveId
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    body: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});
