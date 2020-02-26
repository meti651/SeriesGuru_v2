import React, { Component, ReactDOM } from 'react';
import history from '../../utility/history';

export class Authentication extends Component {
    static display = Authentication.name;

    


    constructor(props) {
        super(props);
        this.state = { pin: null, loading: true };
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }



    async componentDidMount() {
        await fetch('/api/authentication/createUrl');
    }

    sendPin = async () => {
        fetch('/api/authentication/PIN/' + this.state.pin).then((_) => {
            window.location.replace('/');
             });
    };

    onChangeHandler({ target: { value } }) {
        this.setState({ pin: value });
    }

    render() {
        return (
            <div>
                <input onChange={this.onChangeHandler} />
                <button onClick={this.sendPin}>Submit</button>
                </div>)
    }
}
