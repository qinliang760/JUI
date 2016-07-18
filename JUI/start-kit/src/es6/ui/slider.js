import React,{Component} from 'react';
var TimeLineLightBoxBar = require('./part1');
var TimeLineLightBoxImg = require('./part2');
var TimeLineLightBoxList = require('./part3');
var TimeLineLightBoxBtn = require('./part4');

//TimeLineBox
export default class TimeLineLightBox extends Component{
	constructor(){
		super();
		this.state={
			num:1
		}
	}	
	onChildChanged=(v)=>{
		this.setState({num:v});
	}	

	render(){

		var style={
			bar:{
				background:"#f00"
			}
		}
		return (
			<div>
			<span style={style.bar}>22112</span>			
			<TimeLineLightBoxBar list={this.props.list} num={this.state.num}/>
			<TimeLineLightBoxImg list={this.props.list} num={this.state.num}/>
			<TimeLineLightBoxList list={this.props.list} num={this.state.num} callbackParent={this.onChildChanged}/>
			<TimeLineLightBoxBtn list={this.props.list} num={this.state.num} callbackParent={this.onChildChanged}/>
			</div>
		);	
	}
}
