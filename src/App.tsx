import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

function App() {
    const routes = [
        {
            path: '/',
            lazy: () => import('./components/Hello.tsx'),
        },
        {
            path: '/game',
            lazy: () => import('./components/Game.tsx'),
        },
        {
            path: '/profile',
            lazy: () => import('./components/Profile.tsx'),
        },
        {
            path: '/leaderboard',
            lazy: () => import('./components/Leaderboard.tsx'),
        },
    ]
    const router = createBrowserRouter(routes)
    return <RouterProvider router={router}/>
}

export default App
