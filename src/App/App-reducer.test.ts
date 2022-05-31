import {appReducer, InitialStateAppReduceType, setAppErrorAC} from "./App-reducer";

let startState: InitialStateAppReduceType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})

test("Correct message chuold be set", () => {
    const endState = appReducer(startState, setAppErrorAC('Some error'))

    expect(endState.error).toBe('Some error')
})