import React from 'react';
import styles from "./packs-modal-window/cards-modal-window.module.css";
import {GeneralButton} from "../utils/style-for-mui/style-for-mui";
import {ModalType, ModalWindow} from "./main-modal-window/ModalWindow";

type ModalDeleteType = ModalType & {
    currentName?: string
    submitDelete: () => void

}

export const DeleteModalWindow = (props: ModalDeleteType) => {

    const {showModal, setShowModal, currentName, submitDelete, title} = props

    return (
        <ModalWindow setShowModal={setShowModal} showModal={showModal} title={title}>
            <div className={styles.contentChildren}>
                <p>Do you really want to remove <b>{currentName}</b>?
                    All cards will be deleted.</p>
                <div className={styles.buttonsBlock}>
                    <GeneralButton value={'white'} onClick={() => setShowModal(false)}>
                        Cancel
                    </GeneralButton>
                    <GeneralButton value={'red'} onClick={submitDelete}>
                        Delete
                    </GeneralButton>
                </div>
            </div>
        </ModalWindow>
    )
}