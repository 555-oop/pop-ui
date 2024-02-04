import {Player} from "../model";
import axios, {AxiosResponse} from "axios";

export type Response<T> = Promise<AxiosResponse<T>>;
function getAxiosInstance() {
    return axios.create({ baseURL: getServer() });
}

export function newPlayer(name: string): Response<Player> {
    return getAxiosInstance().post(`/player`, name);
}

export function getPlayer(name: string): Response<Player> {
    return getAxiosInstance().get(`/player/${name}`);
}

export function playerClick(name: string): Response<Player> {
    return getAxiosInstance().put(`/player/${name}`);
}

export function getLeaderboard(): Response<Player[]> {
    return getAxiosInstance().get("/player/leaderboard");
}

export function getCurrentPlayer(): string | null {
    return window.localStorage.getItem("player");
}

export function setCurrentPlayer(player: string | null): void {
    if (!player) return window.localStorage.removeItem("player");
    window.localStorage.setItem("player", player);
}

export function getServer(): string {
    return window.localStorage.getItem("server") || import.meta.env.VITE_SERVER;
}

export function setServer(server: string | null): void {
    if (!server) return window.localStorage.removeItem("server");
    window.localStorage.setItem("server", server);
}