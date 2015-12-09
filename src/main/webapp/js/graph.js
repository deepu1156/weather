	var React = require('react');
	var moment = require('moment');
	/*
  	Highcharts Simple Line Chart
	*/
	module.exports = React.createClass({  
		getInitialState: function() {
			var options = {
		  		chart: {
					renderTo: 'lineChart',
					type: 'line'
				},
				title: {
					text: 'Monthly Average Temperature'
				},
				subtitle: {
					text: 'Source: SimpleWeather'
				},
				xAxis: {
					categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
				},
				yAxis: {
					title: {
						text: 'Temperature (°F)'
					}
				},
				plotOptions: {
					line: {
						dataLabels: {
							enabled: true
						},
						enableMouseTracking: false
					}
				},
				series: [{
					name: 'Stoughton',
					data: [7.0, 6.9, 30, 14.5, 18.4, 21.5, 120, 26.5, 23.3, 18.3, 13.9, 9.6]
				}]
			};
			return {data: [], options: options, chart: {}};
	  	},
	  	handleDataArrival: function(data,start,end,color) {
			if (data.length > 0) {
		  		this.setState({data: data});
		  		var options = this.state.options;
		  		options.series[0].data = [];
		  		options.xAxis.categories = [];      		  		
		  		var days = moment(end).diff(moment(start),'days');
		  		console.log('Days: ' + days);
		  		if (days == 0){
                	data.forEach((item,index,array) => {
                    	options.xAxis.categories.push(item.hour);
                    	options.series[0].data.push(parseFloat(item.temperature));        
                	});
                	options.title.text = 'Daily Average Temperature';   
            	}else if (days == 28 || days == 29 || days == 30 || days == 27){
                	data.forEach((item,index,array) => {                    
                    	options.series[0].data.push(parseFloat(item.temperature));        
                    	options.xAxis.categories.push(index+1);
                	});
                	options.title.text = 'Monthly Average Temperature'; 
            	}else if (days == 6){
                	data.forEach((item,index,array) => {                    
                    	options.series[0].data.push(parseFloat(item.temperature));                            	
                	});
                	options.xAxis.categories = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
                	options.title.text = 'Weekly Average Temperature';  
            	}else if (days > 31){
            		data.forEach((item,index,array) => {                    
                    	options.series[0].data.push(parseFloat(item.temperature));                            	
                	});
                	options.xAxis.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                	options.title.text = 'Yearly Average Temperature';  
            	}else {
                	data.forEach((item,index,array) => {
                    	options.xAxis.categories.push(item.hour);
                    	options.series[0].data.push(parseFloat(item.temperature));        
                	});
                	options.title.text = 'Average Temperature';
            	}
            	if (color == 'black') {
            		options.chart.backgroundColor = 'black';
            	}
            	if (color == 'default') {
            		options.chart.backgroundColor = null;
            	}
            	if (color == 'yellow') {
            		options.chart.backgroundColor = 'yellow';
            	}
		  		var chart = new Highcharts.Chart(options);                    
		  		this.setState({chart: chart, options: options});
			}    
	  	},  
	  	componentWillReceiveProps: function(props) {        
			this.handleDataArrival(props.data,props.start,props.end,props.color);    
	  	},  
	  	componentDidMount: function() {       
	  		var chart = new Highcharts.Chart(this.state.options);
	  		this.setState({chart: chart});
			this.handleDataArrival(this.props.data,this.props.start,this.props.end);
	  	},
		render: function() {	
			var divStyle = {				
				height: '350px'
			};		
			return (      
				<div id='lineChart' style={divStyle} ></div>
			);
		}
	});