import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import {AppBar, Avatar, Button, Container, Toolbar, Typography} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {TodoListsList} from "../Features/TodoListslist/TodoListsList";

function App() {
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <TodoListsList/>
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
