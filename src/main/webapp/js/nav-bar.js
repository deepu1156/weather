var React = require('react');
/*
	Nav Bar Header component. Built on base of bootstrap css elements
*/
module.exports = React.createClass({
	getInitialState: function() {
		return {poll: 300};
	},
	postData: function(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log("Successful");
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handlePollChange: function(e) {
  	this.setState({poll: e.target.value});
  },
  handleSubmit: function(e) {
  	e.preventDefault();
  	var poll = this.state.poll;
  	var url = '/updateInterval?poll=' + poll;
  	this.postData(url); 
  },
	render: function() {
		return (
			<nav className="navbar navbar-cvs">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
								aria-expanded="false">
							<span className="sr-only">Toggle navigation</span> 
							<span className="icon-bar"></span> <span className="icon-bar"></span> 
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="#"> <img alt="brand" src="./img/weather_logo.png"></img></a>
					</div>
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav navbar-font-large">							
							<li className="header-title">Simple Weather Application</li>							
							<li>
								<form className="navbar-form header-form" onSubmit={this.handleSubmit}>
									<div className="form-group">
										Push Interval: 
										<input type="number" placeholder="300000" value={this.state.poll} min="10" max="3600" className="form-control" 
												onChange={this.handlePollChange}></input> s
									</div>
									<button type="submit" className="btn btn-default header-btn">Update</button>
								</form>
							</li>
						</ul>
						<ul className="nav navbar-nav navbar-right navbar-font-xlarge">
							<li>
								<a href="#">
									<span className="glyphicon glyphicon-question-sign" aria-hidden="true"
											data-toggle="tooltip" data-placement="bottom" title="Help">
									</span>
								</a>
							</li>
							<li>
								<a href="#/messages">
									<span className="glyphicon glyphicon-envelope"	aria-hidden="true" data-toggle="tooltip" 
											data-placement="bottom"	title="Messages"></span>
								</a>
							</li>
							<li className="dropdown">
								<a href="#" className="dropdown-toggle"	data-toggle="dropdown" role="button" aria-haspopup="true"
									aria-expanded="false"> 
									<span className="glyphicon glyphicon-user" aria-hidden="true"></span> 
									<span className="caret"></span>
								</a>
								<ul className="dropdown-menu">
									<li><a href="#">Welcome Sandeep Kanumuru</a></li>
									<li><a href="#">Profile</a></li>
								</ul>
							</li>
							<li>
								<a href="#">
									<span className="glyphicon glyphicon-off" aria-hidden="true" data-toggle="tooltip" data-placement="bottom"
											title="Logout">
									</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
});