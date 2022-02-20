import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./Components/ToDoList";
import {v1} from "uuid";

export type FilterType = "All" | "Active" | "Completed" | string
export type todoListType = {
    id: string
    title: string
    filter: string
}
type TasksStateType = {[key: string]: Array<TaskType>}

function App() {
    const todoListID1: string = v1();
    const todoListID2: string = v1();
    const todoListID3: string = v1();

    const [todoListsArrays, setTodoListsArrays] = useState<Array<todoListType>>([
        {id: todoListID1, title: "Todo list 1", filter: "Active"},
        {id: todoListID2, title: "Todo list 2", filter: "Active"},
        {id: todoListID3, title: "Todo list 3", filter: "Active"}
    ])

    const [tasks , setTasks] = useState<TasksStateType>({
        [todoListID1]: [
            {id: v1(), title: "New task", isDone: true},
            {id: v1(), title: "New task", isDone: false},
            {id: v1(), title: "New task", isDone: false},
            {id: v1(), title: "New task", isDone: false},
            {id: v1(), title: "New task", isDone: true},
        ],
        [todoListID2]: [
            {id: v1(), title: "New task", isDone: true},
            {id: v1(), title: "New task", isDone: false},
            {id: v1(), title: "New task", isDone: false},
        ],
        [todoListID3]: [
            {id: v1(), title: "New task", isDone: true},
            {id: v1(), title: "New task", isDone: false},
            {id: v1(), title: "New task", isDone: false},
        ]
    })

    const removeTask = (idTask: string, idTodoList: string) => {
        let taskArrFiltered = tasks[idTodoList].filter(t => t.id !== idTask)
        setTasks({...tasks, [idTodoList]: taskArrFiltered})
    }

    const addTask = (inputValue: string, idTdl: string) => {
        const newTask = {id: v1(), title: inputValue, isDone: false}
        tasks[idTdl] = [newTask, ...tasks[idTdl]]
       // setTodoListsOdj({...tasks,
        //     [idTdl] : [{...tasks[idTdl][0], id: v1(), title: inputValue, isDone: false}, ...tasks[idTdl] ]}
        // ) ///////sd
        setTasks({...tasks, [idTdl] : [...tasks[idTdl], newTask]}) //Имутабельно
    }

    const onChangeTaskStatus = (id: string, isDone: boolean, idTodoList: string) => {
        const task = tasks[idTodoList].find(t => t.id === id)
        if (task) task.isDone = isDone
        setTasks({...tasks})
    }

    const changeFilterToDoList = (filter: FilterType, id: string) => {
        let toDoListFinedById = todoListsArrays.find(el => el.id === id)
        if (toDoListFinedById) toDoListFinedById.filter = filter  //мутабельно
        setTodoListsArrays([...todoListsArrays])
    }

    const removeTodolist = (id:string ) => {
        setTodoListsArrays([ ...todoListsArrays.filter(tl => tl.id !== id)])
        delete tasks[id]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todoListsArrays.map(t => {
                let filteredTasks = tasks[t.id]
                if (t.filter === "Active") {
                    filteredTasks = tasks[t.id].filter(t => !t.isDone)
                } else if (t.filter === "Completed") {
                    filteredTasks = tasks[t.id].filter(t => t.isDone)
                }
                return <ToDoList
                    key={t.id}
                    id={t.id}
                    title={t.title}
                    filter={t.filter}
                    tasks={filteredTasks}
                    removeTask={removeTask}
                    changeFilterToDoList={changeFilterToDoList}
                    addTask={addTask}
                    onChangeTaskStatus={onChangeTaskStatus}
                    removeTodolist={removeTodolist}
                />
            })}
        </div>
    );
}

export default App;
