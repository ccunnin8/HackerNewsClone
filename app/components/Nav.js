import React from "react";
import { NavLink } from "react-router-dom";
import { ThemeConsumer } from "../context/theme";

const activeStyle = {
    color: "rgb(187,46,31)"
}

export default function Nav() {
    return (
        <ThemeConsumer>
        {({theme, toggleTheme}) => {
            return (
                <nav className="row space-between">
                    <ul className="row nav">
                        <li>
                            <NavLink
                                exact
                                activeStyle={activeStyle}
                                to="/"
                                className="nav-link">
                                Top
                    </NavLink>
                        </li>
                        <li>
                            <NavLink
                                exact
                                activeStyle={activeStyle}
                                to="/new"
                                className="nav-link">
                                New
                    </NavLink>
                        </li>
                    </ul>
                    <button onClick={() => toggleTheme()} style={{ "fontSize": "30px" }} className="btn-clear">
                        { theme === "light" ?  "🔦" : "💡" }
                    </button>
                </nav>
            )
        }}
        </ThemeConsumer>
    );
}