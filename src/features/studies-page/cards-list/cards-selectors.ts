import {createDraftSafeSelector} from "@reduxjs/toolkit";
import {AppRootStateType} from "../../../app/store";


const selectSelf = (state: AppRootStateType) => state


export const cardsSelector = createDraftSafeSelector(selectSelf, (state) => state.cardList.cards)
export const cardsListIsLoadingSelector = createDraftSafeSelector(selectSelf, (state) => state.cardList.isLoading)
export const pageCardSelector = createDraftSafeSelector(selectSelf, (state) => state.cardList.page)
export const totalCountCardsSelector = createDraftSafeSelector(selectSelf, (state) => state.cardList.cardsTotalCount)
export const pageCountCardsSelector = createDraftSafeSelector(selectSelf, (state) => state.cardList.pageCount)
export const sortCardsSelector=createDraftSafeSelector(selectSelf, (state) => state.cardList.sort)
export const searchCardsSelector=createDraftSafeSelector(selectSelf, (state) => state.cardList.search)
export const packUserIdSelector = (state : AppRootStateType) => state.cardList.packUserId
export const cardErrorSelector = (state : AppRootStateType) => state.cardList.error

