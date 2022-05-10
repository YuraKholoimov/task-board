import {ResponseType} from "../API/todolists-api";
import {ErrorUtilsDispatchType, setAppErrorAC, setAppStatusAC} from "../App/App-reducer";
import { Dispatch } from 'redux';


// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<ErrorUtilsDispatchType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch<ErrorUtilsDispatchType>) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}

