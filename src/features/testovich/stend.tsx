import React from 'react';
import CheckBoxCustom from "../../components/CheckBoxCustom/CheckBoxCustom";
import InputCustom from "../../components/InputCustom/InputCustom";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";

export const Stend = () => {
    return (
        <div>
            <CheckBoxCustom>Check</CheckBoxCustom>
            <InputCustom placeholder={`any text`}/>
            <ButtonCustom>push</ButtonCustom>
        </div>
    );
};

