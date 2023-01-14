import {AppRootStateType} from "../../app/store";
import {createDraftSafeSelector} from "@reduxjs/toolkit";


const selectSelf = (state: AppRootStateType) => state

export const packsCardsSelector = createDraftSafeSelector(selectSelf, (state) => state.packList.cards)
export const cardsSelector = createDraftSafeSelector(selectSelf, (state) => state.cardList.cards)