import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import tasksReducer from "../Features/TodoListslist/tasks-reduser";
import {todoListsReducer} from "../Features/TodoListslist/todolist-reduser";
import {appReducer} from "./App-reducer";

export type AppRootStateType = ReturnType<typeof rootReducer>


let preloadedState;
let storage = localStorage.getItem('Trello')
if (storage) preloadedState = JSON.parse(storage)

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => {
    const state = store.getState()
    localStorage.setItem("Trello", JSON.stringify(state))
})

export const state = store.getState()

