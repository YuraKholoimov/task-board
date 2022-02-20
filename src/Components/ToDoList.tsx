import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterType} from "../App";

export type TodoListComponentType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (idTask: string, idTodoList: string) => void
    changeFilterToDoList: (filter: FilterType, id: string) => void
    filter: string
    addTask: (inputValue: string, objID: string) => void
    onChangeTaskStatus: (id: string, isDone: boolean, objID: string) => void
    removeTodolist:(id:string)=>void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const ToDoList: React.FC<TodoListComponentType> = (props) => {
    const [inputValue, setInputValue] = useState<string>("")
    const [btnAddTaskStatus, setBtnAddTaskStatus] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value) setError('Error')
        else setBtnAddTaskStatus(false)
        setInputValue(e.currentTarget.value)
    }

    const onAddTaskClick = () => {
        if (inputValue.trim() !== "") props.addTask(inputValue, props.id)
        else {
            setBtnAddTaskStatus(true)
            setError('Error')
        }
        setInputValue('')
    }

    const onInputKeyPressChange = (e: KeyboardEvent) => {
        setError(null)
        if (e.charCode === 13) onAddTaskClick()
    }

    const onTaskFilterHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.changeFilterToDoList(e.currentTarget.innerText, props.id)
    }

    const removeTodolist = () => props.removeTodolist(props.id)

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={removeTodolist}>X</button>
            <div>
                {/*--------------------- INPUT FIELD-------------------- */}
                <input
                    className={error ? "error" : ""}
                    value={inputValue}
                    onChange={onInputChange}
                    onKeyPress={onInputKeyPressChange}
                />
                {error && <span className={"error-message"}>{error}</span>}
                <button
                    onClick={onAddTaskClick}
                    disabled={btnAddTaskStatus}>+
                </button>
            </div>
            <ul>
                {/*-------------------- MAP TASKS -----------------*/}
                {props.tasks.map(task => {
                    const onClickRemoveHandler = () => props.removeTask(task.id, props.id)
                    const onChangStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                        props.onChangeTaskStatus(task.id, e.currentTarget.checked, props.id)
                    }
                    return (
                        <li key={task.id}
                            className={task.isDone ? "is-done" : ""}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={onChangStatusHandler}
                            />
                            <span>{task.title}</span>
                            <button onClick={onClickRemoveHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                {/*----------------------------BUTTONS---------------------------*/}
                <button
                    className={props.filter === "All" ? "active-filter" : ""}
                    onClick={onTaskFilterHandler}>All
                </button>
                <button
                    className={props.filter === "Active" ? "active-filter" : ""}
                    onClick={onTaskFilterHandler}>Active
                </button>
                <button
                    className={props.filter === "Completed" ? "active-filter" : ""}
                    onClick={onTaskFilterHandler}>Completed
                </button>
            </div>
        </div>
    )
}