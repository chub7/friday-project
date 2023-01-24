import { CardType, GetCardOfPackResponseType } from "../../../common/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedThunk } from "../../../app/store";
import { cardListApi } from "../cards/cards-api";
import { handleServerAppError } from "../../../common/utils/handling-response-error/handleServerAppError";
import { cardForLearnApi } from "./learn-page-api";


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
    packName: string
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
    successStatusForSnackBar: '',
    packName: ''
}

const slice = createSlice({
    name: "learn-page",
    initialState,
    reducers: {
        setCardsState(state, action: PayloadAction<{ response: GetCardOfPackResponseType }>) {
            state.packUserId = action.payload.response.packUserId
            state.cards = action.payload.response.cards
            state.cardsTotalCount = action.payload.response.cardsTotalCount
            state.pageCount = action.payload.response.pageCount

        },
        setCardsError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setPackName(state, action: PayloadAction<{ packName: string }>) {
            state.packName = action.payload.packName
        },
        setLoading(state, action: PayloadAction<{ isLoading: boolean }>) {
            state.isLoading = action.payload.isLoading
        },
        setNewGrade(state, action: PayloadAction<{ grade: number, id:string }>) {
           let card = state.cards.find(card=>card._id === action.payload.id)
            if(card){
                card.grade = action.payload.grade
                card.shots = card.shots + 1
            } 
        },
        resetAllCardsInPack(state){
        state.cards.forEach(c=>c.grade = 1)
        }
    }
});

export const learnPage = slice.reducer
export const { setCardsState, setCardsError, setPackName,setLoading,setNewGrade, resetAllCardsInPack} = slice.actions

export const setCards = (id: string | undefined): TypedThunk => async (dispatch) => {
    dispatch(setLoading({isLoading: true}))
    try {
        let response = await cardForLearnApi.getCardsOfPack(id)
        dispatch(setCardsState({ response: response.data }))
        dispatch(setPackName({ packName: response.data.packName}))

    } catch (error) {
        handleServerAppError(error, dispatch, setCardsError)
    } finally {
        dispatch(setLoading({isLoading: false}))
    }
}

export const setNewCardGrade = (grade: number, id: string): TypedThunk => async (dispatch) => {
    try {
        let response = await cardForLearnApi.setCardGrade(grade, id)
        dispatch(setNewGrade({ grade, id }))
        console.log(response)
    } catch (error) {
        handleServerAppError(error, dispatch, setCardsError)
    }
}

export async function asyncGeneratorWay(cards: CardType[], dispatch: any) {
    dispatch(setLoading({ isLoading: true }))
    async function* generateSequence(): any {

        for (let i = 0; i < cards.length; i++) {
            let response = await cardForLearnApi.setCardGrade(1, cards[i]._id);
            yield response.status
        }
    }

    let generator = generateSequence();
    let result;
    while (!result?.done) {

        result = await generator.next();
        console.log(result, result?.done);
    }

    dispatch(resetAllCardsInPack())
    dispatch(setLoading({ isLoading: false }))
}