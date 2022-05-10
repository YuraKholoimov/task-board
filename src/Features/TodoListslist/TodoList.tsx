import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import React, {useCallback, useEffect} from "react";
import {EditSpan} from "../../Components/EditSpan/EditSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {FilterType} from "./todolist-reduser";
import {TaskStatus, TaskType} from "../../API/todolists-api";
import {useDispatch} from "react-redux";
import {setTasks} from "./tasks-reduser";
import {RequestStatusType} from "../../App/App-reducer";

export type TodoListComponentType = {
    id: string
    title: string
    filter: string
    entityStatus: RequestStatusType
    tasks: Array<TaskType>
    changeFilterTodoList: (filter: FilterType, id: string) => void
    addTask: (objID: string, inputValue: string) => void
    removeTodolist: (id: string) => void
    changeTodoListTitle: (value: string, id: string) => void
    removeTask: (idTask: string, idTodoList: string) => void
    onChangeTaskStatus: (id: string, status: TaskStatus, objID: string) => void
    changeTaskTitle: (title: string, taskId: string, todolistId: string) => void
}

export const TodoList = React.memo((props: TodoListComponentType) => {
    let dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(setTasks(props.id))
    }, [])

    const onFilterChangeTodoListClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        let filter = e.currentTarget.innerText
        props.changeFilterTodoList(filter, props.id)
    }
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id])

    const addTask = useCallback((inputValue: string) => {
        props.addTask(props.id, inputValue)
    }, [props.addTask, props.id])

    let tasksFoTodolist = props.tasks

    if (props.filter === "ACTIVE") {
        tasksFoTodolist = props.tasks.filter(t => t.status !==  TaskStatus.New)
    } else if (props.filter === "COMPLETED") {
        tasksFoTodolist = props.tasks.filter(t => t.status !== TaskStatus.Completed)
    }
    console.log('todolist :' + props.entityStatus)
    return (
        <div>
            {/*---------------------TITLE TASK--------------------*/}
            <h3>
                <EditSpan
                    title={props.title}
                    callback={(value) => props.changeTodoListTitle(value, props.id)}
                />
                <IconButton onClick={removeTodolist} color="primary" disabled={props.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            {/*---------------------- INPUT FIELD TASK-------------------- */}
            <AddItemForm callback={addTask} disabled={props.entityStatus === 'loading'}/>
            {/*--------------------------- MAP TASKS ------------------------*/}
            <div>
                {
                    tasksFoTodolist?.map(task =>
                        <Task
                            key={task.id}
                            removeTask={props.removeTask}
                            onChangeTaskStatus={props.onChangeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                            task={task}
                            todoListId={props.id}
                            entityStatus={task.entityStatus}
                        />
                    )
                }
            </div>
            {/*----------------------------BUTTONS---------------------------*/}
            <div>
                <Button
                    variant={props.filter === "ALL" ? "contained" : "text"}
                    onClick={onFilterChangeTodoListClick}>ALL
                </Button>
                <Button
                    color={"primary"}
                    variant={props.filter === "ACTIVE" ? "contained" : "text"}
                    onClick={onFilterChangeTodoListClick}>ACTIVE
                </Button>
                <Button
                    color={"secondary"}
                    variant={props.filter === "COMPLETED" ? "contained" : "text"}
                    onClick={onFilterChangeTodoListClick}>COMPLETED
                </Button>
            </div>
        </div>
    )
})


