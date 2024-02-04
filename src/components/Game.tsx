import popImg from '../assets/pop.jpeg';
import npopImg from '../assets/npop.jpeg';
import popSound from '../assets/pop.mp3';
import React, {useEffect} from "react";
import './Game.css';
import {getCurrentPlayer, playerClick} from "../repositories";
import {useNavigate} from "react-router-dom";
import {Alert} from "@mui/material";
import Menu from "./Menu.tsx";

function Game() {
    const [error, setError] = React.useState<Error | null>(null);
    const [count, setCount] = React.useState(0);
    const [popped, pop] = React.useState(false);
    const [timer, setTimer] = React.useState<number | null>(null);
    const style = (show: boolean): React.CSSProperties => ({display: show ? '' : 'none'});
    const player = getCurrentPlayer();
    const navigate = useNavigate();
    if (!player) navigate('/');
    useEffect(() => {
        if (!popped) return;
        const audio = new Audio(popSound);
        audio.play();
    }, [popped]);
    const handleMouseIn = () => {
        setCount(count + 1);
        playerClick(player!).catch(setError);
        pop(true);
    }
    const handleMouseOut = () => {
        if (timer)
            clearTimeout(timer);
        setTimer(setTimeout(() => pop(false), 16));
    }
    return <div className="game" onMouseDown={handleMouseIn} onMouseUp={handleMouseOut} onMouseLeave={handleMouseOut}>
        <Menu/>
        <h1>{count}</h1>
        <img alt="PopCat!" src={popImg} style={style(popped)}/>
        <img alt="PopCat!" src={npopImg} style={style(!popped)}/>
        <Alert severity="error" style={style(error !== null)}>{error?.name}: {error?.message}</Alert>
    </div>
}

export const Component = Game;