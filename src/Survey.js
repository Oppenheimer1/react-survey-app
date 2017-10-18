import React, { Component } from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

  var config = {
    apiKey: "AIzaSyAC5L6yVIuuY3Hb-5_fLG0eQuvtS_Q-_j8",
    authDomain: "react-survey-app.firebaseapp.com",
    databaseURL: "https://react-survey-app.firebaseio.com",
    projectId: "react-survey-app",
    storageBucket: "react-survey-app.appspot.com",
    messagingSenderId: "327669057346"
  };
  firebase.initializeApp(config);

class Survey extends Component {
	nameSubmit(event){
		var studentName = this.refs.name.value;
		this.setState({studentName: studentName}, function(){
			console.log(this.state);
		}); 
	}
	answerSelected(event){
		var answers = this.state.answers;
		if(event.target.name === 'answer1'){
			answers.answer1 = event.target.value;
		} else if(event.target.name === 'answer2'){
			answers.answer2 = event.target.value;
		} else if(event.target.name === 'answer3'){
			answers.answer3 = event.target.value;
		}

		this.setState({answers: answers}, function(){
			console.log(this.state);
		});
	}
	questionSubmit(){
		firebase.database().ref('react-survey-app/'+this.state.uid).set({
			studentName: this.state.studentName,
			answers: this.state.answers
		});
		this.setState({isSubmitted: true});
	}

	constructor(props){
		super(props);

		this.state = {
			uid: uuid.v1(),
			studentName: '',
			answers: {
				answer1: '',
				answer2: '',
				answer3: ''
			},
			isSubmitted: false
		};
		this.nameSubmit = this.nameSubmit.bind(this);
		this.answerSelected = this.answerSelected.bind(this);
		this.questionSubmit = this.questionSubmit.bind(this);
	}


  render() {
  	var studentName;
  	var questions;

  	if(this.state.studentName === '' && this.state.isSubmitted === false){
  		studentName = <div>
	  		<h1>Please enter your name to take the survey.</h1>
	  		<form onSubmit={this.nameSubmit}>
	  			<input className ="namy" type="text" placeholder="Enter your name" ref="name" />
	  		</form>
  		</div>
  		questions = ''
  	} else if (this.state.studentName !== '' && this.state.isSubmitted ===false){
  		studentName = <h1>Welcome to Survey, {this.state.studentName}</h1>;
	  		questions = <div>
	  			<h2>Here are some questions: </h2>
	  			<form onSubmit={this.questionSubmit}>
		  			<div className="card">
		  				<label>What kind of courses do you like the most: </label> <br/>
		  				<input type="radio" name ="answer1" value ="Technology" onChange={this.answerSelected}/>Technology
		  				<input type="radio" name ="answer1" value ="Design" onChange={this.answerSelected}/>Design
		  				<input type="radio" name ="answer1" value ="Marketing" onChange={this.answerSelected}/>Marketing
		  			</div>
		  			<div className="card">
		  				<label>You are a: </label> <br/>
		  				<input type="radio" name ="answer2" value ="Student" onChange={this.answerSelected}/>Student
		  				<input type="radio" name ="answer2" value ="Working" onChange={this.answerSelected}/>Working
		  				<input type="radio" name ="answer2" value ="Looking" onChange={this.answerSelected}/>Looking for Work
		  			</div>
		  			<div className="card">
		  				<label>Is online learning helpful: </label> <br/>
		  				<input type="radio" name ="answer3" value ="Yes" onChange={this.answerSelected}/>Yes
		  				<input type="radio" name ="answer3" value ="No" onChange={this.answerSelected}/>No
		  				<input type="radio" name ="answer3" value ="Maybe" onChange={this.answerSelected}/>Maybe
		  			</div>
		  			<input className="feedback-button" type="submit" value="submit" />
	  			</form>
	  		</div>
  	}else if(this.state.isSubmitted === true){
  		studentName = <h1>Thanks, {this.state.studentName}</h1>
  	}

    return (
      <div>
      	{studentName}
      	-----------------------------------
      	{questions}
      </div>
    );
  }
}

export default Survey;