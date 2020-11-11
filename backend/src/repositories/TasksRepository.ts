import connection from "../database/connection";
import Task from "../models/Task";

class TasksRepository {
  // private tasks: Task;

  // constructor(){
  //   this.tasks = {time: 0};
  // }

  public async create(time: number) {
    const task = new Task(time);

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

  public async indexWeek(week: String[]) {
    const [weekTasks] = await connection('task').count('id as tasks').whereBetween('submit', [week[0], week[1]]);
      
    const [weekMinutes] = await connection('task').select(connection.raw('coalesce(sum(time), 0) as minutes')).whereBetween('submit', [week[0], week[1]]);
        
    const [cost] = await connection('settings').select('cost');
        
    const [dollarVar] = await connection('settings').select('dollar');
        
    const dollars = { dollars: weekMinutes.minutes / 60 * cost.cost };

    const reals = { reals: dollars.dollars * dollarVar.dollar };
    //past week tasks
    const [LastWeekTasks] = await connection('task').count('id as lastTasks').whereBetween('submit', [week[2], week[3]]);
    //past week minutes
    const [lastWeekMinutes] = await connection('task').select(connection.raw('coalesce(sum(time), 0) as lastMinutes')).whereBetween('submit', [week[2], week[3]]);

    return [weekTasks, weekMinutes, dollars, reals, LastWeekTasks, lastWeekMinutes];
  };

  public async indexMonth(month: String[]) {
    //current month tasks
    const [monthTasks] = await connection('task').count('id as tasks').whereBetween('submit', [month[0], month[1]]);
    //current month minutes
    const [monthMinutes] = await connection('task').select(connection.raw('coalesce(sum(time), 0) as minutes')).whereBetween('submit', [month[0], month[1]]);

    const [cost] = await connection('settings').select('cost');

    const [dollarVar] = await connection('settings').select('dollar');

    const dollars = { dollars: monthMinutes.minutes / 60 * cost.cost };

    const reals = { reals: dollars.dollars * dollarVar.dollar };
    //past month tasks
    const [lastMonthTasks] = await connection('task').count('id as lastTasks').whereBetween('submit', [month[2], month[3]]);
    //past month minutes
    const [lastMonthMinutes] = await connection('task').select(connection.raw('coalesce(sum(time), 0) as lastMinutes')).whereBetween('submit', [month[2], month[3]]);

    return [monthTasks, monthMinutes, dollars, reals, lastMonthTasks, lastMonthMinutes];
  };

  public async indexInterval(from: string, to: string) {
    const [intervalTasks] = await connection('task').count('id as tasks').whereBetween('submit', [from, to]);

    const [intervalMinutes] = await connection('task').select(connection.raw('coalesce(sum(time), 0) as minutes')).whereBetween('submit', [from, to]);

    const [cost] = await connection('settings').select('cost');

    const [dollarVar] = await connection('settings').select('dollar');

    const dollars = { dollars: intervalMinutes.minutes / 60 * cost.cost };

    const reals = { reals: dollars.dollars * dollarVar.dollar };

    return [intervalTasks, intervalMinutes, dollars, reals];
  }
}
export default TasksRepository;