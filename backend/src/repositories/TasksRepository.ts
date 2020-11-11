import connection from "../database/connection";
import Task from "../models/Task";

interface WeekDTO {
  currentWeekSunday: string;
  currentWeekSaturday: string;
  pastWeekSunday: string;
  pastWeekSaturday: string;
}

interface MonthDTO {
  currentMonthFirstDay: string;
  currentMonthLastDay: string;
  pastMonthFirstDay: string;
  pastMonthLastDay: string;
}

interface IntervalDTO {
  from: string;
  to: string;
}

class TasksRepository {
 
  public async create({time}: Task) {
    const task = new Task({time});

    await connection('task').insert(task);
  };

  public async indexLast() {
    const lastTask = await connection('task').select('time', 'submit').limit(1).orderBy('id', 'desc');
    
    return lastTask;
  };

  public async delete() {
    const [task] = await connection('task').select('id').limit(1).orderBy('id', 'desc');
          
    await connection('task').where('id', task.id).del();
  };

  public async indexWeek({currentWeekSunday, currentWeekSaturday, pastWeekSunday, pastWeekSaturday}: WeekDTO) {
    const [{tasks}] = await connection('task').count('id as tasks')
      .whereBetween('submit', [currentWeekSunday, currentWeekSaturday]);
      
    const [{minutes}] = await connection('task').select(connection
      .raw('coalesce(sum(time), 0) as minutes')).whereBetween('submit', [currentWeekSunday, currentWeekSaturday]);
        
    const [{cost}] = await connection('settings').select('cost');
        
    const [{dollar: dollarValue}] = await connection('settings').select('dollar');
        
    const dollars = minutes / 60 * cost;

    const reals = dollars * dollarValue;
    //past week tasks
    const [{lastTasks}] = await connection('task').count('id as lastTasks')
      .whereBetween('submit', [pastWeekSunday, pastWeekSaturday]);
    //past week minutes
    const [{lastMinutes}] = await connection('task').select(connection
      .raw('coalesce(sum(time), 0) as lastMinutes')).whereBetween('submit', [pastWeekSunday, pastWeekSaturday]);

    return {tasks, minutes, dollars, reals, lastTasks, lastMinutes};
  };

  public async indexMonth({currentMonthFirstDay, currentMonthLastDay, pastMonthFirstDay, pastMonthLastDay}: MonthDTO) {
    //current month tasks
    const [{tasks}] = await connection('task').count('id as tasks')
      .whereBetween('submit', [currentMonthFirstDay, currentMonthLastDay]);
    //current month minutes
    const [{minutes}] = await connection('task').select(connection
      .raw('coalesce(sum(time), 0) as minutes')).whereBetween('submit', [currentMonthFirstDay, currentMonthLastDay]);

    const [{cost}] = await connection('settings').select('cost');

    const [{dollar: dollarValue}] = await connection('settings').select('dollar');

    const dollars = minutes / 60 * cost;

    const reals = dollars * dollarValue;
    //past month tasks
    const [{lastTasks}] = await connection('task').count('id as lastTasks')
      .whereBetween('submit', [pastMonthFirstDay, pastMonthLastDay]);
    //past month minutes
    const [{lastMinutes}] = await connection('task').select(connection
      .raw('coalesce(sum(time), 0) as lastMinutes')).whereBetween('submit', [pastMonthFirstDay, pastMonthLastDay]);

    return {tasks, minutes, dollars, reals, lastTasks, lastMinutes};
  };

  public async indexInterval({from, to}: IntervalDTO) {
    const [{tasks}] = await connection('task').count('id as tasks').whereBetween('submit', [from, to]);

    const [{minutes}] = await connection('task').select(connection.raw('coalesce(sum(time), 0) as minutes'))
      .whereBetween('submit', [from, to]);

    const [{cost}] = await connection('settings').select('cost');

    const [{dollar: dollarValue}] = await connection('settings').select('dollar');

    const dollars = minutes / 60 * cost;

    const reals = dollars * dollarValue;

    return {tasks, minutes, dollars, reals};
  }
}
export default TasksRepository;