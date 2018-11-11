import React, { Component } from 'react';
import api from '../services/api';
import socket from 'socket.io-client';

import twitterLogo from '../twitter.svg';
import './Timeline.css'

import Tweet from '../components/Tweet';

export default class Timeline extends Component {
    state = {
        tweets: [],
        newTweat: '',
    };

    async componentDidMount() { // Using async await, because we are using a request for api
        this.subscribeToEvents();

        const response = await api.get('tweets');

        this.setState({ tweets: response.data });
    }

    subscribeToEvents = () => {
        const io = socket('http://localhost:3000');

        io.on('tweet', data => {
            this.setState({ tweets:[data, ...this.state.tweets] })
        });

        io.on('like', data => {
            this.setState({ 
                tweets: this.state.tweets.map(
                    tweet => (tweet._id === data._id ? data : tweet)
                ) 
            })
        });
    }

    // utilize arrow function in this case to use 'this' get the class reference
    handleInputChange = (e) => {
        this.setState({ newTweat: e.target.value });
    }

    handleNewTweat = async (e) => {
        if (e.keyCode !== 13) return;

        const content = this.state.newTweat;
        const author = localStorage.getItem('@GoTwitter:username');

        await api.post('tweets', {content, author});

        this.setState({ newTweat: ''});
    }

    render() {
        return (
            <div className="timeline-wrapper">
                <img heigth={24} src={twitterLogo} alt="Twitter" />

                <form>
                    <textarea
                        value={this.state.newTweat}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweat}
                        placeholder="What is happening?"
                    />
                </form>

                <ul className="tweet-list">
                { this.state.tweets.map(tweet => (
                    <Tweet key={tweet._id} tweet ={tweet} />
                ))}
                </ul>
            </div>
        )
    }
}
