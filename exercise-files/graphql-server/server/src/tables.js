import sql from 'sql';

sql.setDialect('sqlite');

export const users = sql.define({
  name: 'users',
  columns: [{
    name: 'id',
    dataType: 'INTEGER',
    primaryKey: true
  }, {
    name: 'name',
    dataType: 'text'
  }, {
    name: 'about',
    dataType: 'text'
  }]
});

export const usersFriends = sql.define({
  name: 'users_friends',
  columns: [{
    name: 'user_id_a',
    dataType: 'int',
  }, {
    name: 'user_id_b',
    dataType: 'int',
  }, {
    name: 'level',
    dataType: 'text',
  }]
});

export const posts = sql.define({
  name: 'posts',
  columns: [{
    name: 'id',
    dataType: 'INTEGER',
    primaryKey: true
  }, {
    name: 'user_id',
    dataType: 'int'
  }, {
    name: 'body',
    dataType: 'text'
  }, {
    name: 'level',
    dataType: 'text'
  }, {
    name: 'created_at',
    dataType: 'datetime'
  }]
});

export const dbIdToNodeId = (dbId, tableName) => {
  return `${tableName}:${dbId}`;
};

export const splitNodeId = (nodeId) => {
  const [tableName, dbId] = nodeId.split(':');
  return { tableName, dbId };
};
