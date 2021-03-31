import { useState } from 'react';
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Button} from 'reactstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function Login(){
	const history = useHistory();
	const [emailState, setEmail] = useState("");
	const [passwordState, setPassword] = useState("");
	const [failed, setFailed] = useState(false);
  	


  	const loginTask = () =>{ 
    axios({method: 'POST',
    	url:'http://[::1]:3000/users/login',
    	data: {email: emailState, password: passwordState},
    	 validateStatus: () => true }).then((response) => {
    	if(response.data.error===undefined){
    		history.push({
  			pathname: '/todo',
  			state: { data: response.data }
  			});
    	}else{
    		//console.log("bad")
    		setFailed(true)
    	}
        });
  	}



	return(
		<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
		<div>

		<h3>Log in</h3>

		{ failed && <p style={{ color: 'red' }}>Wrong login, try again.</p>}
		<div>Email</div>
		<input type="text" name="emailField" onChange={e => setEmail(e.target.value)}/>
		<div>Password</div>
		<input type="password" name="passwordField" onChange={e => setPassword(e.target.value)}/>

		<div>
		<Button color="primary" size="sm" onClick={loginTask}>Log in</Button>

		<Link to="/signup"> or signup</Link>

		</div>
		</div>
		</div>
		);
	
}


export default Login;