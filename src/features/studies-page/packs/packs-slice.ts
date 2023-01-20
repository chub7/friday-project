import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedThunk } from "../../../app/store";
import { CardsPackType, GetPacksCardsResponseType } from "../../../common/types/types";
import { handleServerAppError } from "../../../common/utils/handling-response-error/handleServerAppError";
import { packsApi } from "./packs-api";


const initialState: InitialStateType = {
    isLoading: false,
    isSuccess: false,
    error: ``,
    cards: [] as CardsPackType[],
    cardPacksTotalCount: 0,   // количество колод
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0, // выбранная страница
    pageCount: 10,
    owner: ``,
    search: '',
    isMyPack: '',
    sort: '',
    cardsCount: [],
    successStatusForSnackBar: ''
}

export type InitialStateType = {
    isLoading: boolean,
    isSuccess: boolean,
    error: string | null,
    cards: CardsPackType[],
    cardPacksTotalCount: number,   // количество колод
    maxCardsCount: number,
    minCardsCount: number,
    page: number, // выбранная страница
    owner: string,
    pageCount: number,
    search: string,
    isMyPack: string,
    sort: string,
    cardsCount: number[]
    successStatusForSnackBar: string
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
        },
        setCurrentOwnerOfPack(state, action: PayloadAction<string>) {
            state.owner = action.payload
        },
        setSearchPack(state, action: PayloadAction<{ value: string }>) {
            state.search = action.payload.value
        },
        setPagePack(state, action: PayloadAction<{ page: number }>) {
            state.page = action.payload.page
        },
        setPageCountPack(state, action: PayloadAction<{ count: number }>) {
            state.pageCount = action.payload.count
        },
        setIsMyPack(state, action: PayloadAction<{ myPack: string }>) {
            state.isMyPack = action.payload.myPack
        },
        setCountCard(state, action: PayloadAction<{ value: number[] }>) {
            state.cardsCount = action.payload.value
        },
        setSortPack(state, action: PayloadAction<{ sort: string }>) {
            state.sort = action.payload.sort
        },
        setSuccessStatusForSnackBar(state, action: PayloadAction<{ success: string }>) {
            state.successStatusForSnackBar = action.payload.success
        }
    },
});
export const packListSlice = slice.reducer
export const {
    setLoading,
    setError,
    setCardPacks,
    setCurrentOwnerOfPack,
    setSearchPack, setPagePack,
    setPageCountPack, setIsMyPack,
    setCountCard,
    setSortPack,
    setSuccessStatusForSnackBar
} = slice.actions


export const setPacksCards = (): TypedThunk => async (dispatch, getState) => {
    const {search, page, pageCount, isMyPack, cardsCount, sort} = getState().packList
    const packList = {
        page: page,
        pageCount: pageCount,
        packName: search,
        user_id: isMyPack,
        min: cardsCount[0],
        max: cardsCount[1],
        sortPacks: sort
    }
    dispatch(setLoading({isLoading: true}))
    try {
        let response = await packsApi.getPacksCards(packList)
        dispatch(setCardPacks({response: response.data}))

    } catch (error) {
        handleServerAppError(error, dispatch, setError)
    } finally {
        dispatch(setLoading({isLoading: false}))
    }
}


export const addNewPacksCards = (): TypedThunk => async (dispatch) => {
    dispatch(setLoading({ isLoading: true }))
    try {
        await packsApi.createPack()
        dispatch(setPacksCards())
        dispatch(setSuccessStatusForSnackBar({success:'New pack successfully added'}))
    } catch (error) {
        handleServerAppError(error, dispatch, setError)
    } finally {
    }
}

export const deletePacksCards = (id: string | undefined): TypedThunk => async (dispatch) => {
    dispatch(setLoading({ isLoading: true }))
    try {
        await packsApi.deletePack(id)
        dispatch(setPacksCards())
        dispatch(setSuccessStatusForSnackBar({success:'Pack was removed'}))
    } catch (error) {
        handleServerAppError(error, dispatch, setError)
    } finally {
    }
}

export const changeNamePacksCards = (id: string | undefined): TypedThunk => async (dispatch) => {
    dispatch(setLoading({ isLoading: true }))
    try {
        await packsApi.changePackName(id)
        dispatch(setPacksCards())
        dispatch(setSuccessStatusForSnackBar({success:'Name was changed successfully'}))
    } catch (error) {
        handleServerAppError(error, dispatch, setError)
    } finally {
    }
}