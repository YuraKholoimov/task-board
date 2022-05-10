import React from 'react';
import './App.css';
import {Container} from "@mui/material";
import {TodoListsList} from "../Features/TodoListslist/TodoListsList";
import {ErrorSnackBar} from "../Components/ErrorSnackBar/ErrorSnackBar";
import {AppRootStateType} from "./store";
import {useSelector} from 'react-redux';
import {HeaderAppBar} from "../Components/HeaderAppBar/HeaderAppBar";

function App() {
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    return (
        <div className="App">
            {error && <ErrorSnackBar error={error}/>}
            <HeaderAppBar/>
            <Container>
                <TodoListsList/>
            </Container>
        </div>
    );
}



export default App;
