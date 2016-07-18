var React = require('react');
var ReactDOM = require('react-dom');
//TimeLineBox



var TimeLineLightBoxImg=React.createClass({
	render:function(){
		var index=this.props.num-1;
		return(
			<div>
				<img src={this.props.list[index].large}/>
			</div>
		);
	}
})



module.exports = TimeLineLightBoxImg;