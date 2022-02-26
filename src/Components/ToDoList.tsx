import {FilterType} from "../App";
import {AddItemForm} from "./AddItemForm";
import React from "react";
import {EditSpan} from "./EditSpan";

export type TodoListComponentType = {
    id: string
    title: string
    filter: string
    tasks: Array<TaskType>
    removeTask: (idTask: string, idTodoList: string) => void
    changeFilterTodoList: (filter: FilterType, id: string) => void
    addTask: (inputValue: string, objID: string) => void
    onChangeTaskStatus: (id: string, isDone: boolean, objID: string) => void
    removeTodolist: (id: string) => void
    changeTodoListTitle: (value: string,id:string)=>void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const ToDoList: React.FC<TodoListComponentType> = (props) => {

    const onFilterChangeTodoListClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.changeFilterTodoList(e.currentTarget.innerText, props.id)
    }

    const removeTodolist = () => props.removeTodolist(props.id)

    const addTask = (inputValue: string) => props.addTask(inputValue, props.id)

    return (
        <div>
            <h3>
                <EditSpan
                    title={props.title}
                    callback={(value)=>props.changeTodoListTitle(value, props.id)}
                />
            </h3>

            <button onClick={removeTodolist}>X</button>
            {/*------------------------- INPUT FIELD-------------------- */}
            <AddItemForm callback={addTask}/>
            {/*------------------------- MAP TASKS -----------------*/}
            <ul>
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
                            <EditSpan title={task.title}/>
                            <button onClick={onClickRemoveHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            {/*----------------------------BUTTONS---------------------------*/}
            <div>
                <button
                    className={props.filter === "All" ? "active-filter" : ""}
                    onClick={onFilterChangeTodoListClick}>All
                </button>
                <button
                    className={props.filter === "Active" ? "active-filter" : ""}
                    onClick={onFilterChangeTodoListClick}>Active
                </button>
                <button
                    className={props.filter === "Completed" ? "active-filter" : ""}
                    onClick={onFilterChangeTodoListClick}>Completed
                </button>
            </div>
        </div>
    )
}



