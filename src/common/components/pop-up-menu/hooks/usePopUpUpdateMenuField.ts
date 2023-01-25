import {useNavigate, useParams} from "react-router-dom";
import editIcon from "../../../assets/Edit.svg";
import deleteIcon from "../../../assets/Delete.svg";
import learnIcon from "../../../assets/teacher.svg";


export const usePopUpUpdateMenuField = (handleEdit: (v: boolean) => void, handleDelete: (v: boolean) => void) => {
    const navigate = useNavigate()
    const params = useParams()

    return [
        {name: `Edit`, icon: editIcon, event: () => handleEdit(true)},
        {name: `Delete`, icon: deleteIcon, event: () => handleDelete(true)},
        {name: `Learn`, icon: learnIcon, event: () => navigate(`/learn/${params.id}`)},
    ]

}