import { useState } from 'react';
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Button} from 'reactstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function Signup(){
	const history = useHistory();
	const [emailState, setEmail] = useState("");
	const [passwordState, setPassword] = useState("");
	const [failed, setFailed] = useState(false);
  	


  	const signupTask = () =>{ 

  	if(emailState.length>2 && passwordState.length>2){

  	axios({method: 'POST',
    	url:'http://[::1]:3000/users/login',
    	data: {email: emailState, password: passwordState},
    	 validateStatus: () => true }).then((response) => {

    	if(response.data.error===undefined){
    	  setFailed(true)
    	}
    	else{
    	  	//console.log("bad")
    		axios({method: 'POST',
    		url:'http://[::1]:3000/signup',
    		data: {email: emailState, password: passwordState},
    	 	validateStatus: () => true }).then((response) => {
    		if(response.data.error===undefined){
    			history.push({
  				pathname: '/'
  				});
    		}else{
    			//console.log("bad")
    			setFailed(true)
    		}
        	});
        	}
    });
    }
    else{
    	setFailed(true)
    }
    
  	}



	return(
		<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
		<div>
		<h3>Sign up</h3>

		{ failed && <p style={{ color: 'red' }}>Signup failed, try again.</p>}

		<div>Email</div>
		<input type="text" name="emailField" onChange={e => setEmail(e.target.value)}/>
		<div>Password</div>
		<input type="password" name="passwordField" onChange={e => setPassword(e.target.value)}/>

		<div>
		<Button color="success" size="sm" onClick={signupTask}>Sign up</Button>


		<Link to="/"> Back to login</Link>

		</div>
		</div>
		</div>
		);
	
}


export default Signup;