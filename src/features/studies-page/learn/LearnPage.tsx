import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/store"
import { BackToPackLink } from "../../../common/components/back-link/BackToPackLink"
import { cardsForLearnSelector, isLoadingSelector, packNameSelector } from "./learn-page-selectors"
import { asyncGeneratorWay,  setCards, setNewCardGrade } from "./learn-page-slice"
import { CircularProgress} from "@mui/material";
import styles from '../learn/learn-page.module.css'
import { CardType } from "../../../common/types/types"
import { GeneralButton } from "../../../common/utils/style-for-mui/style-for-mui"
import axios from "axios"




export const LearnPage = () => {
    const cards = useAppSelector(cardsForLearnSelector)
    const packName = useAppSelector(packNameSelector)
    const lernPageIsLoading = useAppSelector(isLoadingSelector)
    const dispatch = useAppDispatch();
    const params = useParams()
    const navigate = useNavigate()

    const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Сonfused', 'Knew the answer']
    const [open, setIsOpen] = useState<boolean>(false)
    const [isFinish, setIsFinish] = useState<boolean>(false)
    const [chooseGrade, setChooseGrade] = useState<number>(1)
    const emptyCard = {
        answer: '',
        question: '',
        cardsPack_id: '',
        grade: 0,
        shots: 0,
        user_id: '',
        created: '',
        updated: '',
        _id: ''
    }
    const [card, setCard] = useState<CardType>(emptyCard)

    const getCard = (cards: CardType[]) => {
        let filterCards = cards.filter(card => card.grade !== 5)
        if (filterCards.length > 0) {
            const sum = filterCards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
            const rand = Math.random() * sum;
            const res = filterCards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return { sum: newSum, id: newSum < rand ? i : acc.id }
            }
                , { sum: 0, id: -1 });
            console.log('test: ', sum, rand, res)

            return filterCards[res.id + 1];
        }
        else {
            setIsFinish(true)
            return emptyCard
        }
    }


    useEffect(() => {
        dispatch(setCards(params.packId))
        return () => {
            setCard(emptyCard)
        }
    }, [])

    useEffect(() => {
        if (cards.length) {
            setCard(getCard(cards))
        }
    }, [cards])

    console.log(cards);


    const nextCard = (grade: number) => {
        setIsOpen(false)
        dispatch(setNewCardGrade(grade, card._id))
        setChooseGrade(1)
    }

    const onResetHandler = (cards: CardType[]) => {
        asyncGeneratorWay(cards,dispatch)
        setIsFinish(false)
    }

    const onClickNavigate = () => {
        navigate(`/cards-pack/${card.cardsPack_id}`)
    }

    if (lernPageIsLoading) {
        return <div className={styles.loading}><CircularProgress /></div>
    }

    return (
        <div className={styles.wholeForm} >
            <BackToPackLink />
            <h1>Learn {packName}</h1>
            {!isFinish
                ? <div className={styles.form} >
                    <div> <strong>Question: </strong>{card.question} </div>
                    <p>Количество попыток ответов на вопрос: {card.shots}</p>
                    {!open && <GeneralButton onClick={() => setIsOpen(true)}>Show answer</GeneralButton>}
                    {open && <Answer grades={grades} cardAnswer={card.answer} chooseGrade={chooseGrade}
                        setChooseGrade={setChooseGrade} nextCard={nextCard} />}
                </div>
                : <FinishForm cards={cards} onResetHandler={onResetHandler} />}
            <div className={styles.stopButton}>
                <GeneralButton onClick={onClickNavigate} >Stop study</GeneralButton>
            </div>
        </div>
    )
}

type AnswerPropsType = {
    grades: string[]
    cardAnswer: string
    chooseGrade: number
    setChooseGrade: (grade: number) => void
    nextCard: (grade: number) => void
}

const Answer =({grades, cardAnswer, chooseGrade, setChooseGrade, nextCard}:AnswerPropsType)=>{
    return (
<div>
                    <div className={styles.answer}><strong>Answer: </strong> {cardAnswer}</div>
                    <div>{
                        grades.map((g, i) => <div className={styles.gradeContainer}>  <input type="radio" name="radio" value={g}
                            checked={chooseGrade === (i + 1)}
                            onChange={() => setChooseGrade(i + 1)} /><span>{g}</span></div>)

                    }</div>
                    <GeneralButton className={styles.nextButton} onClick={() => nextCard(chooseGrade)}>Next card</GeneralButton>
                </div>
    )
}

type FinishFormType = {
    cards: CardType[]
    onResetHandler:(cards:CardType[])=>void
}

const FinishForm = ({cards, onResetHandler}:FinishFormType) =>{
return(<>
    <div className={styles.finishForm} >Congratulations! You passed all cards</div>
    <GeneralButton onClick={() => onResetHandler(cards)} >Reset result</GeneralButton>
</>)
}

