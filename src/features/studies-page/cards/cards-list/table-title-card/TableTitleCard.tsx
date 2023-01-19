import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/store";
import { GeneralButton } from "../../../../../common/utils/style-for-mui/style-for-mui";
import { ownerOfPackSelector } from "../../../packs/packs-selectors";
import { CardModel } from "../card-model/CardModel";
import styles from '../../../studies-page.module.css'
import {
    addNewCard,
} from "../../cards-slice";

export const TableTitleCard = () => {
    const namePack = useAppSelector(ownerOfPackSelector)
    const dispatch = useAppDispatch();
    const params = useParams()
    const model = CardModel()

    const sendRequest = () => {
        dispatch(addNewCard(params.id))
    }
    return (
        <div className={styles.headerContainer}>
            <h3>{namePack}</h3>
            {model.myPack ?
                <GeneralButton onClick={sendRequest}>Add new Card</GeneralButton> :
                <GeneralButton onClick={() => {
                }}>Learn to pack</GeneralButton>}
        </div>
    )
}