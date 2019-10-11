import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import BookCourt from './BookCourt';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Book extends React.Component{
	
	constructor(){
		super();
		this.isAdmin = false;
		
	}
	assign( bool ) {
		
		if(bool === 0){
			this.isAdmin = false;
			Object.freeze(this.isAdmin);			
			ReactDOM.render(<BookCourt />, document.getElementById('court'));
			//document.getElementsByClassName('btn').style.visibility = 'hidden';
			$('.btn').css('display','none');
		}
		else if(bool === 1){
			this.isAdmin = true;
			Object.freeze(this.isAdmin);
		}		
	}
	

	 render(){		 		  
		  return (
		  <div>
			<button type="button" class="btn  btn-success btn-sm" onClick={() =>{this.assign(0)}}>Book Court</button>
		   &nbsp; &nbsp;
		   <button type="button" class="btn btn-info btn-sm" onClick={() =>{this.assign(1)}}>Admin</button>
		   
		   
		   
		   
		  
		   
		   
		  
		   </div>
	);
      
  
		 
	 }
	
	
}

export default Book;


