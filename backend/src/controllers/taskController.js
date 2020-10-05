const connection = require('../database/connection');

function formatDate(date) {
  const d = date.getDate();
  const m = date.getMonth() + 1; //Month from 0 to 11
  const y = date.getFullYear();

  return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

// const getWeekDays = (sundayParm, saturdayParm ) => {
//   const sunday = new Date();
//   const saturday = new Date();
  
//   // sunday.setDate(sunday.getDate() - (sunday.getDay() + 7) % 7);
//   // saturday.setDate(saturday.getDate() + (saturday.getDay() + 7) % 14);
  
//   sunday.setDate(sunday.getDate() - (sunday.getDay() + 7) % 14);
//   saturday.setDate(saturday.getDate() - (saturday.getDay() + 7) % 7);

//   console.log(sunday + saturday);

//   return [formatDate(sunday), formatDate(saturday)];
// };

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

const getMonthDays = (month) => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth() + month;
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 1);

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
        
          const subQuery = connection('task').select('id').limit(1).orderBy('id', 'desc');
          
          await connection('task').where('id', subQuery).del();

          return res.status(204).send();
          
        } catch (err) {
          return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
        }
    },

    async indexWeek(req, res) {
      try {
        const [weekTasks] = await connection('task').count('id as tasks').whereBetween('submit', [getSunday(7), getSaturday(14)]);

        const [weekMinutes] = await connection('task').sum('time as minutes').whereBetween('submit', [getSunday(7), getSaturday(14)]);
        
        const [cost] = await connection('settings').select('cost');

        const [dollarVar] = await connection('settings').select('dollar');
        
        const dollars = { dollars: weekMinutes.minutes / 60 * cost.cost };

        const reals = { reals: dollars.dollars * dollarVar.dollar };

        const [LastWeekTasks] = await connection('task').count('id as lastTasks').whereBetween('submit', [getSunday(14), getSaturday(7)]);

        const [lastWeekMinutes] = await connection('task').sum('time as lastMinutes').whereBetween('submit', [getSunday(14), getSaturday(7)]);

        return res.json([weekTasks, weekMinutes, dollars, reals, LastWeekTasks, lastWeekMinutes]);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    },

    async indexMonth(req, res) {
      try {
        const [monthTasks] = await connection('task').count('id as tasks').whereBetween('submit', getMonthDays(0));

        const [monthMinutes] = await connection('task').sum('time as minutes').whereBetween('submit', getMonthDays(0));
        
        const [cost] = await connection('settings').select('cost');

        const [dollarVar] = await connection('settings').select('dollar');

        const dollars = { dollars: monthMinutes.minutes / 60 * cost.cost };

        const reals = { reals: dollars.dollars * dollarVar.dollar };

        const [LastMonthTasks] = await connection('task').count('id as lastTasks').whereBetween('submit', getMonthDays(-1));

        const [lastMonthMinutes] = await connection('task').sum('time as lastMinutes').whereBetween('submit', getMonthDays(-1));

        return res.json([monthTasks, monthMinutes, dollars, reals, LastMonthTasks, lastMonthMinutes]);

      } catch (err) {
        return res.status(400).send(`Request failed. \n Original Message:\n ${err}`);
      }
    },

    async indexDateInterval(req, res) {
      const interval = req.query;
      
      try {
        const [intervalTasks] = await connection('task').count('id as tasks').whereBetween('submit', [interval.from, interval.to]);

        const [intervalMinutes] = await connection('task').sum('time as minutes').whereBetween('submit', [interval.from, interval.to]);
        
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