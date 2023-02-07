import React, {FC, useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import styles from './modal-window-cards.module.css'
import {GeneralButton} from "../../utils/style-for-mui/style-for-mui";
import {ModalType, ModalWindow} from "../main-modal-window/ModalWindow";
import {SelectFormat} from "../../components/select/Select";
import {UploadImage} from "../../components/upload-img/UploadImage";

type ModalCardType = ModalType & {
    questionValue?: string
    answerValue?: string
    answerValueImg?: string
    questionValueImg?: string
    submitSave: (question: string, answer: string, answerImg: string, questionImg: string) => void,
}
export const ModalWindowForCards: FC<ModalCardType> = ({
                                                           showModal,
                                                           setShowModal,
                                                           questionValue,
                                                           answerValue,
                                                           answerValueImg,
                                                           questionValueImg,
                                                           submitSave,
                                                           title
                                                       }) => {

    const [question, setQuestion] = useState(questionValue || '')
    const [answer, setAnswer] = useState(answerValue || '')

    const [questionImg, setQuestionImg] = useState(questionValueImg|| '')
    const [answerImg, setAnswerImg] = useState(answerValueImg || '')

    const [errorQuestion, setErrorQuestion] = useState('')
    const [errorAnswer, setErrorAnswer] = useState('')

    const [format, setFormat] = useState('text')

    const error = format === 'text'
        ? (question.length === 0 || answer.length === 0)
        : questionImg.length === 0 || answerImg.length === 0


    const handleInputValue = (event: string, setInput: (value: string) => void, setError: (value: string) => void) => {
        if (!event.trim()) {
            setError("required field");
            setInput(``);
        } else {
            setError("");
            setInput(event);
        }
    }

    const handleCloseModal = () => setShowModal(false)

    const handleAddCard = () => {

        if (!error) {
            submitSave(question, answer, answerImg, questionImg)
            setShowModal(false)
        }
    }

    useEffect(() => {
        if (format === 'text') {
            setAnswerImg('')
            setQuestionImg('')
        } else {
            setAnswer('')
            setQuestion('')
        }
    }, [format])

    useEffect(() => {
        if (question === 'no question' && answer === 'no answer') {
            setFormat('image')
        }

    }, [])


    return (
        <ModalWindow setShowModal={setShowModal} showModal={showModal} title={title}>
            <div className={styles.childrenContainer}>

                {title != 'Edit card' && <SelectFormat format={format} setFormat={setFormat}/>}

                <p className={styles.header}>Question</p>

                {format === 'text'
                    ? <TextField
                        id="standard-helperText"
                        placeholder="Enter question"
                        helperText={errorQuestion ? errorQuestion : ""}
                        variant="standard"
                        value={question}
                        onChange={(event) => handleInputValue(event.target.value, setQuestion, setErrorQuestion)}/>
                    :
                    <UploadImage image={questionImg} setImage={setQuestionImg}/>
                }

                <p className={styles.header}>Answer</p>

                {format === 'text'
                    ? <TextField
                        id="standard-helperText"
                        placeholder="Enter answer"
                        helperText={errorAnswer ? errorAnswer : ""}
                        variant="standard"
                        value={answer}
                        onChange={(event) => handleInputValue(event.target.value, setAnswer, setErrorAnswer)}/>
                    : <UploadImage image={answerImg} setImage={setAnswerImg}/>}

                <div className={styles.buttonsBlock}>
                    <GeneralButton value={'white'} onClick={handleCloseModal}>
                        Cancel
                    </GeneralButton>
                    <GeneralButton value={'blue'} onClick={handleAddCard} disabled={error}>
                        Save
                    </GeneralButton>
                </div>
            </div>
        </ModalWindow>


    );
};

