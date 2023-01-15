import {AppRootStateType} from "../../app/store";
import {ProfileType} from "./profile-slice";

export const getProfileSelector = (state: AppRootStateType): ProfileType  => state.profile.profile