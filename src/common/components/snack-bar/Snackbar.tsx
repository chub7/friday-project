import React, {FC, useCallback, useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppDispatch} from '../../../app/store';
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

type ErrorSnackBarType = {
    error?: string | null
    success?: string
    changeError?: ActionCreatorWithPayload<{ error: string | null }>
    changeSuccess?: ActionCreatorWithPayload<{ success: string }>
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const UniversalSnackbar: FC<ErrorSnackBarType> = ({error, changeError, success, changeSuccess}) => {

    const dispatch = useAppDispatch();
    const handleClose = useCallback((event?: React.SyntheticEvent<any> | Event, reason?: string) => {
        changeError && dispatch(changeError({error: null}))
        changeSuccess && dispatch(changeSuccess({success: ''}))
    },[dispatch, changeError, changeSuccess]);
    useEffect(() => {
        return () => handleClose()
    }, [handleClose])

    const color = error !== null && (success === '' || success === undefined) ? "error" : "success"
    return (
        <Snackbar open={error !== '' || success !== ''} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={color} sx={{width: '100%'}}>
                {error || success}
            </Alert>
        </Snackbar>
    );
}











