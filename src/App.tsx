import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./Components/ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";

export type FilterType = "All" | "Active" | "Completed" | string
export type TodoListType = {
    id: string
    title: string
    filter: string
}
type TasksStateType = { [key: string]: Array<TaskType> }

function App() {
    const todoListID1: string = v1();
    const todoListID2: string = v1();
    const todoListID3: string = v1();

    const [todoListsArrays, setTodoListsArrays] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "Todo list 1", filter: "Active"},
        {id: todoListID2, title: "Todo list 2", filter: "Active"},
        {id: todoListID3, title: "Todo list 3", filter: "Active"}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
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
        setTasks({...tasks, [idTdl]: [newTask, ...tasks[idTdl] ]}) //Имутабельно
    }

    const onChangeTaskStatus = (id: string, isDone: boolean, idTodoList: string) => {
        setTasks({
            ...tasks,
            [idTodoList]: tasks[idTodoList].map(t => t.id === id ? {...t, isDone} : t)
        })
    }

    const changeFilterTodoList = (filter: FilterType, id: string) => {
        setTodoListsArrays(todoListsArrays.map(t => t.id === id ? {...t, filter} : t))
    }

    const removeTodolist = (id: string) => {
        setTodoListsArrays([...todoListsArrays.filter(tl => tl.id !== id)])
        delete tasks[id]
        setTasks({...tasks})
    }

    const  addTodoList = (title:string) => {
        const todoLists: TodoListType = {
            id: v1(),
            title: title,
            filter: "All"
        }
        setTodoListsArrays([todoLists, ...todoListsArrays ])
        setTasks({...tasks, [todoLists.id]: []})
    }

    const changeTodoListTitle = (value:string, id:string ) => {
        setTodoListsArrays([...todoListsArrays.map(t =>{
              return  t.id == id ? {...t, title: value} : t}) ]
        )
    }

    return (
        <div className="App">
            <AddItemForm callback={addTodoList} />
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
                    changeFilterTodoList={changeFilterTodoList}
                    addTask={addTask}
                    onChangeTaskStatus={onChangeTaskStatus}
                    removeTodolist={removeTodolist}
                    changeTodoListTitle={changeTodoListTitle}
                />
            })}
        </div>
    );
}

export default App;
