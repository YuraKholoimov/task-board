import {FilterType, TodoListType} from "../App";
import {v1} from "uuid";

//------------------------------ ACTION TYPES
export type addTodolistFilterACType = ReturnType<typeof addTodolistFilterAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export type ActionsType = removeTodolistACType |
    changeTodolistTitleACType |
    addTodolistACType |
    addTodolistFilterACType

//------------------------------ ACTION CREATOR
export const changeTodolistTitleAC = (id: string, title: string)  => ({
    type: 'CHANGE-TODOLIST-TITLE', id, title
} as const);
export const removeTodolistAC = (todolistId: string)  => ({
    type: 'REMOVE-TODOLIST', todolistId
} as const);
export const addTodolistFilterAC = (id: string, filter: FilterType)  => ({
    type: "CHANGE-TODOLIST-FILTER", id, filter
} as const);

export const addTodolistAC = (title: string)  => ({
    type: "ADD-TODOLIST", title, todolistId: v1()
} as const)

//------------------------------ TODOLIST REDUCER
export const todolistsReducer = (state: TodoListType[], action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.todolistId)
        case "ADD-TODOLIST":
            return [...state,{id: action.todolistId, title: action.title, filter: "ALL"}]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map(tl => tl.id == action.id ? {...tl,title: action.title} : tl)]
        case "CHANGE-TODOLIST-FILTER":
            return [...state.map(tl => tl.id == action.id ? {...tl,filter: action.filter} : tl)]
        default:
            throw new Error("Error")
    }
}