import {createPortal} from "react-dom";
import styles from "../packs-modal-window/cards-modal-window.module.css"
import closeIcon from "../../assets/close-modal.svg"
import React, {FC} from "react";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";


export type ModalType = {
    showModal: boolean,
    setShowModal: (value: boolean) => void
    title: string
}

type CardsModalType = ModalType & {
    children: JSX.Element
}

export const ModalWindow: FC<CardsModalType> = (props) => {
    const {setShowModal, showModal, children, title} = props

    const handleCloseModal = () => {
        setShowModal(false)
    }
    return showModal
        ? createPortal(
            <div>
                <div className={styles.overlay} onClick={handleCloseModal}></div>
                <div className={styles.modalForm}>
                    <div className={styles.titleBlock}>
                        <p>{title}</p>
                        <IconButton onClick={handleCloseModal}>
                            <CloseIcon/>
                        </IconButton>
                        {/*   <img alt="close" src={closeIcon} onClick={() => setShowModal(false)}/>*/}
                    </div>
                    {children}
                </div>
            </div>
            , document.getElementById("modal") as HTMLElement)
        : null

}
