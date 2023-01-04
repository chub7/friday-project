import {AppThunkDispatch} from "../../app/store";


const initialState: InitialStateType = {}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
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
export type ProfileActionsType = any
