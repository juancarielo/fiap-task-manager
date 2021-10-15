import { TaskStatusEnum } from "./TaskStatusEnum";

export type GetTasksQueryParams = {
    finishPrevisionStart?: string;
    finishPrevisionEnd?: string;
    // status?: TaskStatusEnum;
    status?: string;
};
