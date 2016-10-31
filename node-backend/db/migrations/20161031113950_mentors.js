exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.dropTable('users'),
  knex.schema.createTable('users', function (table) {
    table.increments('id');
    table.string('first_name');
    table.string('last_name');
    table.string('username');
    table.string('email');
    table.string('password');
    table.string('picture');
    table.string('gym');
    table.string('fb_id');
    table.integer('score');
    table.boolean('mentor');
  }),
  knex.schema.dropTable('cal_intake'),
  knex.schema.createTable('cal_intake', function (table) {
    table.increments('id');
    table.integer('curr_cal');
    table.integer('target_cal');
  })
]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.dropTable('users');
    }),
    knex.schema.table('cal_intake', function(table) {
      table.dropTable('cal_intake');
    })
  ]);
};
