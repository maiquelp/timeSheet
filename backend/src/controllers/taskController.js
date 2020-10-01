const connection = require('../database/connection');

function formatDate(date) {
  const d = date.getDate();
  const m = date.getMonth() + 1; //Month from 0 to 11
  const y = date.getFullYear();

  return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

const getWeekDays = (sundayParm, saturdayParm ) => {
  const sunday = new Date();
  const saturday = new Date();
  
  sunday.setDate(sunday.getDate() - (sunday.getDay() + 7) % sundayParm);
  saturday.setDate(saturday.getDate() + (saturday.getDay() - saturdayParm) % 7);

  return [formatDate(sunday), formatDate(saturday)];
};

const getMonthDays = (month) => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth() + month;
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 1);

  console.log(formatDate(firstDay) + " " + formatDate(lastDay));

  return [formatDate(firstDay), formatDate(lastDay)];
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
            const [weekMinutes] = await connection('task').sum('time as minutes').whereBetween('submit', getWeekDays(7));

            return res.json(weekMinutes.minutes);

        } catch (err) {
            return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
        }
    },

    async indexWeekTasks(req, res) {
      try {
          const [weekTasks] = await connection('task').count('id as tasks').whereBetween('submit', getWeekDays(7));
         
          return res.json(weekTasks.tasks);

      } catch (err) {
          return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    },

    async indexWeekReals(req, res) {
      try {
        const [cost] = await connection('settings').select('cost');

        const [dollar] = await connection('settings').select('dollar');

        const [weekMinutes] = await connection('task').sum('time as minutes').whereBetween('submit', getWeekDays(7));

        const reals = weekMinutes.minutes / 60 * cost.cost * dollar.dollar;

        return res.json(reals);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    },

    async indexWeek(req, res) {
      try {
        const [weekTasks] = await connection('task').count('id as tasks').whereBetween('submit', getWeekDays(7, 1));

        const [weekMinutes] = await connection('task').sum('time as minutes').whereBetween('submit', getWeekDays(7, 1));
        
        const [cost] = await connection('settings').select('cost');

        const [dollar] = await connection('settings').select('dollar');

        const reals = { reals: weekMinutes.minutes / 60 * cost.cost * dollar.dollar };

        const [LastWeekTasks] = await connection('task').count('id as lastTasks').whereBetween('submit', getWeekDays(14, 8));

        const [lastWeekMinutes] = await connection('task').sum('time as lastMinutes').whereBetween('submit', getWeekDays(14, 8));

        return res.json([weekTasks, weekMinutes, reals, LastWeekTasks, lastWeekMinutes]);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    },

    async indexMonth(req, res) {
      try {
        const [monthTasks] = await connection('task').count('id as tasks').whereBetween('submit', getMonthDays(0));

        const [monthMinutes] = await connection('task').sum('time as minutes').whereBetween('submit', getMonthDays(0));
        
        const [cost] = await connection('settings').select('cost');

        const [dollar] = await connection('settings').select('dollar');

        const reals = { reals: monthMinutes.minutes / 60 * cost.cost * dollar.dollar };

        const [LastMonthTasks] = await connection('task').count('id as lastTasks').whereBetween('submit', getMonthDays(-1));

        const [lastMonthMinutes] = await connection('task').sum('time as lastMinutes').whereBetween('submit', getMonthDays(-1));

        return res.json([monthTasks, monthMinutes, reals, LastMonthTasks, lastMonthMinutes]);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    }



}