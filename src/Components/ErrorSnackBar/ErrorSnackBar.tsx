import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {AppErrorType, setAppErrorAC} from "../../App/App-reducer";
import {useDispatch} from "react-redux";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type ErrorSnackBarPropsType = {
    error: AppErrorType
}

export function ErrorSnackBar(props: ErrorSnackBarPropsType) {
    const [open, setOpen] = React.useState(!!props.error);
    const dispatch = useDispatch()
    console.log(props.error)
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        dispatch(setAppErrorAC(null))
    };


    return (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {props.error}
                </Alert>
            </Snackbar>
    );
}
