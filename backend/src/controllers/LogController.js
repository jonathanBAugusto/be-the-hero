const connection = require('../database/connection');

module.exports = {
    async get() {
        return await connection('logs').select('*');
    },
    async add(id, description = '') {
        const date = (new Date()).toISOString();
        return await connection('logs').insert({
            id_item: id,
            description: JSON.stringify(description),
            date_action: date,
        });
    },
}
