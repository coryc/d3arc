/**
 * Arc Progress v0.1
 * @author Cory Caines <cory@kreatednine.com> 
 */


var ArcProgress = function(obj) {

	var self = this;
	var obj = d3.select(obj);

	var pi = Math.PI;

	var duration = 750;

	var diameter = 100,
		thickness = 10,
		percentage = 0;


	var svg, track, prog, arcProg, arcTrack;

	var label;

	var _onPercentUpdated;


	this.setDiameter = function(_diameter) {
		diameter = _diameter;
		return self;
	}

	this.setThickness = function(_thickness) {
		thickness = _thickness;
		return self;
	}

	this.setLabel = function(_label){
		label = _label;
		return self;
	}

	this.setPercentage = function(_percentage) {
		if (percentage == _percentage) return self;

		percentage = _percentage;

		if (percentage > 100) percentage == 100;

		var deg = 360 * (percentage/100);
		var rad = (deg * (pi/180));
		
		prog.transition()
        	.duration(duration)
        	.call(_arcTween, rad);

		return self;
	}

	this.onPercentUpdated = function(cb){
		if (arguments.length == 1)
        	_onPercentUpdated = cb;

        return self;
	}



	this.render = function() {

		svg = obj.append('svg')
				 .attr('class','arc-svg')
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


		track = svg.append('path')
          		   .attr('fill', 'lightgrey')
          		   .attr('class', 'arc-track')
          		   .attr('d', arcTrack)
          		   .attr('transform', 'translate(' + (diameter / 2) + ', ' + (diameter/2) + ')');

        prog = svg.append('path')
				  .datum({endAngle: 0})
                  .attr("fill", "black")
                  .attr('class', 'arc-prog')
                  .attr('d', arcProg)
           		  .attr('transform', 'translate(' + (diameter / 2) + ', ' + (diameter/2) + ')');

		return self;
	}


	this._percentUpdated = function(percent){
		if (typeof _onPercentUpdated == "function") {
            _onPercentUpdated.apply(self, [percent]);
        }

        if (label != null) {
        	label.innerHTML = Math.round(percent) + '%';
        }
	}

	var _arcTween = function(transition, newAngle) {

		transition.attrTween("d", function(d) {
			var interpolate = d3.interpolate(d.endAngle, newAngle);
			return function(t) {
				d.endAngle = interpolate(t);

				var percent = (((d.endAngle/ (pi/180)) / 360)*100);

				self._percentUpdated(percent);

				return arcProg(d);
			};
		});

	}
}