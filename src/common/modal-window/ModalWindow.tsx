import {createPortal} from "react-dom";
import styles from "../../features/studies-page/packs/packs-modal-window/cards-modal-window.module.css"
import closeIcon from "../assets/close-modal.svg"
import React, {FC} from "react";


type CardsModalType = {
    setShowModal: (v: boolean) => void
    showModal: boolean
    children: JSX.Element
    title: string
}

export const ModalWindow: FC<CardsModalType> = (props) => {
    const {setShowModal, showModal, children, title} = props

    return showModal
        ? createPortal(
            <div>
                <div className={styles.overlay}></div>
                <div className={styles.modalForm}>
                    <div className={styles.titleBlock}>
                        <p>{title}</p>
                        <img alt="close" src={closeIcon} onClick={() => setShowModal(false)}/>
                    </div>
                    {children}
                </div>
            </div>
            , document.getElementById("modal") as HTMLElement)
        : null

}
