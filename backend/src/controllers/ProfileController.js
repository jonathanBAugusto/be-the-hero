const connection = require('../database/connection');
const Log = require('./LogController');

module.exports = {
    async index(req, resp) {
        const ong_id = req.headers.authorization;

        await connection('incidents')
            .where('ong_id', ong_id)
            .select('*')
            .then((incidents) => {
                return resp.json(incidents);
            })
            .catch((error) => {
                Log.add(ong_id, error);
                return resp.status(400).json({ error: true });
            });
    }
}
