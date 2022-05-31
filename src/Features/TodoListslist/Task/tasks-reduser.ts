import {
    addTodolistAC,
    changeTodolistEntityStatusAC,
    removeTodolistAC,
    setTodolistsAC,
    TodoListsActionTypes
} from "../todolist-reduser";
import {TaskPriorities, TaskStatus, TaskType, todoListApi, UpdateTask} from "../../../API/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../App/store";
import {ErrorUtilsDispatchType, RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../../App/App-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../Utils/error-utils";

const InitialTasksState = {}

//---------- TASKS REDUCER
const tasksReducer = (
    state: TasksStateType = InitialTasksState,
    action: ActionsTasksType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK":
            return {...state, [action.todolistId]: [action.task, ...state[action.todolistId]]}
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.idTask)}
        case "UPDATE-TASK":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.id ? {...t, ...action.model} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
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
        case "CHANGE-TASK-ENTITY-STATUS":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.tasksId ? {...t, entityStatus: action.entityStatus} : t)
            }
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

export const changeTaskEntityStatusAC = (tasksId: string, todolistId: string, entityStatus: RequestStatusType) => ({
    type: "CHANGE-TASK-ENTITY-STATUS", tasksId, todolistId, entityStatus
} as const)

//---------- THUNK
export const setTasks = (dotolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todoListApi.getTasks(dotolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, dotolistId))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTaskTC = (taskId: string, todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTaskEntityStatusAC(taskId, todoListId, "loading"))
    todoListApi.deleteTasks(taskId, todoListId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todoListId))
                dispatch(setAppStatusAC("succeeded"))
                dispatch(changeTaskEntityStatusAC(taskId, todoListId, "succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTaskTC = (todolistId: string, title: string) => (
    dispatch: Dispatch<ErrorUtilsDispatchType | TodoListsActionTypes | ActionsTasksType>) => {
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    dispatch(setAppStatusAC('loading'))
    todoListApi.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item, todolistId))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModalTask, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTaskEntityStatusAC(taskId, todolistId, "loading"))

    todoListApi.updateTask(todolistId, taskId, apiModel)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
                dispatch(setAppStatusAC("succeeded"))
                dispatch(changeTaskEntityStatusAC(taskId, todolistId, "succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            console.log(error)
            handleServerNetworkError(error, dispatch)
        })
}

//---------- TYPES
export type ActionsTasksType = ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTaskEntityStatusAC>

export type TasksStateType = {[id: string]: Array<TaskType>}

type UpdateDomainTaskModalTask = {
    title?: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export default tasksReducer;