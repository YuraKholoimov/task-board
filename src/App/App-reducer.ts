export const initialAppState = {
    status: 'loading' as RequestStatusType,
    error: null as AppErrorType
}

// ----REDUCER
export const appReducer = (state: InitialStateAppReduceType = initialAppState, action: ErrorUtilsDispatchType ): InitialStateAppReduceType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

// ----- ACTION CREATORS
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)

// ----- TYPES
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppErrorType = string | null
export type InitialStateAppReduceType = typeof initialAppState
export type ErrorUtilsDispatchType  = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>