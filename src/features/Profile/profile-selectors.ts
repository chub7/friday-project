import {AppRootStateType} from "../../app/store";
import {ProfileType} from "./profile-slice";

export const getProfileSelector = (state: AppRootStateType): ProfileType  => state.profile.profile
export const getMyIdSelector = (state: AppRootStateType): string  => state.profile.profile._id