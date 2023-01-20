import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../../../app/store";
import editIcon from "../../../assets/Edit.svg";
import deleteIcon from "../../../assets/Delete.svg";
import learnIcon from "../../../assets/teacher.svg";
import { changeNamePacksCards, deletePacksCards } from "../../../../features/studies-page/packs/packs-slice";


export const usePopUpUpdateMenuField = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const params = useParams()
console.log(params.id);


    return [
        {name: `Edit`, icon: editIcon, event: () => dispatch(changeNamePacksCards(params.id))},
        {name: `Delete`, icon: deleteIcon, event: () => {dispatch(deletePacksCards(params.id))}},
        {name: `Learn`, icon: learnIcon, event: () => alert(`Learn`)},
    ]
}