import axios, {AxiosResponse} from "axios";
import {RequestStatusType} from "../App/App-reducer";

// ----- AXIOS
const settings = {
    withCredentials: true,
    headers: {
        "api-key": "74a2af3c-45fa-4c81-b701-0275dea0591d"
    }
}
const axiosInstance = axios.create({
    baseURL: "https://s ocial-network.samuraijs.com/api/1.1",
    ...settings
})

// ----- API
export const todoListApi = {
    getTodoLists() {
        return axiosInstance.get<TodoListType[]>("/todo-lists")
    },
    createTodoList(title: string) {
        return axiosInstance.post<ResponseType<{ item: TodoListType }>>("/todo-lists", {title: title})
    },
    updateTodoList(id: string, title: string) {
        return axiosInstance.put<ResponseType>(`/todo-lists/${id}`, {title: title})
    },
    deleteTodoList(id: string) {
        return axiosInstance.delete<ResponseType>(`/todo-lists/${id}`)
    },
    getTasks(todoListId: string) {
        return axiosInstance.get<GetTasksResponse>(`/todo-lists/${todoListId}/tasks`)
    },
    deleteTasks(taskId: string, todoListId: string) {
        return axiosInstance.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTask) {
        return axiosInstance.put<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`, model)
    },
    createTask(todoListId: string, title: string) {
        return axiosInstance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks`, {title: title})
    }
}


export const authAPI = {
    login(data: LoginParamsType) {
        return axiosInstance.post<LoginParamsType, AxiosResponse<ResponseType<{userId: number}>>>('/auth/login', data)
    },
    me() {
        return axiosInstance.get<ResponseType<{data: AuthMeTypes}>>('/auth/me')
    },
    logout() {
        return axiosInstance.delete<ResponseType>('/auth/login')
    }
}

// ----- TYPES
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

export type AuthMeTypes = {
    id: number
    email: string
    login: string
}

export enum TaskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    low,
    Middle,
    Hi,
    Urgently,
    Later,
}

export type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatus
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    entityStatus: RequestStatusType
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type UpdateTask = {
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriorities
    startDate: string
    deadline: string
}
