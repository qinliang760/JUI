var React = require('react');
var ReactDOM = require('react-dom');
//TimeLineBox

var TimeLineLightBoxBtn=React.createClass({
	getInitialState:function(){
		return {num:this.props.num}
	},	
	handlePrevClick:function(){
		var v=this.state.num;
		if(v==1){
			return false;
		}
		v--;
		this.setState({num:v});
		this.props.callbackParent(v);
	},
	handleNextClick:function(){
		var v=this.state.num;
		if(v==3){
			return false;
		}
		v++;
		this.setState({num:v});
		this.props.callbackParent(v);
	},	
	render:function(){
		return(
			<div>
			<a href="javascript:void(0)" onClick={this.handlePrevClick}>上一张</a>
			<a href="javascript:void(0)" onClick={this.handleNextClick}>下一张</a>
			</div>
		);
	}
})

module.exports = TimeLineLightBoxBtn;