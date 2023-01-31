import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardType, GetCardOfPackResponseType} from "../../../common/types/types";
import {TypedThunk} from "../../../app/store";
import {cardListApi} from "./cards-api";
import {handleServerAppError} from "../../../common/utils/handling-response-error/handleServerAppError";

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
    sort: string,
    search: string,
    successStatusForSnackBar: string,
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
    packUserId: "",
    sort: '',
    search: '',
    successStatusForSnackBar: ''
}

const slice = createSlice({
    name: "cards-list",
    initialState,
    reducers: {
        setCardsState(state, action: PayloadAction<{ response: GetCardOfPackResponseType }>) {
            state.packUserId = action.payload.response.packUserId
            state.cards = action.payload.response.cards
            state.cardsTotalCount = action.payload.response.cardsTotalCount
            state.pageCount = action.payload.response.pageCount

        },


        setLoading(state, action: PayloadAction<{ isLoading: boolean }>) {
            state.isLoading = action.payload.isLoading
        },

        setPageCard(state, action: PayloadAction<{ page: number }>) {
            state.page = action.payload.page
        },
        setPageCountCard(state, action: PayloadAction<{ count: number }>) {
            state.pageCount = action.payload.count
        },
        setSortCard(state, action: PayloadAction<{ sort: string }>) {
            state.sort = action.payload.sort

        },
        setSearchCard(state, action: PayloadAction<{ value: string }>) {
            state.search = action.payload.value
        },
        setCardsError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setSuccessStatusForSnackBar(state, action: PayloadAction<{ success: string }>) {
            state.successStatusForSnackBar = action.payload.success
        }
    },
});

export const cardsList = slice.reducer
export const {
    setLoading,
    setCardsState,
    setPageCard,
    setPageCountCard,
    setSortCard,
    setSearchCard,
    setCardsError,
    setSuccessStatusForSnackBar
} = slice.actions

export const setCards = (id: string | undefined): TypedThunk => async (dispatch, getState) => {
    const {page, pageCount, sort, search} = getState().cardList
    dispatch(setLoading({isLoading: true}))
    try {
        let response = await cardListApi.getCardsOfPack(id, page, pageCount, sort, search)
        dispatch(setCardsState({response: response.data}))
    } catch (error) {
        handleServerAppError(error, dispatch, setCardsError)
    } finally {
        dispatch(setLoading({isLoading: false}))
    }
}

export const addNewCard = (id: string | undefined, question: string, answer: string, answerImg: string, questionImg: string): TypedThunk => async (dispatch) => {
    dispatch(setLoading({isLoading: true}))
    try {
        await cardListApi.createCard(id, question, answer, answerImg, questionImg)
        dispatch(setCards(id))
        dispatch(setSuccessStatusForSnackBar({success: 'New card successfully added'}))
    } catch (error) {
        handleServerAppError(error, dispatch, setCardsError)
    } finally {
    }
}

export const updateNameCard = (cardId: string, packId: string, question: string, answer: string): TypedThunk => async (dispatch) => {
    dispatch(setLoading({isLoading: true}))
    try {
        await cardListApi.updateCardName(cardId, question, answer)
        dispatch(setCards(packId))
        dispatch(setSuccessStatusForSnackBar({success: 'Name was changed successfully'}))
    } catch (error) {
        handleServerAppError(error, dispatch, setCardsError)
    } finally {
    }
}

export const deleteCard = (cardId: string, packId: string): TypedThunk => async (dispatch) => {
    dispatch(setLoading({isLoading: true}))
    try {
        await cardListApi.deleteCard(cardId)
        dispatch(setCards(packId))
        dispatch(setSuccessStatusForSnackBar({success: 'Card was removed'}))
    } catch (error) {
        handleServerAppError(error, dispatch, setCardsError)
    } finally {
    }
}