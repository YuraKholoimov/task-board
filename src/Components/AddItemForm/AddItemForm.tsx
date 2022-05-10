import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export type AddItemFormPropsType = {
    callback: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    // console.log("AddItemForm is called")
    const [error, setError] = useState<string | null>(null)
    const [inputValue, setInputValue] = useState<string>("")
    const [btnAddTaskStatus, setBtnAddTaskStatus] = useState(false)

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value) setError('Error')
        else setBtnAddTaskStatus(false)
        setInputValue(e.currentTarget.value)
    }

    const onInputKeyPressChange = (e: KeyboardEvent) => {
        setError(null)
        if (e.charCode === 13) onAddItem()
    }

    const onAddItem = () => {
        if (inputValue.trim() !== "") props.callback(inputValue)
        else {
            setBtnAddTaskStatus(true)
            setError('Error')
        }
        setInputValue('')
    }

    return (
        <div>
            <TextField
                disabled={props.disabled}
                error={!!error}
                helperText={error}
                color={"primary"}
                value={inputValue}
                label={"Type the task"}
                onChange={onInputChange}
                onKeyPress={onInputKeyPressChange}
            />
            <IconButton
                onClick={onAddItem}
                disabled={btnAddTaskStatus || props.disabled}
                color={'primary'}
            >
                <AddIcon/>
            </IconButton>
        </div>
    )
})