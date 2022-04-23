import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "api-key": "74a2af3c-45fa-4c81-b701-0275dea0591d"
    }
}

const axiosInstance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    ...settings
})

type TodoListType = {
    id: number,
    title: string,
    addedDate: string,
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    tasks: TaskType[]
}

type UpdateTask = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todoListApi = {
    getTodoLists() {
        return axiosInstance.get<TodoListType[]>("/todo-lists")
    },
    createTodoList(title: string) {
        return axiosInstance.post<ResponseType<{ title: string }>>("/todo-lists", {title: title})
    },
    updateTodoList(id: string, title: string) {
        return axiosInstance.put<ResponseType>(`/todo-lists${id}`, {title: title})
    },
    deleteTodoList(id: string) {
        return axiosInstance.post<ResponseType>(`/todo-lists/${id}`)
    },
    getTasks(todoListId: string) {
        return axiosInstance.get<GetTasksResponse>(`/todo-lists/${todoListId}/tasks`)
    },
    deleteTasks(todoListId: string, taskId: string) {
        return axiosInstance.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTask) {
        return axiosInstance.put<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`, {model: model})
    },
    createTask(todoListId: string, title: string) {
    return axiosInstance.post<ResponseType>(`todo-lists/${todoListId}/tasks`, {title: title})
}
}