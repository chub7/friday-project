import React, {ChangeEvent, FC, useState} from 'react';
import {IconButton} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {convertFileToBase64} from "../../utils/convert-file/convert-file";
import { GeneralButton } from '../../utils/style-for-mui/style-for-mui';

type UploadImageType = {
    image: string
    setImage: (img: string) => void
}
export const UploadImage: FC<UploadImageType> = ({image, setImage}) => {

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log(file.size)
            if (file.size < 100000) {
                convertFileToBase64(file, (file64: string) => {
                    setImage(file64)

                })
            } else {
                alert( 'Файл слишком большого размера')
            }
        }
    }

    return (
        <div>
            {image != '' &&
                <img
                    src={image}
                    style={{width: '100px'}}
                    alt="ava"
                />}

            <label>
                <input type="file"
                       onChange={uploadHandler}
                       style={{display: 'none'}}
                />

                <IconButton component="span">
                    <CloudUploadIcon/>
                </IconButton>
            </label>
        </div>
    )
}