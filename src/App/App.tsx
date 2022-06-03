import React, {useEffect} from 'react';
import './App.css';
import {CircularProgress, Container} from "@mui/material";
import {TodoListsList} from "../Features/TodoListslist/TodoListsList";
import {ErrorSnackBar} from "../Components/ErrorSnackBar/ErrorSnackBar";
import {AppRootStateType} from "./store";
import {useSelector} from 'react-redux';
import {HeaderAppBar} from "../Components/HeaderAppBar/HeaderAppBar";
import {Routes, Route, Navigate} from "react-router-dom";
import {Login} from "../Features/Login/Login";
import { useDispatch } from 'react-redux';
import {initializeAppTC} from "./App-reducer";

function App() {
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch<any>()


    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            {error && <ErrorSnackBar error={error}/>}
            <HeaderAppBar/>
            <Container fixed>
                <Routes>
                    <Route path='/' element={<TodoListsList/>} />
                    <Route path='login' element={<Login/>} />
                    <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>} />
                    <Route path='*' element={<Navigate to={'/404'}/>} />
                </Routes>
            </Container>
        </div>
    );
}

export default App;