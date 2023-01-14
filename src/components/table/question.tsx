import React, {useEffect} from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {parseData} from "../../utils/data-parse/parse-data";
import {setCards} from "../../features/studies-page/cards-list/cards-slice";
import {cardsSelector} from "../../features/studies-page/studies-selectors";

function createData(
    question: string,
    answer: string,
    updated: string

) {
    return {question,answer,updated};
}

export const QuestionTable = () => {
    const dispatch = useAppDispatch();
    const dataTable = useAppSelector(cardsSelector)
    let tableFieldName = [`Question`, `Answer`, `Last updated`, `Grade`]

    let rows = dataTable.map(pack => createData(pack.question,
        pack.answer,
        parseData(pack.updated),
    ))

    useEffect(() => {
        dispatch(setCards())
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 350}} aria-label="simple table">
                <TableHead>
                    <TableRow>{}

                        {tableFieldName.map(name => <TableCell align="right">{name}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.question}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.question}
                            </TableCell>
                            <TableCell align="right">{row.answer}</TableCell>
                            <TableCell align="right">{row.updated}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

