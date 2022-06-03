import { Dispatch } from "redux";
import {authAPI} from "../API/todolists-api";
import {setIsLoggedInAC} from "../Features/Login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../Utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialAppState = {
    status: 'loading' as RequestStatusType,
    error: null as AppErrorType,
    isInitialized: false
}

const slice = createSlice({
    name: "app",
    initialState: initialAppState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: string | null }>) {
            state.error = action.payload.error
        },
        setAppIsInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

// ----REDUCER
export const appReducer = slice.reducer;

// ----- ACTION CREATORS
// export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
// export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
// export const setAppIsInitializedAC = (isInitialized: boolean) => ({type: "APP/ISINITIALIZED", isInitialized} as const)
export const {setAppStatusAC, setAppIsInitializedAC, setAppErrorAC} = slice.actions


//------ THUNK
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(slice.actions.setAppStatusAC({status: 'loading'}))
    authAPI.me().then(res => {
        // debugger
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
            dispatch(slice.actions.setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(slice.actions.setAppIsInitializedAC({isInitialized: true}))
        })

}


// ----- TYPES
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppErrorType = string | null
export type InitialStateAppReduceType = typeof initialAppState
export type ErrorUtilsDispatchType  = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppIsInitializedAC>



// export const appReducer = (state: InitialStateAppReduceType = initialAppState, action: ErrorUtilsDispatchType ): InitialStateAppReduceType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         case 'APP/ISINITIALIZED':
//             return {...state, isInitialized: action.isInitialized}
//         default:
//             return state
//     }
// }