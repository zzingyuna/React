import React from 'react';
import logo from '../logo.svg';

const Home = (props) => {
    return (
        <>
            <h3>안녕하세요. 메인페이지 입니다.</h3>
            <a href='/about'>about</a><br />
            <a href='/test1'>test1</a><br />
            <a href='/test2'>test2</a><br />
            <a href='/test3'>test3</a><br />
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                Learn React
                </a>
            </header>
        </>
    );
};

export default Home;