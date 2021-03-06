import React, { Component } from 'react';

import twitterLogo from '../twitter.svg';
import './Login.css'

export default class Login extends Component {
    state = {
        username: '',
    };

    // utilize arrow function in this case to use 'this' get the class reference
    handleInputChange = (e) => {
        this.setState({ username: e.target.value });
    }

    async componentDidMount() {
        const username = await localStorage.getItem('@GoTwitter:username');

        if (username) {
            this.props.history.push('/timeline');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { username } = this.state;

        if (!username.length) return;

        localStorage.setItem('@GoTwitter:username', username);

        this.props.history.push('/timeline');
    }

    render() {
        return (
            <div className="login-wrapper">
                <img src={twitterLogo} alt="Twitter" />
                <form onSubmit={this.handleSubmit}>
                    <input
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        placeholder="Nome de usuário"
                    />

                    <button type="submit">Entrar</button>
                </form>
            </div>
        )
    }
}
