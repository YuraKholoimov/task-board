import {TaskType} from "../state/tasks-reduser";
import React, {useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import pink from "@mui/material/colors/pink";
import {EditSpan} from "./EditSpan";
import {Delete} from "@mui/icons-material";

export type TaskPropsType = {
    removeTask: (idTask: string, idTodoList: string) => void
    onChangeTaskStatus: (id: string, isDone: boolean, objID: string) => void
    changeTaskTitle: (title: string, taskId: string, todolistId: string) => void
    task: TaskType
    todoListId: string
}

export const Task = React.memo((props:TaskPropsType ) => {
    console.log("task")

    const onClickRemoveHandler = useCallback(() => props.removeTask(props.task.id, props.todoListId),
        [props.removeTask, props.task.id, props.todoListId])

    const onChangStatusHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChangeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListId)
    }, [props.onChangeTaskStatus, props.task.id,  props.todoListId])

    const onChangeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(title, props.task.id, props.todoListId)
    }, [props.changeTaskTitle, props.task.id, props.todoListId])


    return (
        <div className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                sx={{
                    color: pink[800],
                    '&.Mui-checked': {
                        color: pink[600],
                    }
                }}
                checked={props.task.isDone}
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