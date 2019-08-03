import React, {Suspense, Lazy } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import Nav from "./components/Nav";
import Loading from "./components/Loading";
import { ThemeProvider } from "./context/theme";
const Stories = React.lazy(() => import("./components/Stories"));
const User = React.lazy(() => import("./components/User"));
const Post = React.lazy(() => import("./components/Post"));
class App extends React.Component {
    state = {
        theme: "light",
        toggleTheme: () => {
            this.setState(state => ({theme: state.theme === "light" ? "dark" : "light" }))
        }
    }
    render() {
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={`${this.state.theme}`}>
                        <div className="container">
                            <Nav />
                            <Suspense fallback={<Loading />}>
                                <Switch>
                                    <Route path="/" exact component={() => <Stories type="top" />} />
                                    <Route path="/new" exact component={() => <Stories type="new" />} />
                                    <Route path="/user" exact component={User} />
                                    <Route path="/post" exact component={Post} />
                                    <Route render={() => <h1>Page not found!</h1>} />
                                </Switch>
                            </Suspense>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

const app = document.getElementById("app");

ReactDOM.render(<App/>, app);