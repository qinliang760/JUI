var React = require('react');
var ReactDOM = require('react-dom');
//TimeLineBox


var TimeLineLightBoxList=React.createClass({
	handleClick:function(i){
		console.log(i);
		this.props.callbackParent(i+1)
	},
	render:function(){
		//var rows=[];
		
		return(
			<ul className="slide">
				{this.props.list.map(function(data,index) {
					return (<li onClick={this.handleClick.bind(this,index)} key={index}><a href="javascript:void(0)"><img src={data.thumb}/></a></li>)
				},this)}
			</ul>
		);
	}
})


module.exports = TimeLineLightBoxList;