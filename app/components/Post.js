import React from "react";
import { getItem, getPosts } from "../utils/api";
import { Story } from "./Stories";
import queryString from "query-string";
import Loading from "./Loading";
import moment from "moment";
import { Link } from "react-router-dom";
function Response({by, time, text}) {
    const formattedTime = moment(time * 1000).format("MM/DD/YYYY, h:mm a");
    return (
        <div className="comment">
            <p className="info">by <Link to={{ pathname: "user", search: `?id=${by}` }}>{by}</Link> on {formattedTime}</p>
            <p dangerouslySetInnerHTML={{ __html: text }}></p>
        </div>
    )
}
function Responses({responses}) {
    return (
        <React.Fragment>
            { responses.map((response) => {
                const { by, time, text, id } = response;
                return <Response key={id} by={by} time={time} text={text} />
            })}
        </React.Fragment>
    )
}
export default class Post extends React.Component {
    state = {
        error: null,
        responses: null,
        details: null
    }

    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search);
        getItem(id)
            .then(details => {
                this.setState({details})
                getPosts(details.kids)
                    .then(responses => {
                        this.setState({responses})
                    })
                    .catch(error => this.setState({error}))
            })
            .catch(error => this.setState({ error}))
    }

    render() {
        const { error, responses, details } = this.state;
        console.log(responses, details);
        return (
            <React.Fragment>
                { !error && !details && !responses && <Loading />}
                { error && <p>An error occurred</p>}
                { details && <Story header {...details } />}
                { responses && <Responses responses={responses}/>}
            </React.Fragment>
        )
    }
    
}