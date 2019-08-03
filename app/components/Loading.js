import React from "react";
import PropTypes from "prop-types";

export default class Loading extends React.Component {
    state = {
        text: this.props.text,
        counter: 0,
    }

    static propTypes = {
        text: PropTypes.string.isRequired
    }

    static defaultProps = {
        text: "Loading",
        maxCount: 3,
        value: ".",
    }

    componentDidMount() {
        const { maxCount, value } = this.props;
        this.status = window.setInterval(() => {
            this.setState(({text, counter}) => ({ text: text + value, counter: counter + 1 }), () => {
                if (this.state.counter === maxCount + 1) {
                    this.setState({ text: this.props.text, counter: 0 });
                }
            })
        }, 300)
    }

    componentWillUnmount() {
        window.clearInterval(this.status);
    }

    render() {
        return <h1>{this.state.text}</h1>
    }
}