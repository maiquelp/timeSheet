const connection = require('../database/connection');

module.exports = {

    async update(req, res) {
        const settings = req.body;
     
        try {
            await connection('settings').update(settings);
      
            return res.json(settings);

        } catch (err) {
            return res.status(400).send(`Registration failed. \n Original Message:\n ${err}`);
        }
    },

    async index(req, res) {
      
      try {
        const settings = await connection('settings').select('*');
        
        return res.json(settings);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    }
}