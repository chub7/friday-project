import {AppRootStateType} from "../../app/store";
import {createDraftSafeSelector} from "@reduxjs/toolkit";


const selectSelf = (state: AppRootStateType) => state

export const packsCardsSelector = createDraftSafeSelector(selectSelf, (state) => state.packList.cards)
export const cardsSelector = createDraftSafeSelector(selectSelf, (state) => state.cardList.cards)
export const packUserIdSelector = (state : AppRootStateType) => state.cardList.packUserId
export const packErrorSelector = (state : AppRootStateType) => state.packList.error
export const cardErrorSelector = (state : AppRootStateType) => state.cardList.error
export const packListIsLoadingSelector = (state : AppRootStateType) => state.packList.isLoading
export const cardsListIsLoadingSelector = (state : AppRootStateType) => state.cardList.isLoading
export const ownerOfPackSelector = (state : AppRootStateType) => state.packList.owner