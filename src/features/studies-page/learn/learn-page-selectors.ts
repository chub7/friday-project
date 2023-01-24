import { AppRootStateType } from "../../../app/store";
import { CardType } from "../../../common/types/types";


export const cardsForLearnSelector = (state: AppRootStateType):CardType[] => state.learnPage.cards;
export const packNameSelector = (state: AppRootStateType) => state.learnPage.packName;
export const isLoadingSelector = (state: AppRootStateType) => state.learnPage.isLoading;