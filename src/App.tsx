import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./Components/ToDoList";

function App() {

    type setfilteredTasks = {
        id: number
        title: string
        isDone: boolean
    }

    const [tasks, setTask] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]);

    const [filter, setFilter] = useState('All')
    const [filteredTask, setfilteredTasks] = useState<setfilteredTasks>()

    const removeTask = (comId:number) => {
        setTask(tasks.filter((el)=> el.id !== comId ))
    }

    // let filteredTasks = tasks
    // if (value === "Active") {
    //     filteredTasks = tasks.filter(el => !el.isDone)
    // }
    // if (value === "Completed") {
    //     filteredTasks = tasks.filter(el => el.isDone)
    // }


        if (filter === "Active"){
            let filtered = tasks.filter(el=> !el.isDone)
            setfilteredTasks(filtered)
        }
        if (filter === "Completed"){
            let filtered =  tasks.filter(el=> el.isDone)
            setfilteredTasks(filtered)
        }

    return (
        <div className="App">
            <ToDoList
                title={'Title'}
                task={filteredTasks}
                removeTask={removeTask}
                changeFilter={setFilter}
            />
        </div>
    );
}

export default App;
