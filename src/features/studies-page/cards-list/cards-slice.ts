import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardType} from "../../../types/types";
import {TypedThunk} from "../../../app/store";
import {cardListApi} from "./cards-list-api";

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
        setCardsState(state, action: PayloadAction<{ response: CardType[] }>) {
            state.cards = action.payload.response
        },
        setLoading(state, action: PayloadAction<{ isLoading: boolean }>) {
            state.isLoading = action.payload.isLoading
        }
    },
});

export const cardsList = slice.reducer
export const {setLoading, setCardsState} = slice.actions

export const setCards = (id:string|undefined): TypedThunk => async (dispatch) => {
    dispatch(setLoading({isLoading: true}))
    try {
        let response = await cardListApi.getCardsOfPack(id)
        dispatch(setCardsState({response: response.data.cards}))
    } catch (error) {

    } finally {
        dispatch(setLoading({isLoading: false}))
    }
}
