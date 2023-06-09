import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // User table
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username").unique().notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.dateTime("createdAt").defaultTo(knex.fn.now()).notNullable();
    table.dateTime("updatedAt").defaultTo(knex.fn.now()).notNullable();
  });

  // Create the Transaction table
  await knex.schema.createTable("transactions", (table) => {
    table.increments("id").primary();
    table.decimal("amount").notNullable();
    table.dateTime("date").defaultTo(knex.fn.now()).notNullable();
    table.enum("type", ["DEBIT", "CREDIT"]).notNullable();
    table.integer("userId").unsigned().notNullable();
    table.foreign("userId").references("users.id");
    table.dateTime("createdAt").defaultTo(knex.fn.now()).notNullable();
    table.dateTime("updatedAt").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  // Drop the Transaction table
  await knex.schema.dropTableIfExists("transactions");

  // Drop the User table
  await knex.schema.dropTableIfExists("users");
}