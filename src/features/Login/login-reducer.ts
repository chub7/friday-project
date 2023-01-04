import {AppThunkDispatch} from "../../app/store";


const initialState: InitialStateType = {}

export const loginReducer = (state: InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return {...state}
    }
}

export const thunk = () => async (dispatch: AppThunkDispatch) => {

    try {

    } catch (e) {


    } finally {

    }
}

type InitialStateType = {}
export type LoginActionsType = any
