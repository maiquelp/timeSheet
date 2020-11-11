import TasksRepository from "../repositories/TasksRepository";
import { getFirstDay, getLastDay } from "../utils/handleDate";

class IndexMonthService {
  private tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  };

  public async execute() {
    const currentMonthFirstDay = getFirstDay(0);
    const currentMonthLastDay = getLastDay(0);
    const pastMonthFirstDay = getFirstDay(-1);
    const pastMonthLastDay = getLastDay(-1);
    const monthData = {currentMonthFirstDay, currentMonthLastDay, pastMonthFirstDay, pastMonthLastDay};

    const response = await this.tasksRepository.indexMonth(monthData);

    return response;
  };
}

export default IndexMonthService;