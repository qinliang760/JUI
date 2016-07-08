var React = require('react');
var ReactDOM = require('react-dom');

var ButtonComponent = React.createClass({
    render: function(){
        return (<div>1</div>);
    }
});

ReactDOM.render(<ButtonComponent/>, document.getElementById("aaa"));