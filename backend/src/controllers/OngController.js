const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');
const Log = require('./LogController');

module.exports = {
    async index(request, response) {
        await connection('ongs').select('*').then((result) => {
            return response.json(result);
        }).catch((error) => {
            Log.add(-1, error);
            return response.status(400).json({ error: true });
        });
    },
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = generateUniqueId();

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        }).then((result) => {
            return response.json({ id });
        }).catch((error) => {
            Log.add(id, error);
            return response.status(400).json({ error: true });
        });
    },
}
