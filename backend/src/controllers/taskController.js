const connection = require('../database/connection');

function formatDate(date) {
  const d = date.getDate();
  const m = date.getMonth() + 1; //Month from 0 to 11
  const y = date.getFullYear();
  return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d); 
}

const getSunday = (period) => {
  const sunday = new Date();
  sunday.setDate(sunday.getDate() - (sunday.getDay() + 7) % period);
  return formatDate(sunday);
}

const getSaturday = (period) => {
  const saturday = new Date();
  period === 7 ?
    saturday.setDate(saturday.getDate() - (saturday.getDay() + 7) % period) :
    saturday.setDate(saturday.getDate() + (saturday.getDay() + 7) % period);
  return formatDate(saturday);
}

const getFirstDay = (param) => {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + param;
  return formatDate(new Date(y, m, 1));
}

const getLastDay = (param) => {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + param;
  return formatDate(new Date(y, m + 1, 1));
}

const getNextDay = (param) => {
  const date = new Date(param);
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  return formatDate(new Date(y, m, d + 2));
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

    async indexLast(req, res) {
      
      try {
        const taskLatest = await connection('task').select('time', 'submit').limit(1).orderBy('id', 'desc');
        
        return res.json(taskLatest);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    },
    
    async delete(req,res) {
      try {
        
          const subQuery = await connection('task').select('id').limit(1).orderBy('id', 'desc');
          
          await connection('task').where('id', subQuery).del();

          return res.status(204).send();
          
        } catch (err) {
          return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
        }
    },

    async indexWeek(req, res) {
      try {
        //current week tasks
        const [weekTasks] = await connection('task').count('id as tasks').whereBetween('submit', [getSunday(7), getSaturday(14)]);
        //current week minutes
        const [weekMinutes] = await connection('task').sum('time as minutes').whereBetween('submit', [getSunday(7), getSaturday(14)]);
        
        const [cost] = await connection('settings').select('cost');
        
        const [dollarVar] = await connection('settings').select('dollar');
        
        const dollars = { dollars: weekMinutes.minutes / 60 * cost.cost };

        const reals = { reals: dollars.dollars * dollarVar.dollar };
        //past week tasks
        const [LastWeekTasks] = await connection('task').count('id as lastTasks').whereBetween('submit', [getSunday(14), getSaturday(7)]);
        //past week minutes
        const [lastWeekMinutes] = await connection('task').select(connection.raw('coalesce(sum(time), 0) as lastMinutes')).whereBetween('submit', [getSunday(14), getSaturday(7)]);

        return res.json([weekTasks, weekMinutes, dollars, reals, LastWeekTasks, lastWeekMinutes]);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    },

    async indexMonth(req, res) {
      try {
        //current month tasks
        const [monthTasks] = await connection('task').count('id as tasks').whereBetween('submit', [getFirstDay(0), getLastDay(0)]);
        //current month minutes
        const [monthMinutes] = await connection('task').sum('time as minutes').whereBetween('submit', [getFirstDay(0), getLastDay(0)]);

        const [cost] = await connection('settings').select('cost');

        const [dollarVar] = await connection('settings').select('dollar');

        const dollars = { dollars: monthMinutes.minutes / 60 * cost.cost };

        const reals = { reals: dollars.dollars * dollarVar.dollar };
        //past month tasks
        const [lastMonthTasks] = await connection('task').count('id as lastTasks').whereBetween('submit', [getFirstDay(-1), getLastDay(-1)]);
        //past month minutes
        const [lastMonthMinutes] = await connection('task').select(connection.raw('coalesce(sum(time), 0) as lastMinutes')).whereBetween('submit', [getFirstDay(-1), getLastDay(-1)]);

        return res.json([monthTasks, monthMinutes, dollars, reals, lastMonthTasks, lastMonthMinutes]);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    },

    async indexDateInterval(req, res) {
      const interval = req.query;
      const from = interval.from;
      const to = getNextDay(interval.to);
      try {
        const [intervalTasks] = await connection('task').count('id as tasks').whereBetween('submit', [from, to]);

        const [intervalMinutes] = await connection('task').select(connection.raw('coalesce(sum(time), 0) as minutes')).whereBetween('submit', [from, to]);

        const [cost] = await connection('settings').select('cost');

        const [dollarVar] = await connection('settings').select('dollar');

        const dollars = { dollars: intervalMinutes.minutes / 60 * cost.cost };

        const reals = { reals: dollars.dollars * dollarVar.dollar };

        return res.json([intervalTasks, intervalMinutes, dollars, reals]);

      } catch (error) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    }
    
}