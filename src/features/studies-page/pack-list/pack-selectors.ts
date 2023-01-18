import {AppRootStateType} from "../../../app/store";
import {createDraftSafeSelector} from "@reduxjs/toolkit";

const selectSelf = (state: AppRootStateType) => state

export const packsCardsSelector = createDraftSafeSelector(selectSelf, (state) => state.packList.cards)
export const packListIsLoadingSelector = createDraftSafeSelector(selectSelf, (state) => state.packList.isLoading)
export const searchPackSelector = createDraftSafeSelector(selectSelf, (state) => state.packList.search)
export const pagePackSelector = createDraftSafeSelector(selectSelf, (state) => state.packList.page)
export const totalCountPackSelector = createDraftSafeSelector(selectSelf, (state) => state.packList.cardPacksTotalCount)
export const pageCountPackSelector = createDraftSafeSelector(selectSelf, (state) => state.packList.pageCount)
export const isMyPackSelector = createDraftSafeSelector(selectSelf, (state) => state.packList.isMyPack)
export const minCountCards = createDraftSafeSelector(selectSelf, (state) => state.packList.minCardsCount)
export const maxCountCards = createDraftSafeSelector(selectSelf, (state) => state.packList.maxCardsCount)
export const sortPacksSelector=createDraftSafeSelector(selectSelf, (state) => state.packList.sort)
export const cardsCountSelector=createDraftSafeSelector(selectSelf, (state) => state.packList.cardsCount)
export const ownerOfPackSelector = (state : AppRootStateType) => state.packList.owner
export const packErrorSelector = (state : AppRootStateType) => state.packList.error
