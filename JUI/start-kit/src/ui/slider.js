var React = require('react');
var TimeLineLightBoxBar = require('./part1');
var TimeLineLightBoxImg = require('./part2');
var TimeLineLightBoxList = require('./part3');
var TimeLineLightBoxBtn = require('./part4');

//TimeLineBox
var TimeLineLightBox=React.createClass({
	getInitialState:function(){
		return {num:1}
	},		
	onChildChanged:function(v){
		this.setState({num:v});
	},
	render:function(){

		var style={
			bar:{
				background:"#f00"
			}
		}
		return (
			<div>
			<span style={style}>22112</span>		
			<TimeLineLightBoxBar list={this.props.list} num={this.state.num}/>
			<TimeLineLightBoxImg list={this.props.list} num={this.state.num}/>
			<TimeLineLightBoxList list={this.props.list} num={this.state.num} callbackParent={this.onChildChanged}/>
			<TimeLineLightBoxBtn list={this.props.list} num={this.state.num} callbackParent={this.onChildChanged}/>
			</div>
		);	
	}
})


module.exports = TimeLineLightBox;