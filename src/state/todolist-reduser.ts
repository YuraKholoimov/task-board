import {v1} from "uuid";
import {todoListApi, TodoListType} from "../API/todolists-api";
import {Dispatch} from "redux";


export type FilterType = "ALL" | "ACTIVE" | "COMPLETED" | string

export type TodoListDomainType = TodoListType & {
    filter: FilterType
}

//------------ ACTION TYPES
export type TodoListsActionTypes = ReturnType<typeof changeTodolistFilterAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof changeTodolistTitleAC> |
    ReturnType<typeof removeTodolistAC> |
    ReturnType<typeof setTodolistAC>

//---------- INITIAL STATE
export const todoListID1: string = v1();
export const todoListID2: string = v1();

export const InitialStateTodolist = [
    // {id: todoListID1, title: "", filter: "ALL", addedDate: "", order: 0},
]

//-------- TODOLIST REDUCER
export const todoListsReducer = (
    state: TodoListDomainType[] = InitialStateTodolist,
    action: TodoListsActionTypes): TodoListDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case "ADD-TODOLIST":
            const newTodolist: TodoListDomainType = {...action.todoList, filter: "ALL"}
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)]
        case "CHANGE-TODOLIST-FILTER":
            return [...state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)]
        case "SET-TODOLIST":
            return action.todoLists.map(tl => {
                return {...tl, filter: "ALL"}
            })
        default:
            return state
    }
}

//------------ ACTION CREATOR
export const changeTodolistTitleAC = (title: string, id: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',title, id
} as const);
export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST', todolistId
} as const);
export const changeTodolistFilterAC = (filter: FilterType, id: string) => ({
    type: "CHANGE-TODOLIST-FILTER", filter, id
} as const);

export const addTodolistAC = (todoList: TodoListType) => ({
    type: "ADD-TODOLIST", todoList
} as const)

export const setTodolistAC = (todoLists: TodoListType[]) => ({
    type: "SET-TODOLIST", todoLists
} as const)

//---------- THUNK
export const setTodoLists = () => (dispatch: Dispatch) => {
    todoListApi.getTodoLists()
        .then(res => {dispatch(setTodolistAC(res.data))})
}

export const removeTodoListTC = (todoListId: string) => (dispatch: Dispatch) => {
    todoListApi.deleteTodoList(todoListId)
        .then(res => {dispatch(removeTodolistAC(todoListId))})
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    todoListApi.createTodoList(title)
        .then(res => {
            console.log(res)
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const changeTodoListTitleTC = (title: string, id: string) => (dispatch: Dispatch) => {
    todoListApi.updateTodoList(id, title)
        .then(res => {
            console.log(res)
            dispatch(changeTodolistTitleAC(title, id))
        })
}