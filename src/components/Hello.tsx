import {Alert, Backdrop, CircularProgress} from "@mui/material";
import React, {useEffect} from "react";
import {newPlayer, setCurrentPlayer, setServer} from "../repositories";
import {Player} from "../model";
import {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";

function Hello() {
    const [error, setError] = React.useState<Error | null>(null);

    function askForName() {
        const name = prompt('What is your name?')
        if (!name || !name.trim()) return askForName();
        return name;
    }

    function askForServer() {
        return prompt('What server do you want to join? (leave blank for default, example: http://localhost:8080)')
    }

    const navigate = useNavigate();

    function handleSuccess(response: AxiosResponse<Player>) {
        setCurrentPlayer(response.data.name);
        navigate('/game');
    }

    function handleError(error: Error) {
        console.error(error);
        setError(error);
    }

    useEffect(() => {
        setServer(askForServer());
        newPlayer(askForName())
            .then(handleSuccess)
            .catch(handleError);
    }, []);
    return <div className="hello">
        <Backdrop open={error === null}>
            <CircularProgress/>
        </Backdrop>
        <Alert severity="error" style={{display: error ? '' : 'none'}}>{error?.name}: {error?.message}</Alert>
    </div>
}

export const Component = Hello;