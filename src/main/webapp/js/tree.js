var React = require('react');
var moment = require('moment');
/*
  DHTMLX Tree component. This is used to display dates in collapsible tree format
*/
module.exports = React.createClass({
	getInitialState: function() {
    	return {start: '', end: ''};
  },  	
  componentDidMount: function() {
  	var tree = new dhtmlXTreeObject({
      parent: "treebox_tree",
      skin: "dhx_skyblue",
      checkbox: false,
      image_path: "./dhtmlxSuite/skins/web/imgs/dhxtree_web/"      
     });  		
    /*
      Custom logic is used to populate calendar in tree format and to identify the week/month/year when the node is clicked.
      Month nodes = 2+5n where n = 0 to 11
      Week nodes are always next to the parent month and month node is used in conjunction with week to identify the start and end dates
    */
    tree.deleteChildItems(0);    
    tree.insertNewChild(0,1,"2015");    
    tree.insertNewChild(1,2,"January");
    tree.insertNewChild(1,7,"February");
    tree.insertNewChild(1,12,"March");
    tree.insertNewChild(1,17,"April");
    tree.insertNewChild(1,22,"May");
    tree.insertNewChild(1,27,"June");
    tree.insertNewChild(1,32,"July");
    tree.insertNewChild(1,37,"August");
    tree.insertNewChild(1,42,"September");
    tree.insertNewChild(1,47,"October");
    tree.insertNewChild(1,52,"November");
    tree.insertNewChild(1,57,"December");
    tree.openOnItemAdding(false);
    for (var i=2; i<=57; i=i+5) {
      tree.insertNewChild(i,i+1,"Week-1");
      tree.insertNewChild(i,i+2,"Week-2");
      tree.insertNewChild(i,i+3,"Week-3");
      tree.insertNewChild(i,i+4,"Week-4");      
    }
    tree.openOnItemAdding(true);
    tree.setOnClickHandler((id) => {
      var start, end, month, parent, week, day;
      var text = tree.getItemText(id);
      if (text.includes('Week')) {
        parent = tree.getParentId(id);
        month = ((parent - 2)/5) + 1;
        week = id - parent;
        day = (week-1)*7+1;
        start = moment({year: 2015, month: month-1, day: day}).format("YYYY-MM-DD");
        end = moment({year: 2015, month: month-1, day: day+6}).format("YYYY-MM-DD");
      } else if (text.includes('2015')) {
        start = moment({year: 2015, month: 0, day: 1}).format("YYYY-MM-DD");
        end = moment({year: 2015, month: 11, day: 31}).format("YYYY-MM-DD");
      } else {
        month = ((id - 2)/5) + 1;
        start = moment({year: 2015, month: month-1, day: 1}).format("YYYY-MM-DD");
        end = moment({year: 2015, month: month-1, day: 28}).format("YYYY-MM-DD");        
      }
      this.props.onTreeChange(start,end);
    });
  },
	render: function() {		
		return (
			<div id="treebox_tree"></div>
		);
	}
});