import {v1} from "uuid";
import {TodoListType} from "../API/todolists-api";

export type FilterType = "ALL" | "ACTIVE" | "COMPLETED" | string

export type TodoListDomainType = TodoListType & {
    filter: FilterType
}

//------------------------------ INITIAL STATE
export const todoListID1: string = v1();
export const todoListID2: string = v1();

const InitialStateTodolist = [
    {id: todoListID1, title: "Click to change...", filter: "ALL", addedDate: "", order: 0},
]

//------------------------------ TODOLIST REDUCER
export const todoListsReducer = (
    state: TodoListDomainType[] = InitialStateTodolist,
    action: TodoListsActionTypes): TodoListDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case "ADD-TODOLIST":
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: "ALL",
                addedDate: "",
                order: 0
            }]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)]
        case "CHANGE-TODOLIST-FILTER":
            return [...state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)]
        default:
            return state
    }
}

//------------------------------ ACTION TYPES

export type TodoListsActionTypes = ReturnType<typeof changeTodolistFilterAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof changeTodolistTitleAC> |
    ReturnType<typeof removeTodolistAC>

//------------------------------ ACTION CREATOR
export const changeTodolistTitleAC = (title: string, id: string ) => ({
    type: 'CHANGE-TODOLIST-TITLE',title, id
} as const);
export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST', todolistId
} as const);
export const changeTodolistFilterAC = (filter: FilterType, id: string) => ({
    type: "CHANGE-TODOLIST-FILTER", filter, id
} as const);

export const addTodolistAC = (title: string) => ({
    type: "ADD-TODOLIST", title, todolistId: v1()
} as const)