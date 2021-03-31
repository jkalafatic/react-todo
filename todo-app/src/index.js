import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {MemoryRouter, Route, Link} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

//COMPONENTS
import Todo from './components/Todo';
import Login from './components/Login';
import Signup from './components/Signup';

const App = ()=>{
	return(
		<MemoryRouter>
		<div>

		<Route path="/" exact component={Login}/>
		<Route path="/signup" component={Signup}/>
		<Route path="/todo" component={Todo}/>
		</div>
		</MemoryRouter>
		)

}

ReactDOM.render(
    <App/>, document.querySelector('#root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
