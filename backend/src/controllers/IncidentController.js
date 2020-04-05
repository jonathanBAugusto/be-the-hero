const connection = require('../database/connection');
const Log = require('./LogController');

module.exports = {
    async index(req, resp) {
        const { page = 1 } = req.query;
        const offset = 5;

        const [count] = await connection('incidents').count();

        await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(offset)
            .offset((page - 1) * offset)
            .select(['incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'city',
                'uf'])
            .then((incidents) => {
                return resp
                    .header('X-Total-Count', count['count(*)'])
                    .json(incidents);
            }).catch((error) => {
                Log.add(-1, error);
                return resp.json({ error: true });
            });
    },
    async create(req, resp) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        }).then(([id]) => {
            return resp.json({ id });
        }).catch((error) => {
            Log.add(-1, error);
            return resp.json({ error: true });
        });
    },
    async delete(req, resp) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()
            .catch((error) => {
                Log.add(id, error);
                return resp.status(400).json({ error: 'Fail in execute operation' });
            });

        if (!incident || incident.ong_id !== ong_id) {
            return resp.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('incidents').where('id', id).delete().then(() => {
            return resp.status(204).send();
        }).catch((error) => {
            Log.add(-1, error);
            return resp.status(400).json({ error: true });
        });
    },
}
