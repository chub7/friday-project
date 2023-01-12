import React, {FC} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppDispatch} from '../../app/store';
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

type ErrorSnackBarType = {
    error: string|null
    changeError:  ActionCreatorWithPayload<{error: string | null}>
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const ErrorSnackbar: FC<ErrorSnackBarType> = ({error, changeError}) => {

    const dispatch = useAppDispatch();
    const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(changeError({error:null}))
    };
    return (
        <Snackbar open={error !== ''} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}
