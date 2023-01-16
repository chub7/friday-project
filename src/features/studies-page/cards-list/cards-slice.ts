import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardType} from "../../../types/types";
import {TypedThunk} from "../../../app/store";
import {cardListApi} from "./cards-list-api";
import { handleServerAppError } from "../../../utils/AxiosError/handleServerAppError";

type InitialStateType = {
    isLoading: boolean,
    isSuccess: boolean,
    error: string | null,
    cards: CardType[],
    cardsTotalCount: number,
    maxGrade: number,
    minGrade: number,
    page: number,
    pageCount: number,
    packUserId: string
}
const initialState: InitialStateType = {
    isLoading: false,
    isSuccess: false,
    error: null,
    cards: [] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    pageCount: 0,
    packUserId: ""
}

const slice = createSlice({
    name: "cards-list",
    initialState,
    reducers: {
        setCardsState(state, action: PayloadAction<{ response: CardType[] , packUserId: string }>) {
            state.cards = action.payload.response
            state.packUserId = action.payload.packUserId
        },
        setLoading(state, action: PayloadAction<{ isLoading: boolean }>) {
            state.isLoading = action.payload.isLoading
        },
        setCardsError(state, action:PayloadAction<{ error: string | null }>){
            state.error = action.payload.error
        }
    },
});

export const cardsList = slice.reducer
export const {setLoading, setCardsState, setCardsError} = slice.actions

export const setCards = (id:string|undefined): TypedThunk => async (dispatch) => {
    dispatch(setLoading({isLoading: true}))
    try {
        let response = await cardListApi.getCardsOfPack(id)
        dispatch(setCardsState({response: response.data.cards, packUserId: response.data.packUserId }))
    } catch (error) {
        handleServerAppError(error, dispatch, setCardsError)
    } finally {
        dispatch(setLoading({isLoading: false}))
    }
}

export const addNewCard = (id:string|undefined): TypedThunk => async (dispatch) => {
    dispatch(setLoading({isLoading: true}))
    try {
        let response = await cardListApi.createCard(id)
        dispatch(setCards(id))
    } catch (error) {
        handleServerAppError(error, dispatch, setCardsError)
    } finally {
        dispatch(setLoading({isLoading: false}))
    }
}

export const updateNameCard = (cardId:string, packId:string): TypedThunk => async (dispatch) => {
    dispatch(setLoading({isLoading: true}))
    try {
        await cardListApi.updateCardName(cardId)
        dispatch(setCards(packId))
    } catch (error) {
        handleServerAppError(error, dispatch, setCardsError)
    } finally {
        dispatch(setLoading({isLoading: false}))
    }
}

export const deleteCard = (cardId:string, packId:string): TypedThunk => async (dispatch) => {
    dispatch(setLoading({isLoading: true}))
    try {
        await cardListApi.deleteCard(cardId)
        dispatch(setCards(packId))
    } catch (error) {
        handleServerAppError(error, dispatch, setCardsError)
    } finally {
        dispatch(setLoading({isLoading: false}))
    }
}