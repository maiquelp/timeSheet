const connection = require('../database/connection');

const getWeekDays = () => {
  const sunday = new Date();
  const saturday = new Date();
  
  sunday.setDate(sunday.getDate() - (sunday.getDay() + 7) % 7);
  saturday.setDate(saturday.getDate() + (saturday.getDay() + 1) % 7);

  function formatDate(date) {
      var d = date.getDate();
      var m = date.getMonth() + 1; //Month from 0 to 11
      var y = date.getFullYear();

      return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }

  const sundayFormat = formatDate(sunday);
  const saturdayFormat = formatDate(saturday);

  return [sundayFormat, saturdayFormat];
}

module.exports = {

    async create(req, res) {
        const {time} = req.body;
     
        try {
            await connection('task').insert({time});
      
            return res.status(204).send();

        } catch (err) {
            return res.status(400).send(`Registration failed. \n Original Message:\n ${err}`);
        }
    },

    async indexLatestTask(req, res) {
      //const {from, to} = req.body;
      
      try {
        const taskLatest = await connection('task').select('time', 'submit').limit(1).orderBy('id', 'desc');
        
        return res.json(taskLatest);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    },
    
    async deleteTask(req,res) {
      try {
        
          const subQuery = connection('task').select('id').limit(1).orderBy('id', 'desc');
          
          await connection('task').where('id', subQuery).del();

          return res.status(204).send();
          
        } catch (err) {
          return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
        }
    },

    async indexWeekMinutes(req, res) {    
        try {
            const weekMinutes = await connection('task').sum('time as minutes').whereBetween('submit', getWeekDays());
            
            return res.json(weekMinutes);

        } catch (err) {
            return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
        }
    },

    async indexWeekTasks(req, res) {
      try {
          const weekTasks = await connection('task').count('id as tasks').whereBetween('submit', getWeekDays());

          
          return res.json(weekTasks);

      } catch (err) {
          return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    },

}