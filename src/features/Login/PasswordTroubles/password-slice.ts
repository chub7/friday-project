import { AnyAction, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { passwordApi } from "./passwordApi";

type TypeInitialState = {
    email: string;
    error: string;
    isSuccess:boolean,
    isLoading:boolean,
};
const initialState: TypeInitialState = {
    email: '',
    error: '',
    isSuccess:false,
    isLoading:false

};
const slice = createSlice({
    name: "passwordPage",
    initialState: initialState,
    reducers: {
        setEmail(state, action: PayloadAction<{ email: string }>) {
            state.email = action.payload.email
        },
        setError(state, action: PayloadAction<{ error: string }>) {
            state.error = action.payload.error
        },
        setSuccess(state, action: PayloadAction<{ status: boolean }>) {
            state.isSuccess = action.payload.status
        },
        setIsLoading(state, action: PayloadAction<{ status: boolean }>){
            state.isLoading = action.payload.status
        }
    }
});

  export const passwordSlice = slice.reducer;
  export const { setEmail,setError, setSuccess, setIsLoading} = slice.actions;


export const getInstructionThunk = (email: string) => async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoading({status:true}))
    try {
        await passwordApi.getInstruction(email);
        dispatch(setEmail({ email: email }));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const finalError =
                (error as AxiosError<{ error: string }>).response?.data.error ||
                error.message;
            dispatch(setError({ error: finalError }))
        }
    } finally {
        dispatch(setIsLoading({status:false}))
    }
};
 export const setNewPasswordThunk = (password:string, token: string | undefined) => async(dispatch: Dispatch<AnyAction>)=>{
    dispatch(setIsLoading({status:true}))
    try{
        await passwordApi.setNewPassword(password, token);
        dispatch(setSuccess({ status: true }))
    }catch(error){
        if (axios.isAxiosError(error)) {
            const finalError =
                (error as AxiosError<{ error: string }>).response?.data.error ||
                error.message;
            dispatch(setError({ error: finalError }))
        }
    }finally{
        dispatch(setIsLoading({status:false}))
    }
 } 
 