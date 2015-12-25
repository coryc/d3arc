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
		percentage = 0,
		value = 0,
		decimals = 0,
		range = {min:0, max:100};

	var svg, track, prog, arcProg, arcTrack;

	var percentLabel,
		valueLabel;

	var _onValueUpdated;
	var _onPercentUpdated;

	this.setDiameter = function(_diameter) {
		diameter = _diameter;
		return self;
	}

	this.setThickness = function(_thickness) {
		thickness = _thickness;
		return self;
	}

	this.setDecimals = function(_decimals) {
		decimals = _decimals;
		return self;
	}

	this.setRange = function(_min, _max) {
		range = {min: _min, max: _max}
		return self;
	}

	this.setPercentLabel = function(_label){
		percentLabel = _label;
		return self;
	}

	this.setValueLabel = function(_label){
		valueLabel = _label;
		return self;
	}

	this.setValue = function(_value) {
		if (_value < range.min && _value > range.max) return self;

		value = _value;

		_range = range.max - range.min;
		_percent = ((_value - range.min) / _range) * 100;

		self.setPercentage(_percent);

		return self;
	}

	this.onValueUpdated = function(cb){
		if (arguments.length == 1)
        	_onValueUpdated = cb;

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


	this._valueUpdated = function(value) {
		if (typeof _onValueUpdated == "function") {
            _onValueUpdated.apply(self, [value]);
        }

        if (valueLabel != null) {
        	valueLabel.innerHTML = value.toFixed(decimals);
        }
	}

	this._percentUpdated = function(percent){
		if (typeof _onPercentUpdated == "function") {
            _onPercentUpdated.apply(self, [percent]);
        }

        if (percentLabel != null) {
        	percentLabel.innerHTML = percent.toFixed(decimals) + '%';
        }
	}

	var _arcTween = function(transition, newAngle) {

		transition.attrTween("d", function(d) {
			var interpolate = d3.interpolate(d.endAngle, newAngle);
			return function(t) {
				d.endAngle = interpolate(t);

				var percent = (((d.endAngle/ (pi/180)) / 360)*100);

				var _r = range.max - range.min;
				var value = (_r * (percent/100)) + range.min;

				self._valueUpdated(value);
				self._percentUpdated(percent);

				return arcProg(d);
			};
		});

	}
}