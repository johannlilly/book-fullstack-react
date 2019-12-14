import fs from 'fs';
import path from 'path';
import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import schema from '../schema';

// Save JSON of full schema introspection for the Babel Relay Plugin to use
const generateJSONSchema = async () => {
  var result = await (graphql(schema, introspectionQuery));
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, '../client/src/data/schema.json'),
      JSON.stringify(result, null, 2)
    );
  }

  // Save user readable type system shorthand of schema
  fs.writeFileSync(
    path.join(__dirname, '../client/src/data/schema.graphql'),
    printSchema(schema)
  );
};

generateJSONSchema().then(() => {
  console.log("Saved to client/src/data/schema.{json,graphql}");
})
