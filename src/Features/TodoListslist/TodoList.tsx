import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import React, {useCallback, useEffect} from "react";
import {EditSpan} from "../../Components/EditSpan/EditSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {FilterType, TodoListDomainType} from "./todolist-reduser";
import {TaskStatus, TaskType} from "../../API/todolists-api";
import {useDispatch} from "react-redux";
import {setTasks} from "./Task/tasks-reduser";

export type TodoListComponentType = {
    todoList: TodoListDomainType
    tasks: Array<TaskType>
    changeFilterTodoList: (filter: FilterType, id: string) => void
    addTask: (objID: string, inputValue: string) => void
    removeTodolist: (id: string) => void
    changeTodoListTitle: (value: string, id: string) => void
    removeTask: (idTask: string, idTodoList: string) => void
    onChangeTaskStatus: (id: string, status: TaskStatus, objID: string) => void
    changeTaskTitle: (title: string, taskId: string, todolistId: string) => void
    demo?: boolean
}

export const TodoList = React.memo((props: TodoListComponentType) => {
    let dispatch = useDispatch<any>()

    useEffect(() => {
        if (props.demo) {
            return
        }
        dispatch(setTasks(props.todoList.id))
    }, [])

    const onFilterChangeTodoListClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        let filter = e.currentTarget.innerText
        props.changeFilterTodoList(filter, props.todoList.id)
    }
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todoList.id)
    }, [props.removeTodolist, props.todoList.id])

    const addTask = useCallback((inputValue: string) => {
        props.addTask(props.todoList.id, inputValue)
    }, [props.addTask, props.todoList.id])

    let tasksFoTodolist = props.tasks

    if (props.todoList.filter === "ACTIVE") {
        tasksFoTodolist = props.tasks.filter(t => t.status !==  TaskStatus.New)
    } else if (props.todoList.filter === "COMPLETED") {
        tasksFoTodolist = props.tasks.filter(t => t.status !== TaskStatus.Completed)
    }

    return (
        <div>
            {/*---------------------TITLE TASK--------------------*/}
            <h3>
                <EditSpan
                    title={props.todoList.title}
                    callback={(value) => props.changeTodoListTitle(value, props.todoList.id)}
                />
                <IconButton onClick={removeTodolist} color="primary" disabled={props.todoList.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            {/*---------------------- INPUT FIELD TASK-------------------- */}
            <AddItemForm callback={addTask} disabled={props.todoList.entityStatus === 'loading'}/>
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
                            todoListId={props.todoList.id}
                            entityStatus={task.entityStatus}
                        />
                    )
                }
            </div>
            {/*----------------------------BUTTONS---------------------------*/}
            <div>
                <Button
                    variant={props.todoList.filter === "ALL" ? "contained" : "text"}
                    onClick={onFilterChangeTodoListClick}>ALL
                </Button>
                <Button
                    color={"primary"}
                    variant={props.todoList.filter === "ACTIVE" ? "contained" : "text"}
                    onClick={onFilterChangeTodoListClick}>ACTIVE
                </Button>
                <Button
                    color={"secondary"}
                    variant={props.todoList.filter === "COMPLETED" ? "contained" : "text"}
                    onClick={onFilterChangeTodoListClick}>COMPLETED
                </Button>
            </div>
        </div>
    )
})


