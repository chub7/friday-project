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
    pageCount: 10,
    owner: ``,
    search: '',
    isMyPack: '',
    sort:'',
    cardsCount:[]
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
    owner: string,
    pageCount: number,
    search: string,
    isMyPack: string,
    sort:string,
    cardsCount:number[]
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
        setCountCard(state, action: PayloadAction<{ value:number[]}>) {
            state.cardsCount=action.payload.value
        },
        setSortPack(state, action: PayloadAction<{sort:string }>) {
            state.sort = action.payload.sort

        },


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
    setSortPack
} = slice.actions

export const setPacksCards = (): TypedThunk => async (dispatch, getState) => {

    const {search, page, pageCount, isMyPack,cardsCount,sort} = getState().packList

    dispatch(setLoading({isLoading: true}))
    try {
        let response = await packListApi.getPacksCards(search, page, pageCount, isMyPack,cardsCount,sort)
        dispatch(setCardPacks({response: response.data}))


    } catch (error) {
        handleServerAppError(error, dispatch, setError)
    } finally {
        dispatch(setLoading({isLoading: false}))
    }


}

export const addNewPacksCards = (): TypedThunk => async (dispatch) => {
    dispatch(setLoading({isLoading: true}))
    try {
        let response = await packListApi.createPack()
       dispatch(setPacksCards())

    } catch (error) {
        handleServerAppError(error, dispatch, setError)
    } finally {
        dispatch(setLoading({isLoading: false}))
    }


}

export const deletePacksCards = (id:string): TypedThunk => async (dispatch) => {
    dispatch(setLoading({isLoading: true}))
    try {
       await packListApi.deletePack(id)
       dispatch(setPacksCards())

    } catch (error) {
        handleServerAppError(error, dispatch, setError)
    } finally {
        dispatch(setLoading({isLoading: false}))
    }


}

export const changeNamePacksCards = (id:string): TypedThunk => async (dispatch) => {
    dispatch(setLoading({isLoading: true}))
    try {
       await packListApi.changePackName(id)
       dispatch(setPacksCards())

    } catch (error) {
        handleServerAppError(error, dispatch, setError)
    } finally {
        dispatch(setLoading({isLoading: false}))
    }


}