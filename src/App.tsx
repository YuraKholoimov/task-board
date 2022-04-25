import React, {useCallback} from 'react';
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
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterType,
    removeTodolistAC, TodoListDomainType,
} from "./state/todolist-reduser";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksStateType
} from "./state/tasks-reduser";
import {TaskStatus} from "./API/todolists-api";


function App() {
    //----------------------- STATE ---------------------------
    const todoListState = useSelector<AppStateType, TodoListDomainType[]>(state => state.todoLists)
    const tasksState = useSelector<AppStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    //----------------------- CALLBACK ---------------------------
    const removeTask = useCallback( (idTask: string, idTodoList: string) => {
        dispatch(removeTaskAC(idTask, idTodoList))
    }, [dispatch])

    const addTask = useCallback((inputValue: string, idTdl: string) => dispatch(addTaskAC(inputValue, idTdl)), [dispatch])

    const onChangeTaskStatus = useCallback((id: string, status: TaskStatus, idTodoList: string) => {
        dispatch(changeTaskStatusAC(id, status, idTodoList))
    }, [dispatch])

    const changeFilterTodoList = useCallback((filter: FilterType, id: string) => {
        dispatch(changeTodolistFilterAC(filter, id))
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => dispatch(removeTodolistAC(id)), [dispatch])

    const addTodoList = useCallback((title: string) => dispatch(addTodolistAC(title)), [dispatch])

    const changeTodoListTitle = useCallback((value: string, id: string) => {
        dispatch(changeTodolistTitleAC(value, id))
    }, [dispatch])

    const changeTaskTitle = useCallback((title: string, taskId: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(title, taskId, todolistId))
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
                        }
                        )
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
