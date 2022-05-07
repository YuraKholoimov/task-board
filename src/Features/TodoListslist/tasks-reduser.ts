import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolist-reduser";
import {TaskPriorities, TaskStatus, TaskType, todoListApi, UpdateTask} from "../../API/todolists-api";
import {Dispatch} from "redux";
import {AppStateType} from "../../App/store";


//---------- TYPES
export type ActionsTasksType = ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>
export type TasksStateType = {
    [id: string]: Array<TaskType>
}

const InitialTasksState = {
    // [todoListID1]: [
    //     {
    //         description: "",
    //         title: "Type to change...",
    //         status: TaskStatus.Completed,
    //         priority: TaskPriorities.low,
    //         startDate: "",
    //         deadline: "",
    //         id: v1(),
    //         todoListId: todoListID1,
    //         order: 0,
    //         addedDate: "",
    //     }
    // ],
}

//---------- TASKS REDUCER
const tasksReducer = (
    state: TasksStateType = InitialTasksState,
    action: ActionsTasksType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK":
            return {...state, [action.todolistId]: [action.task, ...state[action.todolistId]]}
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id !== action.idTask)
            }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.id ? {...t, ...action.model} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todoList.id]: []}
        case 'REMOVE-TODOLIST':
            let stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        case 'SET-TODOLISTS':
            return action.todoLists.reduce((sum, tl) => {
                sum[tl.id] = []
                return sum
            }, {...state})
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

//---------- ACTION CREATOR
export const updateTaskAC = (id: string, model: UpdateDomainTaskModalTask, todolistId: string) => ({
    type: "UPDATE-TASK", id, model, todolistId
} as const);

export const removeTaskAC = (idTask: string, todolistId: string) => ({
    type: "REMOVE-TASK", idTask, todolistId
} as const);

export const addTaskAC = (task: TaskType, todolistId: string) => ({
    type: "ADD-TASK", task, todolistId
} as const)

export const changeTaskTitleAC = (title: string, taskId: string, todolistId: string) => ({
    type: "CHANGE-TASK-TITLE", title, taskId, todolistId
} as const)

export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({
    type: "SET-TASKS", tasks, todolistId
} as const)

//---------- THUNK
export type setTasksAC = ReturnType<typeof setTasks>

export const setTasks = (dotolistId: string) => (dispatch: Dispatch) => {
    todoListApi.getTasks(dotolistId)
        .then(res => dispatch(setTasksAC(res.data.items, dotolistId)))
}

export const removeTaskTC = (taskId: string, todoListId: string) => (dispatch: Dispatch) => {
    todoListApi.deleteTasks(taskId, todoListId)
        .then(res => dispatch(removeTaskAC(taskId, todoListId)))
}

export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    todoListApi.createTask(todoListId, title)
        .then(res => dispatch(addTaskAC(res.data.data.item, todoListId)))
}

type UpdateDomainTaskModalTask = {
    title?: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const changeTaskTC = ((taskId: string, domainModel: UpdateDomainTaskModalTask, todolistId: string) => (
    dispatch: Dispatch, getState: () => AppStateType) => {

    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)

    if (!task) return console.warn("Task Not Fount in the State")

    const apiModel: UpdateTask = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModel
    }
    todoListApi.updateTask(todolistId, taskId, apiModel)
        .then(res => {
            console.log(res)
            dispatch(updateTaskAC(taskId, domainModel, todolistId))
        })
})

export default tasksReducer;