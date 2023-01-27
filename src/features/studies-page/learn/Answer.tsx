import { GeneralButton } from '../../../common/utils/style-for-mui/style-for-mui'
import styles from '../learn/learn-page.module.css'

type AnswerPropsType = {
    grades: string[]
    cardAnswer: string
    chooseGrade: number
    setChooseGrade: (grade: number) => void
    nextCard: (grade: number) => void
}

export const Answer = ({grades, cardAnswer, chooseGrade, setChooseGrade, nextCard}: AnswerPropsType) => {
    return (
        <div>
            <div className={styles.answer}><strong>Answer: </strong> {cardAnswer}</div>
            <div>{
                grades.map((g, i) => <div className={styles.gradeContainer}><input type="radio" name="radio" value={g}
                                                                                   checked={chooseGrade === (i + 1)}
                                                                                   onChange={() => setChooseGrade(i + 1)}/><span>{g}</span>
                </div>)

            }</div>
            <GeneralButton className={styles.nextButton} onClick={() => nextCard(chooseGrade)}>Next card</GeneralButton>
        </div>
    )
}