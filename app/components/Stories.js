import React from "react";
import { getNews } from "../utils/api";
import Loading from "./Loading";
import moment from "moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function StoryInfo({by, time, descendants, id}) {
    const formattedTime = moment(time * 1000).format("MM/DD/YYYY, h:mm a");
    return (
        <p className="info">by
            <Link to={{ pathname: "user", search: `?id=${by}` }}> {by}</Link> on {formattedTime} with
            <Link to={{ pathname: "post", search: `?id=${id}`}}> {descendants}</Link> comments
        </p>
    );
}
export function Story({title, url, by, time, descendants, id, header=false}) {
    return (
        <li className="post">
            { header ? 
            <h1 className="header">
                <a className="link" href={url}>
                        {title}
                </a>
            </h1> :
                <a className="link" href={url}>
                    {title}
                </a>
            }
           <StoryInfo {...{id,time,descendants,by}} />
        </li>
    );
};

export function StoriesList({stories}) {
    return (
        <ul>
            { stories.map((story) => {
                return <Story key={story.id} {...story} />
            })}
        </ul>
    )
}

export default class Stories extends React.Component {
    state = {
        stories: null,
        error: null,
    }

    static propTypes = {
        type: PropTypes.string.isRequired
    }

    componentDidMount() {
        getNews(this.props.type)
                .then(stories => this.setState({ stories }))
                .catch(error => this.setState({ error }))
    }

    render() {
        const { stories, error } = this.state;
        return (
            <React.Fragment>
                <div className="stories-container">
                  { !stories && !error && <Loading text={"Loading stories"}/>}
                  { error && <p>There was an error loading stories</p> }
                  { stories && <StoriesList stories={stories}/>}
                </div>
            </React.Fragment>
        )
    }
}