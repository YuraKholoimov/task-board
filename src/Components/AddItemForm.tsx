import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    callback: (title:string)=>void
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
            <input
                className={error ? "error" : ""}
                value={inputValue}
                onChange={onInputChange}
                onKeyPress={onInputKeyPressChange}
            />
            {error && <span className={"error-message"}>{error}</span>}
            <button
                onClick={onAddItem}
                disabled={btnAddTaskStatus}>+
            </button>
        </div>
    )
}