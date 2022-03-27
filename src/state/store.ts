import {combineReducers, createStore} from "redux";
import tasksReducer from "./tasks-reduser";
import {todoListsReducer} from "./todolist-reduser";

export type AppStateType = ReturnType<typeof rootReducer>


let preloadedState;
let x = localStorage.getItem('Trello')
    if(x) preloadedState = JSON.parse(x)

const rootReducer = combineReducers({
   tasks: tasksReducer,
    todoLists: todoListsReducer,
})
export const store = createStore(rootReducer, preloadedState);

store.subscribe(() => {
    const state = store.getState()
    localStorage.setItem("Trello", JSON.stringify(state))
})

export  const state = store.getState()

