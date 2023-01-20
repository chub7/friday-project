import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../../app/store";
import editIcon from "../../../assets/Edit.svg";
import deleteIcon from "../../../assets/Delete.svg";
import learnIcon from "../../../assets/teacher.svg";

export const usePopUpUpdateMenuField = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    return [
        {name: `Edit`, icon: editIcon, event: () => alert(`Edit`)},
        {name: `Delete`, icon: deleteIcon, event: () => alert(`Delete`)},
        {name: `Learn`, icon: learnIcon, event: () => alert(`Learn`)},
    ]
}