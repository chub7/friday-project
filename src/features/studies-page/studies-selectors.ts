import {AppRootStateType} from "../../app/store";
import {createDraftSafeSelector} from "@reduxjs/toolkit";


const selectSelf = (state: AppRootStateType) => state

export const packsCardsSelector = createDraftSafeSelector(selectSelf, (state) => state.packList.cards)
export const packListIsLoadingSelector = (state : AppRootStateType) => state.packList.isLoading
export const ownerOfPackSelector = (state : AppRootStateType) => state.packList.owner
export const searchPackSelector=(state:AppRootStateType)=>state.packList.search
export const pagePackSelector=(state:AppRootStateType)=>state.packList.page
export const totalCountPackSelector=(state:AppRootStateType)=>state.packList.cardPacksTotalCount
export  const pageCountSelector=(state:AppRootStateType)=>state.packList.pageCount
export  const isMyPackSelector=(state:AppRootStateType)=>state.packList.isMyPack
export  const minCountCards=(state:AppRootStateType)=>state.packList.minCardsCount
export  const maxCountCards=(state:AppRootStateType)=>state.packList.maxCardsCount


export const cardsSelector = createDraftSafeSelector(selectSelf, (state) => state.cardList.cards)
export const cardsListIsLoadingSelector = (state : AppRootStateType) => state.cardList.isLoading