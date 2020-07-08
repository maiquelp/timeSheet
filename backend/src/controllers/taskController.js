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
            return res.status(400).send('Registration failed' + err)
        }
    }
}