/**
 * Arc Progress v0.1
 * @author Cory Caines <cory@kreatednine.com> 
 */


var ArcProgress = function(obj) {

	

}

/*
var vis = d3.select(".radial").append("svg")
var pi = Math.PI;
var t = 2 * Math.PI;

var width = 200,
		height = 200,
		thickness = 10;
 
var arc = d3.svg.arc()
    .outerRadius(200/2)
    .innerRadius(200/2 - thickness)
    //.startAngle(90 * (pi/180)) //converting from degs to radians
    .startAngle(0)
    //.endAngle(0 * (pi/180)) //just radians
    
var arc2 = d3.svg.arc()
		.outerRadius(200/2)
    .innerRadius(200/2 - thickness)
    .startAngle(0)
    .endAngle(360 * (pi/180)) //just radians
    
vis.attr("width", width).attr("height", height);

var base = vis.append("path")
							.attr('d', arc2)
              .attr('fill', 'lightgrey')
              .attr("transform", "translate("+(width/2)+","+(height/2)+")");

var path = vis.append("path")
							.datum({endAngle: 0})
    					.attr("d", arc)
              .attr("fill", "orange")
              .attr("transform", "translate("+(width/2)+","+(height/2)+")");

function arcTween(transition, newAngle) {

	transition.attrTween("d", function(d) {
    var interpolate = d3.interpolate(d.endAngle, newAngle);
    return function(t) {
      d.endAngle = interpolate(t);
      console.log(Math.round(((d.endAngle/ (pi/180)) / 360)*100) + '%');
      
      return arc(d);
    };
  });

}

setInterval(function() {
  path.transition()
      .duration(750)
      .call(arcTween, Math.random() * t);
}, 1500);


*/