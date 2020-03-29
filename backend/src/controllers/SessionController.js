const connection = require('../database/connection');
const Log = require('./LogController');

module.exports = {
    async create(req, resp) {
        const { id } = req.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        if (!ong) {
            return resp.status(400).json({
                error: true,
                message: 'Nenhuma ONG registada com essa ID',
            });
        }

        return resp.json(ong);
    }
}
