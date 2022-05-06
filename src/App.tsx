import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {AddItemForm} from "./Components/AddItemForm";
import Box from '@mui/material/Box';
import {AppBar, Avatar, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./state/store";
import {
    addTodoListTC,
    changeTodolistFilterAC,
    changeTodoListTitleTC,
    FilterType,
    removeTodoListTC,
    setTodoLists,
    TodoListDomainType,
} from "./state/todolist-reduser";
import {addTaskTC, changeTaskTC, removeTaskTC, TasksStateType} from "./state/tasks-reduser";
import {TaskStatus} from "./API/todolists-api";

function App() {
    //----------------------- STATE ---------------------------
    const todoListState = useSelector<AppStateType, TodoListDomainType[]>(state => state.todoLists)
    const tasksState = useSelector<AppStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch<any>()

    useEffect(()=> {
        dispatch(setTodoLists())
    }, [])

    //----------------------- CALLBACK ---------------------------
    const removeTask = useCallback( (idTask: string, idTodoList: string) => {
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
        dispatch(changeTaskTC(taskId,{title}, todolistId))
    }, [dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
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
            </Container>
        </div>
    );
}

export function ButtonAppBar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                    <Avatar alt="Remy Sharp" src="/Assets/MyAvatar.jpg"/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default App;
