exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('pictograms').del();
  
  // Inserts seed entries
  await knex('pictograms').insert([
    // Empty array to not insert any initial pictograms
  ]);
};