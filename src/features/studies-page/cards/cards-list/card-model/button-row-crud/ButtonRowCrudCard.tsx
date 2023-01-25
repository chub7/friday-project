import React, {FC, useState} from 'react';
import {ModalWindow} from "../../../../../../common/modal-window/ModalWindow";
import {ModalWindowForPack} from "../../../../packs/packs-modal-window/ModalWindowForPack";
import IconButton from "@mui/material/IconButton";
import {deleteCard, updateNameCard} from "../../../cards-slice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch} from "../../../../../../app/store";
import {ModalWindowForCards} from "../../../cards-modal-window/ModalWindowForCards";
import {CardType} from "../../../../../../common/types/types";
import {DeleteModalWindow} from "../../../../packs/packs-modal-window/DeleteModalWindow";

type ButtonRowCrudType = { pack: CardType }

export const ButtonRowCrudCard: FC<ButtonRowCrudType> = ({pack}) => {

    const dispatch = useAppDispatch();
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)


    const handleDeleteCard = () => {
        dispatch(deleteCard(pack._id, pack.cardsPack_id))
    }

    const handleUpdateCard = (question: string, answer: string) => {
        dispatch(updateNameCard(pack._id, pack.cardsPack_id, question, answer))
    }

    return (
        <div>
            <IconButton onClick={() => setShowModalEdit(true)}> <EditIcon/></IconButton>
            <IconButton onClick={() => setShowModalDelete(true)}> <DeleteIcon/></IconButton>

            <ModalWindowForCards
                showModal={showModalEdit}
                submitSave={handleUpdateCard}
                setShowModal={setShowModalEdit}
                questionValue={pack.question}
                answerValue={pack.answer}
                title={'Edit card'}/>

            <DeleteModalWindow
                showModal={showModalDelete}
                setShowModal={setShowModalDelete}
                submitDelete={handleDeleteCard}
                currentName={pack.question}
                title={`Delete pack`}/>


        </div>
    );
};

