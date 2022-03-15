import {FilterType} from "../App";
import {AddItemForm} from "./AddItemForm";
import React from "react";
import {EditSpan} from "./EditSpan";
import {Button, Checkbox, Grid, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import pink from "@mui/material/colors/pink";

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
    changeTodoListTitle: (value: string, id: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const ToDoList: React.FC<TodoListComponentType> = (props) => {

    const onFilterChangeTodoListClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        let filter = e.currentTarget.innerText
        props.changeFilterTodoList(filter, props.id)
    }

    const removeTodolist = () => props.removeTodolist(props.id)

    const addTask = (inputValue: string) => props.addTask(inputValue, props.id)

    return (
        <div>
            {/*---------------------TITLE TASK--------------------*/}
            <h3>
                <EditSpan
                title={props.title}
                callback={(value) => props.changeTodoListTitle(value, props.id)}
            />
                <IconButton onClick={removeTodolist} color="primary">
                    <Delete/>
                </IconButton>
            </h3>
            {/*------------------------- INPUT FIELD TASK-------------------- */}
            <AddItemForm callback={addTask}/>
            {/*------------------------- MAP TASKS -----------------*/}
            <div>
                { props.tasks.map(task => {
                    const onClickRemoveHandler = () => props.removeTask(task.id, props.id)
                    const onChangStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                        props.onChangeTaskStatus(task.id, e.currentTarget.checked, props.id)
                    }
                    return (
                        <div key={task.id}
                            className={task.isDone ? "is-done" : ""}>
                            <Checkbox
                                sx={{
                                    color: pink[800],
                                    '&.Mui-checked': {
                                        color: pink[600],
                                    }
                                }}
                                checked={task.isDone}
                                onChange={onChangStatusHandler}
                            />
                            <EditSpan title={task.title}/>
                            <IconButton aria-label="delete"
                                        onClick={onClickRemoveHandler}
                            >
                                <Delete/>
                            </IconButton>
                        </div>
                    )
                })}
            </div>
            {/*----------------------------BUTTONS---------------------------*/}
            <div>
                <Button
                    variant={props.filter === "ALL" ? "contained" : "text"}
                    onClick={onFilterChangeTodoListClick}>All
                </Button>
                <Button
                    color={"primary"}
                    variant={props.filter === "ACTIVE" ? "contained" : "text"}
                    onClick={onFilterChangeTodoListClick}>Active
                </Button>
                <Button
                    color={"secondary"}
                    variant={props.filter === "COMPLETED" ? "contained" : "text"}
                    onClick={onFilterChangeTodoListClick}>Completed
                </Button>
            </div>
        </div>
    )
}



