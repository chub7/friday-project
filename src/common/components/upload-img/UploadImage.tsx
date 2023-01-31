import React, {ChangeEvent, FC, useState} from 'react';
import {IconButton} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {convertFileToBase64} from "../../utils/convert-file/convert-file";

type UploadImageType = {
    image: string
    setImage: (img: string) => void
}
export const UploadImage: FC<UploadImageType> = ({image, setImage}) => {

    const [isAvaBroken, setIsAvaBroken] = useState(false)
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setImage(file64)

                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    const errorHandler = () => {
        setIsAvaBroken(true)
        alert('Кривая картинка')
    }

    return (
        <div>
            {image != '' &&
                <img
                    src={image}
                    style={{width: '100px'}}
                    onError={errorHandler}
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