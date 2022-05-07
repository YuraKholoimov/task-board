import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";

export type EditSpanPropsType = {
    title: string
    callback?: (title:string) => void
}

export const EditSpan = React.memo((props: EditSpanPropsType) => {
    console.log("editSpan")
    const [show, setShow] = useState(true)
    const [title, setTitle] = useState(props.title)

    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}

    const setTitleHandler = () => {
        props.callback && props.callback(title)
        setShow(true)
    }

    const onInputKeyPressChange =(e: KeyboardEvent) => {
        if (e.charCode === 13) setTitleHandler()
    }

    return (
        <>
            {show
                ? <span onDoubleClick={() => setShow(false)}>{props.title}</span>
                : <TextField
                    variant={"standard"}
                    onChange={changeValue}
                    value={title}
                    onBlur={setTitleHandler}
                    autoFocus
                    onKeyPress={onInputKeyPressChange}
                />}
        </>
    )
})