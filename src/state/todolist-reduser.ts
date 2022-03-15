import {FilterType, TodoListType} from "../App";

export type ActionsType = RemoveTodolistActionType |
    ChangeTodolistTitleActionType |
    AddTodolistTitleActionType |
    AddTodolistFilterActionType

 type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
};
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
};
export type AddTodolistTitleActionType = {
    type: "ADD-TODOLIST",
    title: string
};
type AddTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    filter: FilterType
};

export const todolistReducer = (state: TodoListType[], action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case "ADD-TODOLIST":
            return [...state,{id: "3", title: action.title, filter: "ALL"}]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map(tl => tl.id == action.id ? {...tl,title: action.title} : tl)]
        default:
            throw new Error("Error")
    }
}