import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import tasksReducer from "../Features/TodoListslist/Task/tasks-reduser";
import {todoListsReducer} from "../Features/TodoListslist/todolist-reduser";
import {appReducer} from "./App-reducer";
import {authReducer} from "../Features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
export type AppRootStateType = ReturnType<typeof rootReducer>


let preloadedState;
let storage = localStorage.getItem('Trello')
if (storage) preloadedState = JSON.parse(storage)

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer
})
// export const store = createStore(rootReducey,Middleware(thunk));
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

store.subscribe(() => {
    const state = store.getState()
    localStorage.setItem("Trello", JSON.stringify(state))
})

export const state = store.getState()

