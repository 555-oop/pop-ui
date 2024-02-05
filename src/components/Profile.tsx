import {Alert} from "@mui/material";
import React from "react";
import {Player} from "../model";
import {getCurrentPlayer, getPlayer} from "../repositories";
import {useNavigate} from "react-router-dom";

function Profile() {
    const [player ,setPlayer] = React.useState<Player | null>(null);
    const [error, setError] = React.useState<Error | null>(null);
    const navigate = useNavigate();
    React.useEffect(() => {
        const name = getCurrentPlayer();
        if (!name) return navigate('/');
        getPlayer(name)
            .then(response => setPlayer(response.data))
            .catch(setError);
    }, []);
    return <div className="profile" style={{display: player ? '' : 'none'}}>
        <h1>Profile</h1>
        <h2>Your name: {decodeURIComponent(player?.name || '')}</h2>
        <h3>Have clicked: {player?.clicked}</h3>
        <Alert severity="error" style={{display: error ? '' : 'none'}}>{error?.name}: {error?.message}</Alert>
    </div>
}

export const Component = Profile;