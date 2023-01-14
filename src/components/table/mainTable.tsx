import React, {useEffect} from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {parseData} from "../../utils/data-parse/parse-data";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {packsCardsSelector} from "../../features/studies-page/studies-selectors";
import {setPacksCards} from "../../features/studies-page/pack-list/pack-slice";


export function createData(
    name?: string,
    cardsCount?: number,
    lastUpdated?: any,
    createdBy?: string,
    actions?: string,
    questions?: string,
    answer?: string,
    grade?: string
) {
    return {name, cardsCount, lastUpdated, createdBy, actions, questions, answer, grade};
}

export const MainTable = () => {
    const dataTable = useAppSelector(packsCardsSelector)
    const dispatch = useAppDispatch();
    const tableFieldName = [`Name`, `Cards`, `Last updated`, `Created by`, `Actions`]


    let rows = dataTable.map(pack => createData(pack.name,
        pack.cardsCount,
        parseData(pack.updated),
        pack.user_name,
        pack.updated))

    useEffect(() => {
        dispatch(setPacksCards())
    }, [])
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 350}} aria-label="simple table">
                <TableHead>
                    <TableRow>{}

                        {tableFieldName.map(name => <TableCell key={name} align="right">{name}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.cardsCount}</TableCell>
                            <TableCell align="right">{row.lastUpdated}</TableCell>
                            <TableCell align="right">{row.createdBy}</TableCell>
                            <TableCell align="right">{row.actions}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
