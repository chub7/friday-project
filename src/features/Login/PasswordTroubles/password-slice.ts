import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {passwordApi} from "./password-api";
import {handleServerAppError} from "../../../utils/AxiosError/handleServerAppError";
import {TypedThunk} from "../../../app/store";


type TypeInitialState = {
    email: string;
    error: string|null
    isSuccess:boolean,
    isLoading:boolean,
};
const initialState: TypeInitialState = {
    email: '',
    error:null,
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
        setError(state, action: PayloadAction<{ error: string|null }>) {
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


export const getInstructionThunk = (email: string) : TypedThunk  =>
    async (dispatch) => {
    dispatch(setIsLoading({status:true}))
    try {
        await passwordApi.getInstruction(email);
        dispatch(setEmail({ email: email }));
    } catch (error) {
        handleServerAppError(error, dispatch, setError)

      /*  if (axios.isAxiosError(error)) {
            const finalError =
                (error as AxiosError<{ error: string }>).response?.data.error ||
                error.message;
            dispatch(setError({ error: finalError }))
        }*/
    } finally {
        dispatch(setIsLoading({status:false}))
    }
};
 export const setNewPasswordThunk = (password:string, token: string | undefined) : TypedThunk  =>
    async(dispatch)=>{
        dispatch(setIsLoading({status: true}))
        try {
            await passwordApi.setNewPassword(password, token);
            dispatch(setSuccess({status: true}))
        } catch (error) {
            handleServerAppError(error, dispatch, setError)
        } finally {
            dispatch(setIsLoading({status: false}))
        }
    }
 