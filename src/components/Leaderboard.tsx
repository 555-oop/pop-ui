import {Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import {getLeaderboard} from "../repositories";
import {Player} from "../model";

function Leaderboard() {
    const [rows, setRows] = React.useState<Player[]>([]);
    const [error, setError] = React.useState<Error | null>(null);
    React.useEffect(() => {
        getLeaderboard().then(response => setRows(response.data)).catch(setError);
    }, []);
    return <div className="leaderboard" style={{display: rows.length ? '' : 'none'}}>
        <h1>Leaderboard</h1>
        <TableContainer component={Paper} style={{display: error ? 'none' : ''}}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Clicks</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">{index+1}</TableCell>
                            <TableCell>{decodeURIComponent(row.name)}</TableCell>
                            <TableCell>{row.clicked}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Alert severity="error" style={{display: error ? '' : 'none'}}>{error?.name}: {error?.message}</Alert>
    </div>
}

export const Component = Leaderboard;