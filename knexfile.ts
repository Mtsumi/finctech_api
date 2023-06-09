import { Knex } from 'knex';
require('ts-node/register');


const config: Knex.Config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    extension: 'ts',
  },
};

export default config;