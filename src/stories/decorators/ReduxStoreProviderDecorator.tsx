import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import tasksReducer from '../../Features/TodoListslist/Task/tasks-reduser'
import {todoListID1, todoListID2, todoListsReducer} from "../../Features/TodoListslist/todolist-reduser";
import {AppRootStateType} from "../../App/store";
import {TaskPriorities, TaskStatus} from "../../API/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: "",order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: "",order: 0}
    ] ,
    tasks: {
        [todoListID1]: [
            { description: "",
                title: "Type to change...",
                status: TaskStatus.Completed,
                priority: TaskPriorities.low,
                startDate: "",
                deadline: "",
                id: v1(),
                todoListId: todoListID1,
                order: 0,
                addedDate: ""},
            { description: "",
                title: "Type to change...",
                status: TaskStatus.Completed,
                priority: TaskPriorities.low,
                startDate: "",
                deadline: "",
                id: v1(),
                todoListId: todoListID1,
                order: 0,
                addedDate: ""}
        ],
        [todoListID2]: [
            { description: "",
                title: "Type to change...",
                status: TaskStatus.Completed,
                priority: TaskPriorities.low,
                startDate: "",
                deadline: "",
                id: v1(),
                todoListId: todoListID2,
                order: 0,
                addedDate: ""},
            { description: "",
                title: "Type to change...",
                status: TaskStatus.Completed,
                priority: TaskPriorities.low,
                startDate: "",
                deadline: "",
                id: v1(),
                todoListId: todoListID2,
                order: 0,
                addedDate: ""}
        ]
    },
    app: {
        error: null,
        status: 'idle',
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>{ storyFn() }</Provider>
)
