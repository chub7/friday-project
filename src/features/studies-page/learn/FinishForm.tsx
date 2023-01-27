import { CardType } from "../../../common/types/types"
import { GeneralButton } from "../../../common/utils/style-for-mui/style-for-mui"
import styles from '../learn/learn-page.module.css'

type FinishFormType = {
    cards: CardType[]
    onResetHandler: (cards: CardType[]) => void
}

export const FinishForm = ({cards, onResetHandler}: FinishFormType) => {
    return (<>
        <div className={styles.finishForm}>Congratulations! You passed all cards</div>
        <GeneralButton onClick={() => onResetHandler(cards)}>Reset result</GeneralButton>
    </>)
}