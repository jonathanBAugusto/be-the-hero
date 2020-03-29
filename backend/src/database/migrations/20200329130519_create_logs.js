
exports.up = function (knex) {
    return knex.schema.createTable('logs', (t) => {
        t.increments('id');
        t.string('id_item');
        t.string('description');
        t.string('date_action');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('logs');
};
