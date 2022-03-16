import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Components/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import Box from '@mui/material/Box';
import {AppBar, Avatar, Button, Container, Grid, Paper, Typography} from "@mui/material";
import {Toolbar} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export type FilterType = "ALL" | "ACTIVE" | "COMPLETED" | string
export type TodoListType = {
    id: string
    title: string
    filter: string
}
export type TasksStateType = {
    [id: string ]: Array<TaskType>
}

function App() {
    const todoListID1: string = v1();
    const todoListID2: string = v1();
    const todoListID3: string = v1();

    //----------------------- STATE ---------------------------
    const [todoListsArrays, setTodoListsArrays] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "Todo list 1", filter: "ALL"},
        {id: todoListID2, title: "Todo list 2", filter: "ALL"},
        {id: todoListID3, title: "Todo list 3", filter: "ALL"}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1]: [
            {id: v1(), title: "New task", isDone: true},
            {id: v1(), title: "New task", isDone: false},
            {id: v1(), title: "New task", isDone: false},
            {id: v1(), title: "New task", isDone: false},
            {id: v1(), title: "New task", isDone: true},
        ],
        [todoListID2]: [
            {id: v1(), title: "New task", isDone: true},
            {id: v1(), title: "New task", isDone: false},
            {id: v1(), title: "New task", isDone: false},
        ],
        [todoListID3]: [
            {id: v1(), title: "New task", isDone: true},
            {id: v1(), title: "New task", isDone: false},
            {id: v1(), title: "New task", isDone: false},
        ]
    })
    //----------------------- ACTIONS ---------------------------
    const removeTask = (idTask: string, idTodoList: string) => {
        let taskArrFiltered = tasks[idTodoList].filter(t => t.id !== idTask)
        setTasks({...tasks, [idTodoList]: taskArrFiltered})
    }

    const addTask = (inputValue: string, idTdl: string) => {
        const newTask = {id: v1(), title: inputValue, isDone: false}
        setTasks({...tasks, [idTdl]: [newTask, ...tasks[idTdl]]}) //Имутабельно
    }

    const onChangeTaskStatus = (id: string, isDone: boolean, idTodoList: string) => {
        setTasks({
            ...tasks,
            [idTodoList]: tasks[idTodoList].map(t => t.id === id ? {...t, isDone} : t)
        })
    }

    const changeFilterTodoList = (filter: FilterType, id: string) => {
        setTodoListsArrays(todoListsArrays.map(t => t.id === id ? {...t, filter} : t))
    }

    const removeTodolist = (id: string) => {
        setTodoListsArrays([...todoListsArrays.filter(tl => tl.id !== id)])
        delete tasks[id]
        setTasks({...tasks})
    }

    const addTodoList = (title: string) => {
        const todoLists: TodoListType = {
            id: v1(),
            title: title,
            filter: "ALL"
        }
        setTodoListsArrays([todoLists, ...todoListsArrays])
        setTasks({...tasks, [todoLists.id]: []})
    }

    const changeTodoListTitle = (value: string, id: string) => {
        setTodoListsArrays([...todoListsArrays.map(t => {
                return t.id === id ? {...t, title: value} : t
            })]
        )
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm callback={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsArrays.map(t => {
                        let filteredTasks = tasks[t.id]
                        if (t.filter === "ACTIVE") {
                            filteredTasks = tasks[t.id].filter(t => !t.isDone)
                        } else if (t.filter === "COMPLETED") {
                            filteredTasks = tasks[t.id].filter(t => t.isDone)
                        }
                        return <Grid item>
                            <Paper elevation={3} style={{padding: "10px"}}>
                                <TodoList
                                    key={t.id}
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
                                />
                            </Paper>
                        </Grid>
                    })}
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
