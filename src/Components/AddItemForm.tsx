import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Grid, IconButton, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

type AddItemFormPropsType = {
    callback: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
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
                    disabled={btnAddTaskStatus}
                    color={'primary'}
                >
                    <AddIcon/>
                </IconButton>
        </div>
    )
}