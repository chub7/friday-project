import {
  AnyAction,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { profileApi } from "./profileApi";
import { setIsAuth } from "../../app/app-slice";

// export type ProfileDataType = {
//     _id: string
//     email: string
//     name: string
//     avatar?: string
//     publicCardPacksCount: number
//     created: Date
//     updated: Date
//     isAdmin: boolean
//     verified: boolean
//     rememberMe: boolean
// }
// export type initialStateType = {
//     isLoggedIn: boolean
//     profileData: ProfileDataType
// }
export type ProfileType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error?: string;
};
type TypeInitialState = {
  profile: ProfileType;
};
const initialState: TypeInitialState = {
  profile: {} as ProfileType,
};
const slice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setNewName(state, action: PayloadAction<{ name: string }>) {
      if (state.profile) {
        state.profile.name = action.payload.name;
      }
    },
    setProfile: (state, action: PayloadAction<{ profile: ProfileType }>) => {
      state.profile = action.payload.profile;
    },
  },
});

export const profileSlice = slice.reducer;
export const { setProfile } = slice.actions;
export const { setNewName } = slice.actions;

// export const authMeThunk = () => async (dispatch: Dispatch<AnyAction>) => {
//     try {
//         let res = await profileApi.me()
//         dispatch(setIsLoggedIn({status:true}))
//         dispatch(setProfileData({data:res.data}))
//     } catch (e) {
//         console.log(e)
//     } finally {

//     }
// }

// export const registarationThunk = () => async (dispatch: Dispatch<AnyAction>) => {
//     try {
//         let res = await profileApi.registration()
//     } catch (e) {
//         console.log(e)
//     } finally {

//     }
// }

// export const loginThunk = () => async (dispatch: Dispatch<AnyAction>) => {
//     try {
//         let res = await profileApi.login()
//     } catch (e) {
//         console.log(e)
//     } finally {

//     }
// }

export const logOutThunk = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    await profileApi.logOut();
    dispatch(setIsAuth({ isAuthStatus: false }));
  } catch (e) {
    console.log(e);
  } finally {
  }
};
export const changeProfileDataThunk =
  (name: string) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      let res = await profileApi.changeProfileData(name);
      dispatch(setNewName({ name: res.data.updatedUser.name }));
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

export type AppActionsType = any;
