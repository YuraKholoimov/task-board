import React, {useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import pink from "@mui/material/colors/pink";
import {EditSpan} from "./EditSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatus, TaskType} from "../API/todolists-api";

export type TaskPropsType = {
    removeTask: (idTask: string, idTodoList: string) => void
    onChangeTaskStatus: (id: string, status: TaskStatus, objID: string) => void
    changeTaskTitle: (title: string, taskId: string, todolistId: string) => void
    task: TaskType
    todoListId: string
}

export const Task = React.memo((props:TaskPropsType ) => {
    console.log("task")

    const onClickRemoveHandler = useCallback(() => props.removeTask(props.task.id, props.todoListId),
        [props.removeTask, props.task.id, props.todoListId])

    const onChangStatusHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        let checked = e.currentTarget.checked
        props.onChangeTaskStatus(props.task.id, !checked ? TaskStatus.Completed : TaskStatus.New, props.todoListId)
    }, [props.onChangeTaskStatus, props.task.id,  props.todoListId])

    const onChangeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(title, props.task.id, props.todoListId)
    }, [props.changeTaskTitle, props.task.id, props.todoListId])


    return (
        <div className={props.task.status === TaskStatus.Completed ? "is-done" : ""}>
            <Checkbox
                sx={{
                    color: pink[800],
                    '&.Mui-checked': {
                        color: pink[600],
                    }
                }}
                checked={!props.task.status}
                onChange={onChangStatusHandler}
            />
            <EditSpan title={props.task.title} callback={onChangeTaskTitle} />
            <IconButton
                aria-label="delete"
                onClick={onClickRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})