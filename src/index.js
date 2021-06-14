import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = React.createElement(
  'p',
  {className: 'greeting'},
  'Hello, world!'
);

function getGreeting(user, isToggleOn) {
  if (user && isToggleOn) {
    return <p>Hello, {formatName(user)}!</p>;
  }
  return <p>Hello, Stranger.</p>;
}


class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
    ReactDOM.render(getGreeting(user, this.state.isToggleOn), document.getElementById('userinfo'));
  }

  render() {
    return (
      <div>
        <span>Who are you?</span>
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
        {this.tag}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<h1>Hello, world! 일반 렌더..</h1>, document.getElementById('hello'));

ReactDOM.render(
  <Toggle />,
  document.getElementById('toggle')
);

ReactDOM.render(
  element,
  document.getElementById('userinfo')
);

function tick() {
  const element = (
    <div>
      <p>렌더링 된 요소 업데이트..</p>
      <p>It is {new Date().toLocaleTimeString()}.</p>
    </div>
  );
  ReactDOM.render(element, document.getElementById('time'));
}

setInterval(tick, 1000);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
