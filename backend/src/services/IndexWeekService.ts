import TasksRepository from "../repositories/TasksRepository";
import { getSunday, getSaturday } from "../utils/handleDate";

class IndexWeekService {
  private tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  };

  public async execute() {
    const currentWeekSunday = getSunday(7);
    const currentWeekSaturday = getSaturday(14);
    const pastWeekSunday = getSunday(14);
    const pastWeekSaturday = getSaturday(7);

    const weekData = {currentWeekSunday, currentWeekSaturday, pastWeekSunday, pastWeekSaturday};

    const response = await this.tasksRepository.indexWeek(weekData);

    return response;
  };
}

export default IndexWeekService;