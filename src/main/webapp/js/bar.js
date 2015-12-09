var React = require('react');
var moment = require('moment');
/*
  HighCharts Simple Column Bar element
*/
module.exports = React.createClass({    
    getInitialState: function() {
        var options = {
            chart: {
                renderTo: 'barChart',
                type: 'column'
            },
            title: {
                text: 'Daily Precipitation'
            },
            subtitle: {
                text: 'Source: SimpleWeather'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Precipitation (%)'
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Stoughton',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
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
            if (days == 0){
                data.forEach((item,index,array) => {
                    options.xAxis.categories.push(item.hour);
                    options.series[0].data.push(parseFloat(item.precipitation));        
                });
                options.title.text = 'Daily Average Precipitation';   
            }else if (days == 28 || days == 29 || days == 30 || days == 27){
                data.forEach((item,index,array) => {                    
                    options.series[0].data.push(parseFloat(item.precipitation));        
                    options.xAxis.categories.push(index+1);
                });
                options.title.text = 'Monthly Average Precipitation'; 
            }else if (days == 6){
                data.forEach((item,index,array) => {                    
                    options.series[0].data.push(parseFloat(item.precipitation));                            
                });
                options.xAxis.categories = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
                options.title.text = 'Weekly Average Precipitation';  
            }else if (days > 31){
                data.forEach((item,index,array) => {                    
                    options.series[0].data.push(parseFloat(item.precipitation));                            
                });
                options.xAxis.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                options.title.text = 'Yearly Average Precipitation';  
            }else {
                data.forEach((item,index,array) => {
                    options.xAxis.categories.push(item.hour);
                    options.series[0].data.push(parseFloat(item.precipitation));        
                });
                options.title.text = 'Average Precipitation'; 
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
            <div id='barChart' style={divStyle} ></div>
        );
    }	  	   
});