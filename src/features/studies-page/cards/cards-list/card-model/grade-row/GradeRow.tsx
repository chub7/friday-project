import React, {FC} from 'react';

import {Rating} from "@mui/material";

export const GradeRow: FC<{ grade: number }> = ({grade}) => {

    return (
        <div>
            <Rating name="half-rating-read" defaultValue={grade} precision={0.5} readOnly />
        </div>
    );
};

