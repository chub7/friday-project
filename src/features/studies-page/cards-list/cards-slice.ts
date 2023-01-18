import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardType, GetCardOfPackResponseType} from "../../../types/types";
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
    sort:string,
    search:string
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
    sort:'',
    search:''
}

const slice = createSlice({
    name: "cards-list",
    initialState,
    reducers: {
        setCardsState(state, action: PayloadAction<{ response: GetCardOfPackResponseType }>) {
            state.cards=action.payload.response.cards
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
        setSortCard(state, action: PayloadAction<{sort:string }>) {
            state.sort = action.payload.sort

        },
        setSearchCard(state, action: PayloadAction<{ value: string }>) {
            state.search = action.payload.value
        },

    },
});

export const cardsList = slice.reducer
export const {setLoading, setCardsState, setPageCard,setPageCountCard,setSortCard,setSearchCard} = slice.actions

export const setCards = (id: string | undefined): TypedThunk => async (dispatch,getState) => {

    const { page,pageCount,sort,search} = getState().cardList
    dispatch(setLoading({isLoading: true}))
    try {
        let response = await cardListApi.getCardsOfPack(id,page,pageCount,sort,search)
        dispatch(setCardsState({response: response.data}))
    } catch (error) {

    } finally {
        dispatch(setLoading({isLoading: false}))
    }
}
