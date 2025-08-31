exports.up = function(knex) {
  return knex.schema
    .createTable('pictograms', function(table) {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.text('imageUrl').notNullable();
      table.timestamps(true, true);
    })
    .createTable('phrases', function(table) {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.text('fullSentence').notNullable();
      table.text('imageUrl').notNullable();
      table.text('audioUrl').nullable();
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('phrases
')
    .dropTable('pictograms');
};
