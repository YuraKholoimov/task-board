import React, {useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import pink from "@mui/material/colors/pink";
import {EditSpan} from "../../../Components/EditSpan/EditSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatus, TaskType} from "../../../API/todolists-api";
import {RequestStatusType} from "../../../App/App-reducer";

export type TaskPropsType = {
    removeTask: (idTask: string, idTodoList: string) => void
    onChangeTaskStatus: (id: string, status: TaskStatus, objID: string) => void
    changeTaskTitle: (title: string, taskId: string, todolistId: string) => void
    task: TaskType
    todoListId: string
    entityStatus: RequestStatusType
}

export const Task = React.memo((props: TaskPropsType) => {
    const onClickRemoveHandler = useCallback(() => props.removeTask(props.task.id, props.todoListId),
        [props.removeTask, props.task.id, props.todoListId])

    const onChangStatusHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        let checked = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        props.onChangeTaskStatus(props.task.id, checked, props.todoListId)
    }, [props.onChangeTaskStatus, props.task.id, props.todoListId])

    const onChangeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(title, props.task.id, props.todoListId)
    }, [props.changeTaskTitle, props.task.id, props.todoListId])

    return (
        <div className={props.task.status === TaskStatus.Completed ? 'isDone' : ""}>
            <Checkbox
                disabled={props.entityStatus === "loading"}
                sx={{
                    color: pink[800],
                    '&.Mui-checked': {
                        color: pink[600],
                    }
                }}
                checked={props.task.status !== 0}
                onChange={onChangStatusHandler}
            />
            <EditSpan title={props.task.title} callback={onChangeTaskTitle} entityStatus={props.entityStatus}/>
            <IconButton
                disabled={props.entityStatus === "loading"}
                aria-label="delete"
                onClick={onClickRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})