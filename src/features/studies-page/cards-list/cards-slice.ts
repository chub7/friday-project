import {createSlice} from "@reduxjs/toolkit";
import {CardsPackType} from "../../../types/types";


const initialState = {
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

const slice = createSlice({
    name: "cards-list",
    initialState,
    reducers: {},
});