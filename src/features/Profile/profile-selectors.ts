import {AppRootStateType} from "../../app/store";
import {ProfileType} from "./profile-slice";

export const getProfile = (state: AppRootStateType): ProfileType | null => state.profile.profile