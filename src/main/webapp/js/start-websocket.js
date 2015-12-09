var React = require('react');
var moment = require('moment');
/*
  Stomp based Web sockets is setp by this program
*/
module.exports = React.createClass({
	getInitialState: function() {
		return {data: []};
	},	
	componentDidMount: function() {
		var socket = new SockJS('/weather');
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            this.stompClient.subscribe('/topic/weather', (response) => {                    
          		this.props.onData(JSON.parse(response.body).session, JSON.parse(response.body).measurements);          		
            });
        });
        setTimeout(() => {
        	var date = moment().format("YYYY-MM-DD");
        	this.stompClient.send("/app/weather", {}, JSON.stringify({ 'fromValue': date, 'toValue': date }));
        },1000);
        
	},
	componentWillUnmount: function() {
		if (this.stompClient != null) {
			this.stompClient.disconnect();
			console.log("Disconnected");
		}
	},
	render: function() {
		return (
			<div id="dummy"></div>
		);
	}
});