import {combineReducers, createStore} from "redux";
import tasksReducer from "./tasks-reduser";
import {todoListsReducer} from "./todolist-reduser";

export type AppStateType = ReturnType<typeof rootReducer>


let preloadedState;
let storage = localStorage.getItem('Trello')
    if (storage) preloadedState = JSON.parse(storage)

const rootReducer = combineReducers({
   tasks: tasksReducer,
    todoLists: todoListsReducer,
})
export const store = createStore(rootReducer);

store.subscribe(() => {
    const state = store.getState()
    localStorage.setItem("Trello", JSON.stringify(state))
})

export const state = store.getState()

