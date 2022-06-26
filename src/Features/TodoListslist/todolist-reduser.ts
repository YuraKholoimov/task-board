import {v1} from "uuid";
import {todoListApi, TodoListType} from "../../API/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../App/App-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//---------- INITIAL STATE
export const todoListID1: string = v1();
export const todoListID2: string = v1();
export const InitialStateTodolist = [
    // {id: todoListID1, title: "", filter: "ALL", addedDate: "", order: 0},
]

const slice = createSlice({
    name: 'todolist',
    initialState: InitialStateTodolist as TodoListDomainType[],
    reducers: {
        changeTodolistTitleAC(state, action: PayloadAction<{ title: string, id: string }>) {
            const index = state.findIndex(t => t.id === action.payload.id)
            state[index].title = action.payload.title
        },
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex((t) => t.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1);
            }
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ filter: FilterType, id: string }>) {
            const index = state.findIndex(t => t.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        addTodolistAC(state, action: PayloadAction<{ todoList: TodoListType }>) {
            state.unshift({...action.payload.todoList, filter: "ALL", entityStatus: 'idle'})
        },
        setTodolistsAC(state, action: PayloadAction<{ todoLists: TodoListType[] }>) {
            return action.payload.todoLists.map(t => ({...t, filter: 'ALL', entityStatus: 'idle'}))
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(t => t.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        },
    }
})

//-------- TODOLIST REDUCER
// export const _todoListsReducer = (
//     state: TodoListDomainType[] = InitialStateTodolist,
//     action: TodoListsActionTypes): TodoListDomainType[] => {
//     switch (action.type) {
//         case 'REMOVE-TODOLIST':
//             return state.filter(tl => tl.id !== action.todolistId)
//         case "ADD-TODOLIST":
//             const newTodolist: TodoListType & TodoListDomainType = {
//                 ...action.todoList,
//                 filter: "ALL",
//                 entityStatus: 'idle'
//             }
//             return [newTodolist, ...state]
//         case 'CHANGE-TODOLIST-TITLE':
//             return [...state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)]
//         case "CHANGE-TODOLIST-FILTER":
//             return [...state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)]
//         case "SET-TODOLISTS":
//             return action.todoLists.map(tl => ({...tl, filter: "ALL"}) as TodoListDomainType)
//         case "CHANGE-TODOLIST-ENTITY-STATUS":
//             return state.map(tl => (tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl))
//         default:
//             return state
//     }
// }
export const todoListsReducer = slice.reducer;

//------ ACTIONS
// export const changeTodolistTitleAC = (title: string, id: string) => ({
//     type: 'CHANGE-TODOLIST-TITLE', title, id
// } as const);
//
// export const removeTodolistAC = (todolistId: string) => ({
//     type: 'REMOVE-TODOLIST', todolistId
// } as const);
//
// export const changeTodolistFilterAC = (filter: FilterType, id: string) => ({
//     type: "CHANGE-TODOLIST-FILTER", filter, id
// } as const);
//
// export const addTodolistAC = (todoList: TodoListType) => ({
//     type: "ADD-TODOLIST", todoList
// } as const)
//
// export const setTodolistsAC = (todoLists: TodoListType[]) => ({
//     type: "SET-TODOLISTS", todoLists
// } as const)
//
// export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
//     type: "CHANGE-TODOLIST-ENTITY-STATUS", id, entityStatus
// } as const)
export const {
    changeTodolistTitleAC,
    removeTodolistAC,
    changeTodolistFilterAC,
    addTodolistAC,
    setTodolistsAC,
    changeTodolistEntityStatusAC
} = slice.actions;

//------ THUNKS
export const setTodoLists = () => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todoListApi.getTodoLists()
        .then(res => {
            dispatch(setTodolistsAC({todoLists: res.data}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}

export const removeTodoListTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodolistEntityStatusAC({id: todoListId, entityStatus: 'loading'}))
    todoListApi.deleteTodoList(todoListId)
        .then(res => {
            dispatch(removeTodolistAC({todolistId: todoListId}))
            dispatch(setAppStatusAC({status: "succeeded"}))
            dispatch(changeTodolistEntityStatusAC({id: todoListId, entityStatus: 'succeeded'}))
        })
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todoListApi.createTodoList(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC({todoList: res.data.data.item}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                console.log(res)
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC({error: res.data.messages[0]}))
                } else {
                    dispatch(setAppErrorAC({error: "Some error occurred"}))
                }
                dispatch(setAppStatusAC({status: 'succeeded'}))

            }
        })
        .catch((error) => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC({status: 'failed'}))
        })
}

export const changeTodoListTitleTC = (title: string, id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todoListApi.updateTodoList(id, title)
        .then(res => {
            console.log(res)
            dispatch(setAppStatusAC({status: "succeeded"}))
            dispatch(changeTodolistTitleAC({title: title, id}))
        })
        .catch((error) => {
            dispatch(setAppErrorAC({error: error.message}))
            dispatch(setAppStatusAC({status: 'failed'}))
        })
}

//------ TYPES
export type FilterType = "ALL" | "ACTIVE" | "COMPLETED" | string;
export type TodoListDomainType = TodoListType & {
    filter: FilterType
    entityStatus: RequestStatusType
}
export type TodoListsActionTypes = ReturnType<typeof changeTodolistFilterAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof changeTodolistTitleAC> |
    ReturnType<typeof removeTodolistAC> |
    ReturnType<typeof setTodolistsAC> |
    ReturnType<typeof changeTodolistEntityStatusAC>

