import React from 'react';
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
    changeTodolistTitleAC,
    removeTodolistAC,
    TodoListType
} from "./state/todolist-reduser";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksStateType
} from "./state/tasks-reduser";

export type FilterType = "ALL" | "ACTIVE" | "COMPLETED" | string

function App() {
    //----------------------- STATE ---------------------------

    const todoListState = useSelector<AppStateType, TodoListType[]>(state => state.todoLists)
    const tasksState = useSelector<AppStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    //----------------------- ACTIONS ---------------------------
    const removeTask = (idTask: string, idTodoList: string) => {
        dispatch(removeTaskAC(idTask, idTodoList))
    }

    const addTask = (inputValue: string, idTdl: string) => dispatch(addTaskAC(inputValue, idTdl))

    const onChangeTaskStatus = (id: string, isDone: boolean, idTodoList: string) => {
        dispatch(changeTaskStatusAC(id, isDone, idTodoList))
    }
    const changeFilterTodoList = (filter: FilterType, id: string) => {
        dispatch(changeTodolistFilterAC(filter, id))
    }
    const removeTodolist = (id: string) => dispatch(removeTodolistAC(id))

    const addTodoList = (title: string) => dispatch(addTodolistAC(title))

    const changeTodoListTitle = (value: string, id: string) => {
        dispatch(changeTodolistTitleAC(value, id))
    }
    const changeTaskTitle = (title: string, taskId: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(title, taskId, todolistId))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm callback={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoListState.map(t => {
                            let filteredTasks = tasksState[t.id]
                            if (t.filter === "ACTIVE") {
                                filteredTasks = tasksState[t.id].filter(t => !t.isDone)
                            } else if (t.filter === "COMPLETED") {
                                filteredTasks = tasksState[t.id].filter(t => t.isDone)
                            }
                            return (
                                <Grid item key={t.id}>
                                    <Paper elevation={3} style={{padding: "10px"}}>
                                        <TodoList
                                            id={t.id}
                                            title={t.title}
                                            filter={t.filter}
                                            tasks={filteredTasks}
                                            removeTask={removeTask}
                                            changeFilterTodoList={changeFilterTodoList}
                                            addTask={addTask}
                                            onChangeTaskStatus={onChangeTaskStatus}
                                            removeTodolist={removeTodolist}
                                            changeTodoListTitle={changeTodoListTitle}
                                            changeTaskTitle={(titlle, taskId) => changeTaskTitle(titlle, taskId, t.id )}
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
