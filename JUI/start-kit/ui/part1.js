var React = require('react');
var ReactDOM = require('react-dom');

var TimeLineLightBoxBar=React.createClass({
	render:function(){
		var index=this.props.num-1;
		return(
			<span>{this.props.num}{this.props.list[index].title}</span>
		);
	}
})



module.exports = TimeLineLightBoxBar;