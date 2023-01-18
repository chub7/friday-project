import React, {FC} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppDispatch} from '../../app/store';
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

type ErrorSnackBarType = {
    error: string|null
    success?: string 
    changeError:  ActionCreatorWithPayload<{error: string | null}>
    changeSuccess?:  ActionCreatorWithPayload<{success: string}>
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const UniversalSnackbar: FC<ErrorSnackBarType> = ({error, changeError, success, changeSuccess}) => {

    const dispatch = useAppDispatch();
    const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(changeError({error:null}))
        if(changeSuccess)
        dispatch(changeSuccess({success:''}))
    };
    const color = error !== null && success == '' ? "error" : "success"
    return (
        <Snackbar open={error !== '' || success !== ''} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={color} sx={{width: '100%'}}>
                {error || success}
            </Alert>
        </Snackbar>
    );
}











