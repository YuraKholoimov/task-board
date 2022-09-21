import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../App/store";
import {
    addTodoListTC,
    changeTodolistFilterAC,
    changeTodoListTitleTC,
    FilterType,
    removeTodoListTC,
    setTodoLists,
    TodoListDomainType
} from "./todolist-reduser";
import {addTaskTC, updateTaskTC, removeTaskTC, TasksStateType} from "./Task/tasks-reduser";
import React, {useCallback, useEffect} from "react";
import {TaskStatus} from "../../API/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {TodoList} from "./TodoList";
import {useNavigate} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodoListsList: React.FC<PropsType> = ({demo= false}) => {
    const todoListState = useSelector<AppRootStateType, TodoListDomainType[]>(state => state.todoLists)
    const tasksState = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch<any>()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(setTodoLists())
        } else {
            navigate('/login')
        }

    }, [isLoggedIn])

    //----------------------- CALLBACK ---------------------------
    const addTask = useCallback((idTdl: string, inputValue: string) => {
        dispatch(addTaskTC(idTdl, inputValue))
    }, [dispatch])

    const onChangeTaskStatus = useCallback(
        (id: string, status: TaskStatus, idTodoList: string) => {
            dispatch(updateTaskTC(id, {status}, idTodoList))
        }, [dispatch])

    const changeFilterTodoList = useCallback((filter: FilterType, id: string) => {
        dispatch(changeTodolistFilterAC({filter, id}))
    }, [dispatch])

    const removeTodolist = useCallback(
        (id: string) => dispatch(removeTodoListTC(id)), [dispatch])

    const removeTask = useCallback((taskId: string, todoListId: string) => {
        dispatch(removeTaskTC({taskId, todoListId}))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => dispatch(addTodoListTC(title)), [dispatch])

    const changeTodoListTitle = useCallback((value: string, id: string) => {
        dispatch(changeTodoListTitleTC(value, id))
    }, [dispatch])

    const changeTaskTitle = useCallback(
        // (id: string, status: TaskStatus, idTodoList: string) => {
        //     dispatch(changeTaskTC(id, {status}, idTodoList))

        (title: string, taskId: string, todolistId: string) => {
            dispatch(updateTaskTC(taskId, {title}, todolistId))
        }, [dispatch])

    // if (!isLoggedIn) {
    //     return <Navigate to={'/login'}/>
    // }


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
                                    // id={todoList.id}
                                    // title={todoList.title}
                                    // entityStatus={todoList.entityStatus}
                                    // filter={todoList.filter}
                                    todoList={todoList}
                                    tasks={tasks}
                                    removeTask={removeTask}
                                    changeFilterTodoList={changeFilterTodoList}
                                    addTask={addTask}
                                    onChangeTaskStatus={onChangeTaskStatus}
                                    removeTodolist={removeTodolist}
                                    changeTodoListTitle={changeTodoListTitle}
                                    changeTaskTitle={changeTaskTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })
            }
        </Grid>
    </>
}