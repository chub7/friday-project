import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../../../app/store";
import editIcon from "../../../assets/Edit.svg";
import deleteIcon from "../../../assets/Delete.svg";
import learnIcon from "../../../assets/teacher.svg";
import {deletePacksCards} from "../../../../features/studies-page/packs/packs-slice";


export const usePopUpUpdateMenuField = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const params = useParams()
    return [
        //{name: `Edit`, icon: editIcon, event: () => dispatch(changeNamePacksCards(params.id))},
        {name: `Edit`, icon: editIcon, event: () => Function},
        {name: `Delete`, icon: deleteIcon, event: () => {dispatch(deletePacksCards(params.id))}},
        {name: `Learn`, icon: learnIcon, event: () => alert(`Learn`)},
    ]

}