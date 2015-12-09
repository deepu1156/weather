var React = require('react');
var moment = require('moment');
/*
  DHTMLX Calendar element
*/
module.exports = React.createClass({
	getInitialState: function() {
    	return {date: ''};
  },
  componentDidMount: function() {
  		var calendar = new dhtmlXCalendarObject("calendar");
  		calendar.attachEvent("onChange",(date,state) => {
        var dateStr = moment(date).format("YYYY-MM-DD");   			
        this.setState({date: dateStr});
    		this.props.onCalendarChange({date: dateStr});		
  		});
  		calendar.attachEvent("onClick",(date) => {  
        var dateStr = moment(date).format("YYYY-MM-DD");        			
        this.setState({date: dateStr});
    		this.props.onCalendarChange({date: dateStr});		
  		});
  },
	render: function() {		
		return (
			<div className="myCalendar">
				Calendar: <input type="text" id="calendar" ></input>				
			</div>
		);
	}
});