import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../App/store";
import {
    addTodoListTC,
    changeTodolistFilterAC,
    changeTodoListTitleTC,
    FilterType,
    removeTodoListTC,
    setTodoLists,
    TodoListDomainType
} from "./todolist-reduser";
import {addTaskTC, changeTaskTC, removeTaskTC, TasksStateType} from "./tasks-reduser";
import React, {useCallback, useEffect} from "react";
import {TaskStatus} from "../../API/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {TodoList} from "./TodoList";

export const TodoListsList = () => {
    const todoListState = useSelector<AppStateType, TodoListDomainType[]>(state => state.todoLists)
    const tasksState = useSelector<AppStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(setTodoLists())
    }, [])

    //----------------------- CALLBACK ---------------------------
    const removeTask = useCallback((idTask: string, idTodoList: string) => {
        dispatch(removeTaskTC(idTask, idTodoList))
    }, [dispatch])

    const addTask = useCallback((idTdl: string, inputValue: string) => {
        dispatch(addTaskTC(idTdl, inputValue))
    }, [dispatch])

    const onChangeTaskStatus = useCallback(
        (id: string, status: TaskStatus, idTodoList: string) => {
            dispatch(changeTaskTC(id, {status}, idTodoList))
        }, [dispatch])

    const changeFilterTodoList = useCallback((filter: FilterType, id: string) => {
        dispatch(changeTodolistFilterAC(filter, id))
    }, [dispatch])

    const removeTodolist = useCallback(
        (id: string) => dispatch(removeTodoListTC(id)), [dispatch])

    const addTodoList = useCallback((title: string) => dispatch(addTodoListTC(title)), [dispatch])

    const changeTodoListTitle = useCallback((value: string, id: string) => {
        dispatch(changeTodoListTitleTC(value, id))
    }, [dispatch])

    const changeTaskTitle = useCallback(
        // (id: string, status: TaskStatus, idTodoList: string) => {
        //     dispatch(changeTaskTC(id, {status}, idTodoList))

        (title: string, taskId: string, todolistId: string) => {
            dispatch(changeTaskTC(taskId, {title}, todolistId))
        }, [dispatch])
    return <>
        <Grid container style={{padding: "10px"}}>
            <AddItemForm callback={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todoListState.map(todoList => {
                    let tasks = tasksState[todoList.id]

                    return (
                        <Grid item key={todoList.id}>
                            <Paper elevation={3} style={{padding: "10px"}}>
                                <TodoList
                                    id={todoList.id}
                                    title={todoList.title}
                                    filter={todoList.filter}
                                    tasks={tasks}
                                    removeTask={removeTask}
                                    changeFilterTodoList={changeFilterTodoList}
                                    addTask={addTask}
                                    onChangeTaskStatus={onChangeTaskStatus}
                                    removeTodolist={removeTodolist}
                                    changeTodoListTitle={changeTodoListTitle}
                                    changeTaskTitle={changeTaskTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })
            }
        </Grid>
    </>
}