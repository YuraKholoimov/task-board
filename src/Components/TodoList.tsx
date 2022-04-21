import {FilterType} from "../App";
import {AddItemForm} from "./AddItemForm";
import React, {useCallback} from "react";
import {EditSpan} from "./EditSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../state/tasks-reduser";
import {Task} from "./Task";

export type TodoListComponentType = {
    id: string
    title: string
    filter: string
    tasks: Array<TaskType>
    changeFilterTodoList: (filter: FilterType, id: string) => void
    addTask: (inputValue: string, objID: string) => void
    removeTodolist: (id: string) => void
    changeTodoListTitle: (value: string, id: string) => void
    removeTask: (idTask: string, idTodoList: string) => void
    onChangeTaskStatus: (id: string, isDone: boolean, objID: string) => void
    changeTaskTitle: (title: string, taskId: string, todolistId: string) => void
}

export const TodoList = React.memo((props: TodoListComponentType) => {
    console.log("Todolist Todolist Todolist")


    const onFilterChangeTodoListClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        let filter = e.currentTarget.innerText
        props.changeFilterTodoList(filter, props.id)
    }
    const removeTodolist = useCallback(() => props.removeTodolist(props.id), [props.removeTodolist, props.id])

    const addTask = useCallback((inputValue: string) => props.addTask(inputValue, props.id), [props.addTask, props.id])

    let tasksFoTodolist = props.tasks

    if (props.filter === "ACTIVE") {
        tasksFoTodolist = props.tasks.filter(t => !t.isDone)
    } else if (props.filter === "COMPLETED") {
        tasksFoTodolist = props.tasks.filter(t => t.isDone)
    }

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
            {/*------------------------- MAP TASKS --------------------*/}
            <div>
                {
                    tasksFoTodolist.map(task =>
                        <Task
                            key={task.id}
                            removeTask={props.removeTask}
                            onChangeTaskStatus={props.onChangeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                            task={task}
                            todoListId={props.id}
                        />
                    )
                }
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
})


