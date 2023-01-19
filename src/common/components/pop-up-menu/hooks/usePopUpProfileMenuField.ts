import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../../app/store";
import profileIcon from "../../../assets/userlogo.svg";
import logOutIcon from "../../../assets/logout.svg";
import {logOutThunk} from "../../../../features/login/login-slice";

export const usePopUpProfileMenuField = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    return [
        {name: `Profile`, icon: profileIcon, event: () => navigate(`profile`)},
        {name: `Log Out`, icon: logOutIcon, event: () => dispatch(logOutThunk())}
    ]
}