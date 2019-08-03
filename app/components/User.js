import React from "react";
import { getUser, getPosts } from "../utils/api";
import queryString from "query-string";
import Loading from "./Loading";
import moment from "moment";
import { StoriesList } from "./Stories";
function UserInfo({about, created, id, karma}) {
    return (
        <React.Fragment>
            <h1 className="header">{id}</h1>
            <p className="info">
                joined {moment(created * 1000).format("MM/DD/YYYY hh:mm a")} has <strong>{karma}</strong> karma
            </p>
            <div dangerouslySetInnerHTML={{ __html: about}}></div>
        </React.Fragment>
    )
}


export default class User extends React.Component {
    state = {
        userInfo: null,
        error: null,
        posts: null 
    }

    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search);
        getUser(id).then(data => {
            const { about, created, id, karma } = data;
            this.setState({ userInfo: { about, created, id, karma }})
            return data;
        }).then(data => {
            getPosts(data.submitted)
                .then((posts) => {
                    posts = posts.filter((post) => post.type === "story");
                    this.setState({ posts })
                })
                .catch(err => this.setState({ error: err + "something went wrong!"}))
        })
        .catch(err => {
            this.setState({error: err + "something went wrong"})
        });
    }
    render() {
        const { error, userInfo, posts } = this.state;
        return (
            <React.Fragment>
                { !error && !userInfo && <Loading text="getting user"/> }
                { error && <p>{error}</p>}
                { userInfo && <UserInfo {...userInfo }/> }
                { posts && <StoriesList stories={posts}/> }
            </React.Fragment>
        );
    }
}