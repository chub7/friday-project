import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TypedThunk} from "../../../app/store";
import {CardsPackType, GetPacksCardsResponseType} from "../../../types/types";
import {handleServerAppError} from "../../../utils/AxiosError/handleServerAppError";
import {packListApi} from "./pack-list-api";


const initialState: InitialStateType = {
    isLoading: false,
    isSuccess: false,
    error: ``,
    cards: [] as CardsPackType[],
    cardPacksTotalCount: 0,   // количество колод
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0, // выбранная страница
    pageCount: 0,
}

type InitialStateType = {
    isLoading: boolean,
    isSuccess: boolean,
    error: string | null,
    cards: CardsPackType[],
    cardPacksTotalCount: number,   // количество колод
    maxCardsCount: number,
    minCardsCount: number,
    page: number, // выбранная страница
    pageCount: number,
}

const slice = createSlice({
    name: "pack-list",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<{ isLoading: boolean }>) {
            state.isLoading = action.payload.isLoading
        },
        setError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setCardPacks(state, action: PayloadAction<{ response: GetPacksCardsResponseType }>) {
            state.cards = action.payload.response.cardPacks
            state.cardPacksTotalCount = action.payload.response.cardPacksTotalCount
            state.maxCardsCount = action.payload.response.maxCardsCount
            state.minCardsCount = action.payload.response.minCardsCount
            state.page = action.payload.response.page
            state.pageCount = action.payload.response.pageCount
        }

    },
});
export const packListSlice = slice.reducer
export const {setLoading, setError, setCardPacks} = slice.actions

export const setPacksCards = (): TypedThunk => async (dispatch) => {
    dispatch(setLoading({isLoading: true}))
    try {
        let response = await packListApi.getPacksCards()
        dispatch(setCardPacks({response: response.data}))
    } catch (error) {
        handleServerAppError(error, dispatch, setError)
    } finally {
        dispatch(setLoading({isLoading: false}))
    }


}