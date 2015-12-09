var React = require('react');
var ReactDOM = require('react-dom');
var NavBar = require('./nav-bar.js');
var WebSocket = require('./start-websocket.js');
var Calendar = require('./calendar.js');
var Tree = require('./tree.js');
var Graph = require('./graph.js');
var Bar = require('./bar.js');
var Guage = require('./guage.js');
var moment = require('moment');

/*
  Entry point for the front end code. Main Body acts as parent and all other interactive components are declared as its children.
  This way, it is easier for the React JS components to communicate
*/
var Weather = React.createClass ({
  render: function() {
    return(
      <div>
        <NavBar />
        <MainBody />        
      </div>      
    );
  }
});
var MainBody = React.createClass({  
  getInitialState: function() {
      var date = moment().format("YYYY-MM-DD");      
      return {start: date, end: date, data: [], session: '', baseUrl: '/getWeather?', color: 'default'};
  },
  handleDataArrival: function(session, data) {    
    this.setState({data: data, session: session});
  },
  handleCalendarChange: function(message) {
    var date = moment(message.date).format("YYYY-MM-DD");    
    this.setState({start: date, end: date});
    var url = this.state.baseUrl + 'start=' + date + '&end=' + date + '&session=' + this.state.session;
    this.loadDataFromServer(url);
  },
  handleTreeChange: function(start,end) {
    this.setState({start: start, end: end});
    var url = this.state.baseUrl + 'start=' + start + '&end=' + end + '&session=' + this.state.session;
    this.loadDataFromServer(url)    
  },
  handleDaily: function() {
    var date = moment().format("YYYY-MM-DD");      
    this.setState({start: date, end: date});
    var url = this.state.baseUrl + 'start=' + date + '&end=' + date + '&session=' + this.state.session;
    this.loadDataFromServer(url);
  },
  handleMonthly: function() {
    var end = moment().format("YYYY-MM-DD");      
    var start = moment().subtract(30,'days').format("YYYY-MM-DD");
    this.setState({start: start, end: end});
    var url = this.state.baseUrl + 'start=' + start + '&end=' + end + '&session=' + this.state.session;
    this.loadDataFromServer(url);
  },
  handleYearly: function() {
    var end = moment().format("YYYY-MM-DD");      
    var start = moment().subtract(365,'days').format("YYYY-MM-DD");
    this.setState({start: start, end: end});
    var url = this.state.baseUrl + 'start=' + start + '&end=' + end + '&session=' + this.state.session;
    this.loadDataFromServer(url);
  },
  handleBlack: function() {
    this.setState({color: 'black'});
  },
  handleYellow: function() {
    this.setState({color: 'yellow'});
  },
  handleDefault: function() {
    this.setState({color: 'default'});
  },
  loadDataFromServer: function(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return(
      <div className="container-fluid">
        <div className="row col-lg-12">          
          <div className="row">
            <div className="col-lg-2">
              <Calendar onCalendarChange={this.handleCalendarChange} />
            </div>    
            <div className="col-lg-2"></div>        
            <div className="col-lg-2">
              <div className="btn-group first-group">
                <button type="button" className="btn btn-default" onClick={this.handleDaily} >Daily</button>
                <button type="button" className="btn btn-default" onClick={this.handleMonthly} >Monthly</button>
                <button type="button" className="btn btn-default" onClick={this.handleYearly} >Yearly</button>
              </div>
            </div>            
            <div className="col-lg-3"></div>
            <div className="col-lg-2">
              <div className="btn-group second-group">
                <button type="button" className="btn btn-default" onClick={this.handleBlack}>Black</button>
                <button type="button" className="btn btn-default" onClick={this.handleYellow}>Yellow</button>
                <button type="button" className="btn btn-default" onClick={this.handleDefault}>Default</button>
              </div>
            </div>            
          </div>
          <div className="row dummy-line"></div>
          <div className="row">
            <div className="col-lg-2">
              <Tree onTreeChange={this.handleTreeChange} />
            </div>
            <div className="row col-lg-10">
              <div className="col-lg-6">
                <Graph data={this.state.data} start={this.state.start} end={this.state.end} color={this.state.color} />
              </div>            
              <div className="col-lg-6">
                <Bar data={this.state.data} start={this.state.start} end={this.state.end} color={this.state.color} />
              </div>
            </div>
            <div className="row col-lg-10 pull-right">
              <div className="col-lg-6">
                <Guage uniq='temperatureGuage' data={this.state.data} title='Average Temperature' symbol='(°F)' />
              </div>            
              <div className="col-lg-6">
                <Guage uniq='precipitationGuage' data={this.state.data} title='Average Precipitation' symbol='(%)' />
              </div>
            </div>                        
          </div>          
        </div> 
        <WebSocket onData={this.handleDataArrival} />       
      </div>
    );
  }
});

ReactDOM.render(
  <Weather />,
  document.getElementById('weather-main')
);
