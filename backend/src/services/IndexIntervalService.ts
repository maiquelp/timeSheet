import TasksRepository from "../repositories/TasksRepository";
import { getNextDay } from "../utils/handleDate";

interface RequestOTD {
  from: string;
  to: string;
}

class IndexIntervalService {
  private tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  };

  public async execute({from, to}: RequestOTD) {
    const nextTo = getNextDay(to);

    const interval = {from, to: nextTo};

    const response = await this.tasksRepository.indexInterval(interval);

    return response;
  };
}

export default IndexIntervalService;