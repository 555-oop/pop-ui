import {Link} from "react-router-dom";
import {AccountCircle, Leaderboard} from "@mui/icons-material";
import './Menu.css'

function Menu() {
    return <div className="menu">
        <Link to="/profile"><AccountCircle/></Link>
        <Link to="/leaderboard"><Leaderboard/></Link>
    </div>
}

export default Menu;