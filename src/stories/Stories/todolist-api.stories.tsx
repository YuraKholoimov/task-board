import React, {useEffect, useState} from 'react'
import {todoListApi} from "../../API/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todoListApi.getTodoLists()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todoListApi.createTodoList("New")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.deleteTodoList("4c59383c-6d60-40c9-a476-7813376c898c")
            .then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.updateTodoList("39eac704-e2f7-4d30-a88b-7b849f030fec", "Update title")
            .then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.getTasks("4c59383c-6d60-40c9-a476-7813376c898c")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.deleteTasks("4c59383c-6d60-40c9-a476-7813376c898c", "")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

// export const UprateTasks = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         todoListApi.updateTask("4c59383c-6d60-40c9-a476-7813376c898c", "1")
//             .then((res) => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.createTask("4c59383c-6d60-40c9-a476-7813376c898c", 'Created task')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}