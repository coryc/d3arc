/**
 * Arc Progress v0.1
 * @author Cory Caines <cory@kreatednine.com> 
 */


var ArcProgress = function(obj) {

	var self = this;
	var obj = d3.select(obj);

	var pi = Math.PI;
	var t = 2 * Math.PI;

	var duration = 750;

	var diameter = 100,
		thickness = 10,
		percentage = 0;


	var svg, track, prog, arcProg, arcTrack;

	this.setDiameter = function(_diameter) {
		diameter = _diameter;
		return self;
	}

	this.setThickness = function(_thickness) {
		thickness = _thickness;
		return self;
	}

	this.setPercentage = function(_percentage) {
		percentage = _percentage;

		var deg = 360 * (percentage/100);
		var rad = (deg * (pi/180));
		
		prog.transition()
        	.duration(duration)
        	.call(_arcTween, rad);

		return self;
	}

	this.render = function() {

		svg = obj.append('svg')
				 .attr('class','arc-prog-svg')
			     .attr('width', diameter)
			     .attr('height', diameter);
        
		arcTrack = d3.svg.arc()
		   	 	     .outerRadius(diameter/2)
		     	     .innerRadius(diameter/2 - thickness)
		     	     .startAngle(0)
		     	     .endAngle(360 * (pi/180));

		arcProg = d3.svg.arc()
					.outerRadius(diameter/2)
			    	.innerRadius(diameter/2 - thickness)
			    	.startAngle(0);	

        // Background RECT
        /*
        var bg = svg.append('g')
        			.attr('class', 'component')
                	.attr('cursor', 'pointer');

		bg.append('rect')
		  .attr('class','background')
          .attr('width', diameter)
          .attr('height', diameter);
		*/

		track = svg.append('path')
          		   .attr('fill', 'lightgrey')
          		   .attr('class', 'arc-prog-track')
          		   .attr('d', arcTrack)
          		   .attr('transform', 'translate(' + (diameter / 2) + ', ' + (diameter/2) + ')');

        prog = svg.append('path')
				  .datum({endAngle: 0})
                  .attr("fill", "orange")
                  .attr('class', 'arc-prog-path')
                  .attr('d', arcProg)
           		  .attr('transform', 'translate(' + (diameter / 2) + ', ' + (diameter/2) + ')');

		return self;
	}


	var _arcTween = function(transition, newAngle) {

		transition.attrTween("d", function(d) {
			var interpolate = d3.interpolate(d.endAngle, newAngle);
			return function(t) {
				d.endAngle = interpolate(t);
				/* console.log(Math.round(((d.endAngle/ (pi/180)) / 360)*100) + '%'); */
	
				return arcProg(d);
			};
		});

	}
}