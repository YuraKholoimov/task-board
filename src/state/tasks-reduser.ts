import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC, todoListID1} from "./todolist-reduser";
import {TaskPriorities, TaskStatus, TaskType} from "../API/todolists-api";

export type TasksStateType = {
    [id: string]: Array<TaskType>
}

//------------------------------ ACTIONS TYPES
export type ActionsTasksType = ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>


const InitialTasksState = {
    [todoListID1]: [
        {
            description: "",
            title: "Type to change...",
            status: TaskStatus.Completed,
            priority: TaskPriorities.low,
            startDate: "",
            deadline: "",
            id: v1(),
            todoListId: todoListID1,
            order: 0,
            addedDate: "",
        }
    ],
}

//------------------------------ TASKS REDUCER
const tasksReducer = (state: TasksStateType = InitialTasksState, action: ActionsTasksType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK":
            const newTask = {
                description: "",
                title: action.title,
                status: TaskStatus.Completed,
                priority: TaskPriorities.low,
                startDate: "",
                deadline: "",
                id: v1(),
                todoListId: action.todolistId,
                order: 0,
                addedDate: ""
            }
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case "REMOVE-TASK":
            let taskArrFiltered = state[action.todolistId].filter(t => t.id !== action.idTask)
            return {...state, [action.todolistId]: taskArrFiltered}
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.id ? {...t, status: action.status} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            let stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        default:
            return state
    }
}

//------------------------------ ACTION CREATOR
export const changeTaskStatusAC = (id: string, status: TaskStatus, todolistId: string) => ({
    type: "CHANGE-TASK-STATUS", id, status, todolistId
} as const);
export const removeTaskAC = (idTask: string, todolistId: string) => ({
    type: "REMOVE-TASK", idTask, todolistId
} as const);
export const addTaskAC = (title: string, todolistId: string) => ({
    type: "ADD-TASK", title, todolistId
} as const)
export const changeTaskTitleAC = (title: string, taskId: string, todolistId: string) => ({
    type: "CHANGE-TASK-TITLE", title, taskId, todolistId
} as const)

export default tasksReducer;