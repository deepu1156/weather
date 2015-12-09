	var React = require('react');

	module.exports = React.createClass({  
		getInitialState: function() {
			var title = this.props.title;
			var symbol = this.props.symbol;
			var uniq = this.props.uniq;

			var options = {
		  		chart: {
					renderTo: uniq,
					type: 'solidgauge'
				},
				title: null,
				pane: {
            		center: ['50%', '85%'],
            		size: '140%',
            		startAngle: -90,
            		endAngle: 90,
            		background: {
                		backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                		innerRadius: '60%',
                		outerRadius: '100%',
                		shape: 'arc'
            		}
        		},				
        		tooltip: {
            		enabled: false
        		},
				yAxis: {
					min: 1,
					max: 100,					
            		stops: [
                		[0.1, '#55BF3B'], // green
                		[0.5, '#DDDF0D'], // yellow
                		[0.9, '#DF5353'] // red
            		],
            		lineWidth: 0,
            		minorTickInterval: null,
            		tickPixelInterval: 400,
            		tickWidth: 0,
            		title: {                		
                		text: title,
                		y: -110
            		},
            		labels: {
                		y: 16
            		}
        		},
        		credits: {
            		enabled: false
        		},
				plotOptions: {
            		solidgauge: {
                		dataLabels: {
                    		y: 5,
                    		borderWidth: 0,
                    		useHTML: true
                		}
            		}
        		},
        		series: [{
            		name: title,
            		data: [80],
            		dataLabels: {            			
                		format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    			((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                       			'<span style="font-size:12px;color:silver">' + symbol + '</span></div>'
            			},
            			tooltip: {
                		valueSuffix: symbol
            		}
        		}]				
			};
			return {data: [], options: options, chart: {}, uniq: uniq};
	  	},
	  	handleDataArrival: function(data) {
			if (data.length > 0) {
		  		this.setState({data: data});
		  		var options = this.state.options;		  		
		  		var sum =0;
		  		data.forEach((item,index,array) => {
		  			if (this.state.uniq == 'temperatureGuage'){
		  				sum = sum + item.temperature*100;	
		  			}
					else {
						sum = sum + item.precipitation*100;
					}
		  		});		  		
		  		options.series[0].data = [Math.round(sum/(data.length*100))];		  		
		  		var chart = new Highcharts.Chart(options);                    
		  		this.setState({chart: chart, options: options});
			}    
	  	},  
	  	componentWillReceiveProps: function(props) {        
			this.handleDataArrival(props.data);    
	  	},  
	  	componentDidMount: function() {       
	  		var chart = new Highcharts.Chart(this.state.options);
	  		this.setState({chart: chart});
			this.handleDataArrival(this.props.data);			
	  	},
		render: function() {
			var divStyle = {				
				height: '300px'
			};			
			return (      
				<div id={this.props.uniq} style={divStyle} ></div>
			);
		}
	});