import React from "react";

type ToDoListType = {
    title: string
    task: Array<ObjOfArray>
    removeTask: (id: number) => void
    changeFilter: (n: string) => void
}

export type ObjOfArray = {
    id: number
    title: string
    isDone: boolean
}

export const ToDoList = (props: ToDoListType) => {

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.task.map(m => {
                return (
                    <li key={m.id}>
                        <button
                            onClick={() => props.removeTask(m.id)
                            }>x
                        </button>
                        <input type="checkbox" checked={m.isDone}/>
                        <span>{m.title}</span>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={() => props.changeFilter('All')}>All</button>
            <button onClick={() => props.changeFilter('Active')}>Active</button>
            <button onClick={() => props.changeFilter('Completed')}>Completed</button>
        </div>
    </div>
}