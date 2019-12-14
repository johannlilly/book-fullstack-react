import * as database from './database';
import * as tables from './tables';

export const getNodeById = (nodeId) => {
  const { tableName, dbId } = tables.splitNodeId(nodeId);

  const table = tables[tableName];
  const query = table
    .select(table.star())
    .where(table.id.equals(dbId))
    .limit(1)
    .toQuery();

  return database.getSql(query).then((rows) => {
    if (rows[0]) {
      rows[0].__tableName = tableName;
    }
    return rows[0];
  });
};

export const getFriendIdsForUser = (userSource) => {
  const table = tables.usersFriends;
  const query = table
    .select(table.user_id_b)
    .where(table.user_id_a.equals(userSource.id))
    .order(table.user_id_by.asc)
    .toQuery();

  return database.getSql(query).then((rows) => {
    rows.forEach((row) => {
      row.__tableName = tables.users.getName();
    });
    return rows;
  });
};

export const getUserNodeWithFriends = (nodeId) => {
  const { tableName, dbId } = tables.splitNodeId(nodeId);

  const query = tables.users
    .select(tables.usersFriends.user_id_b, tables.users.star())
    .from(
      tables.users.leftJoin(tables.usersFriends)
      .on(tables.usersFriends.user_id_a.equals(tables.users.id))
    )
    .where(tables.users.id.equals(dbId))
    .toQuery();


  return database.getSql(query).then((rows) => {
    if (!rows[0]) {
      return undefined;
    }

    const __friends = rows.map((row) => {
      return {
        user_id_b: row.user_id_b,
        __tableName: tables.users.getName()
      }
    });

    const source = {
      id: rows[0].id,
      name: rows[0].name,
      about: rows[0].about,
      __tableName: tableName,
      __friends: __friends
    };
    return source;
  });
};

export const getPostIdsForUser = (userSource, args) => {
  let { after, first } = args;
  if (!first) {
    first = 2;
  }

  const table = tables.posts;
  let query = table
    .select(table.id, table.created_at)
    .where(table.user_id.equals(userSource.id))
    .order(table.created_at.asc)
    .limit(first + 1);

  if (after) {
    // parse cursor
    const [id, created_at] = after.split(':');
    query = query
      .where(table.created_at.gt(after))
      .where(table.id.gt(id));
  }

  return database.getSql(query.toQuery()).then((allRows) => {
    const rows = allRows.slice(0, first);

    rows.forEach((row) => {
      row.__tableName = tables.posts.getName();
      row.__cursor = row.id + ':' + row.created_at;
    });

    const hasNextPage = allRows.length > first;
    const hasPreviousPage = false;

    const pageInfo = {
      hasNextPage: hasNextPage,
      hasPreviousPage: hasPreviousPage,
    };

    if (rows.length > 0) {
      pageInfo.startCursor = rows[0].__cursor;
      pageInfo.endCursor = rows[rows.length - 1].__cursor;
    }

    return { rows, pageInfo };
  });
};
