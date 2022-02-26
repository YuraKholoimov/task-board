import React, {ChangeEvent, useState} from "react";

type EditSpanPropsType = {
    title: string
    callback?: (title:string) => void
}

export function EditSpan(props: EditSpanPropsType) {
    const [state, setState] = useState(true)
    const [value, setValue] = useState(props.title)

    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const setTitle = () => {
        props.callback && props.callback(value)
        setState(true)
    }

    return (
        <>
            {state
                ? <span onDoubleClick={() => setState(false)}>{props.title}</span>
                : <input
                    onChange={changeValue}
                    value={value}
                    onBlur={setTitle}
                    autoFocus
                />}
        </>
    )
}