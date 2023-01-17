import profileIcon from "../../assets/userlogo.svg";
import logOutIcon from "../../assets/logout.svg";
import editIcon from "../../assets/Edit.svg";
import deleteIcon from "../../assets/Delete.svg";
import learnIcon from "../../assets/teacher.svg";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/store";
import {logOutThunk} from "../../features/Profile/profile-slice";


export const usePopUpProfileMenuField = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    return [
        {name: `Profile`, icon: profileIcon, event: () => navigate(`profile`)},
        {name: `Log Out`, icon: logOutIcon, event: () => dispatch(logOutThunk())}
    ]
}

export const usePopUpUpdateMenuField = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    return [
        {name: `Edit`, icon: editIcon, event: () => alert(`Edit`)},
        {name: `Delete`, icon: deleteIcon, event: () => alert(`Delete`)},
        {name: `Learn`, icon: learnIcon, event: () => alert(`Learn`)},
    ]
}