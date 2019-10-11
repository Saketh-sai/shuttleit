import React from 'react';
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import Book from './App';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import ReactDOM from 'react-dom';
import loader from './loader2.gif'


var date = new Date().toLocaleDateString();
date = date.toString();
class BookCourt extends React.Component{
	constructor(){
		super();
		
		this.state ={
			jsondata : [],
			isloader : false
		}
			
		
		//this.state ={
			//data:[{"SLOT":1,"START TIME":"06:30:00.000000","END TIME":"07:30:00.000000","ISBOOKED":0,"CODE":null,"FLAT":null,"NAME":null},{"SLOT":2,"START TIME":"07:30:00.000000","END TIME":"08:30:00.000000","ISBOOKED":0,"CODE":null,"FLAT":null,"NAME":null},{"SLOT":3,"START TIME":"08:30:00.000000","END TIME":"09:30:00.000000","ISBOOKED":0,"CODE":null,"FLAT":null,"NAME":null},{"SLOT":4,"START TIME":"09:30:00.000000","END TIME":"10:30:00.000000","ISBOOKED":0,"CODE":null,"FLAT":null,"NAME":null},{"SLOT":5,"START TIME":"10:30:00.000000","END TIME":"11:30:00.000000","ISBOOKED":0,"CODE":null,"FLAT":null,"NAME":null},{"SLOT":6,"START TIME":"11:30:00.000000","END TIME":"12:30:00.000000","ISBOOKED":0,"CODE":null,"FLAT":null,"NAME":null},{"SLOT":7,"START TIME":"12:30:00.000000","END TIME":"13:30:00.000000","ISBOOKED":0,"CODE":null,"FLAT":null,"NAME":null},{"SLOT":8,"START TIME":"13:30:00.000000","END TIME":"14:30:00.000000","ISBOOKED":0,"CODE":null,"FLAT":null,"NAME":null},{"SLOT":9,"START TIME":"14:30:00.000000","END TIME":"15:30:00.000000","ISBOOKED":0,"CODE":null,"FLAT":null,"NAME":null},{"SLOT":10,"START TIME":"15:30:00.000000","END TIME":"16:30:00.000000","ISBOOKED":0,"CODE":null,"FLAT":null,"NAME":null},{"SLOT":11,"START TIME":"16:30:00.000000","END TIME":"17:30:00.000000","ISBOOKED":0,"CODE":null,"FLAT":null,"NAME":null},{"SLOT":12,"START TIME":"17:30:00.000000","END TIME":"18:30:00.000000","ISBOOKED":0,"CODE":null,"FLAT":null,"NAME":null},{"SLOT":13,"START TIME":"18:30:00.000000","END TIME":"19:30:00.000000","ISBOOKED":0,"CODE":null,"FLAT":null,"NAME":null},{"SLOT":14,"START TIME":"19:30:00.000000","END TIME":"20:30:00.000000","ISBOOKED":0,"CODE":null,"FLAT":null,"NAME":null},{"SLOT":15,"START TIME":"20:30:00.000000","END TIME":"21:30:00.000000","ISBOOKED":0,"CODE":null,"FLAT":null,"NAME":null}]
		//}
		this.saveIndex = "";
		//test
		//this.setState = "";
	}
	
	componentDidMount(){
		
		
		this.getslots();
		
		
	}
	
	getslots(){
		
		
		fetch("/getslots")
			.then(results => results.json())
			.then(results => this.setState({jsondata : results}))
			.catch(function(error) {
				toast.notify(<h6 class="red">There seems to be a problem with loading slots.Please try after sometime</h6>,{position:'top-right'});
				console.log(error);
				});
		
	}
	
	
	
	
	
	
	validate ( index ){
		var blk = "blockNo" + index.toString();	
		document.getElementById(blk).style.backgroundColor=' #f2d9f2';
		
		for(var i=0;i<=14;i++){
			if(i != index && this.state.jsondata[i].ISBOOKED != 1 ){
				var idd = "blockNo" + i.toString();
				document.getElementById(idd).style.backgroundColor='#85e085';
				
			}
			
		}
		this.saveIndex = index;
		alert(this.saveIndex);
	}
	
	sendBooking(){
		
		//var x = this.saveIndex;
    fetch(`/bookslots/?id=${this.saveIndex}`)
      .then(res => res.text())
	  .then( (res) => {
		  if(res == "success"){
			  $('body').addClass("blur");
			  this.setState({isloader : true});
			  toast.notify(<h6 class="green">Booking Done succesfully</h6>,{position:'top-right'});
			  
		      
			  setTimeout(() => {
					this.setState({isloader : false})
					  $('body').removeClass("blur");
					ReactDOM.render(<Book />, document.getElementById('court'));
					}, 3000);
			 
			  
		  }
		  else
			  alert("Failed")
		  
	  })
	  
	  .catch(function(error) {
		  toast.notify(<h6 class="red">There seems to be a problem with Booking slots.Please try after sometime</h6>,{position:'top-right'});
		  
	  });
  
		
	}
	
	render(){
		
		return(
		<div>
		<div class="container">
			<div class="jumbotron jumbo">
			<span class="dt"> Date : {date}</span><br/>
				{this.state.jsondata.map((data,index)=>
					<div id={"blockNo" + index} className={"block text-center " + (data.ISBOOKED ? 'avail' : 'booked')} onClick = {()=> this.validate(index)}>
						<span class="slot">SLOT {data.SLOT}</span>	
						<p class="st">START TIME</p>						
						<p class="st mg"><b>{data["STARTTIME"]}</b></p>
						<p class="et">END  TIME</p>	
						<p class="et"><b>{data["ENDTIME"]}</b></p>						
					</div>
				)
				}
				 
				 <img src={loader}  className={this.state.isloader ? 'show ld' : 'hide ld'} />
		   </div>
		  <button type="button" class="btn  btn-info btn-sm submitbtn"  onClick={() =>this.sendBooking()}>Book Court</button>
		  </div>
		 
				
		 </div>
		);
	}
	
}

export default BookCourt;