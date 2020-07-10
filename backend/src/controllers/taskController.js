const connection = require('../database/connection');

module.exports = {

    async create(req, res) {
        const {time, exp_time} = req.body;
     
        try {
            await connection('task').insert({
                time, exp_time
            });
      
            return res.status(204).send();

        } catch (err) {
            return res.status(400).send(`Registration failed. \n Original Message:\n ${err}`)
        }
    },

    async indexTotal(req, res) {
        const {from, to} = req.body;

        try {
            const taskTotal = await connection('task').sum('exp_time as total').whereBetween('submit', [from, to]);
            //const taskSelect = await connection('task').sum('exp_time as total').whereBetween('submit', ['2020-07-10 00:00:00', '2020-07-10 23:59:59']);
            
            return res.json(taskTotal)

        } catch (err) {
            return res.status(400).send(`Request failed. \n Original Message:\n ${err}`)
        }
    },

    async indexLatest(req, res) {
        const {from, to} = req.body;

        try {
            const taskLatest = await connection('task').select('*').limit(5).orderBy('id', 'desc');
            
            return res.json(taskLatest)

        } catch (err) {
            return res.status(400).send(`Request failed. \n Original Message:\n ${err}`)
        }
    }
}