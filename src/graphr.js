	/********************************************************************************

	Graphr.js: A JS library to create graphs of equations using HTML5 2D Canvas API
	Developed by Rohan Dhar

**********************************************************************************/


//  Main constructor to initialize the Graphr object with settings
function Graphr(settings, canvasElement){

	if(canvasElement){
		if(canvasElement.nodeName !== "CANVAS"){
			canvasElement = document.createElement("canvas");
			document.getElementsByTagName("BODY")[0].appendChild(canvasElement);
		}
	}else{
		canvasElement = document.createElement("canvas");
		document.getElementsByTagName("BODY")[0].appendChild(canvasElement);		
	}

	this.can = canvasElement;
	this.ctx = this.can.getContext("2d");

	settings = settings || {};

	this.can.height = settings.height || 250;
	this.can.width = settings.width || 500;
	this.gridColor = settings.gridColor || "#fff";
	this.backgroundColor = settings.backgroundColor || "#223";

	
	if(settings.grid === false){
		this.grid = false;
	}else{
		this.grid = true;
	}

	this.increment = 0.005;

	if((settings.rangeStart || settings.rangeStart === 0) && (settings.rangeEnd || settings.rangeEnd === 0)){
		if(settings.rangeStart < settings.rangeEnd){
			this.range = {
				start: settings.rangeStart,
				end: settings.rangeEnd,				
			};
		}else{
			console.warn("Incorrect values provided for rangeStart or rangeEnd for the Graphr constructor! Using the default values.");
			this.range = {
				start: -10,
				end: 10			
			};
		}
	}else{
		this.range = {
			start: -10,
			end: 10			
		};
	}

	this.equations = [];	
	this.scale = 0;

	this.lastPoint = {
		x: 0,
		y: 0
	};

	this.init();

}

//  Internal function  ::  to render the graph grid with the appropriate range//
Graphr.prototype.renderGrid = function(){

	this.ctx.strokeStyle = this.gridColor;
	this.ctx.globalAlpha = 0.1;
	for(var i = 0; i < this.range.end - this.range.start; i++){			
		this.ctx.beginPath();
		this.ctx.moveTo((this.range.start + i)*this.scale, this.can.height/2);
		this.ctx.lineTo((this.range.start + i)*this.scale, -this.can.height/2);
		this.ctx.stroke();
		this.ctx.closePath();
	}

	//To draw the x axis again, boldly//
	this.ctx.globalAlpha = 1;
	this.ctx.beginPath();
	this.ctx.moveTo(0, this.can.height/2);
	this.ctx.lineTo(0, -this.can.height/2);
	this.ctx.stroke();
	this.ctx.closePath();

	//Reset to opacity to draw horizontal lines//
	this.ctx.globalAlpha = 0.1;

	i = 0;

	//xStart and xEnd are variables so that their values aren't calculated everytime the loop runs//
	var y = 0, xStart = this.range.start * this.scale, xEnd = this.range.end * this.scale;

	while(y <= this.can.height/2){
		y = i * this.scale;
		this.ctx.beginPath();
		this.ctx.moveTo(xStart, y);
		this.ctx.lineTo(xEnd, y);
		this.ctx.stroke();
		this.ctx.closePath();
		
		//Drawing two grid lines at a time//
		this.ctx.beginPath();
		this.ctx.moveTo(xStart, -y);
		this.ctx.lineTo(xEnd, -y);
		this.ctx.stroke();
		this.ctx.closePath();
		i++;
	}
	
	//To draw the y axis again, boldly//
	this.ctx.globalAlpha = 1;
	this.ctx.beginPath();
	this.ctx.moveTo(xStart, 0);
	this.ctx.lineTo(xEnd, 0);
	this.ctx.stroke();
	this.ctx.closePath();

}


//  Internal function  :: to actually draw the graph
Graphr.prototype.render = function(id, color){

	//Setting the strokeStyle to the graphColor to render the graph//
	this.ctx.strokeStyle = this.equations[id][1];	

	this.lastPoint.x = this.range.start;
	this.lastPoint.y = this.equations[id][0](this.range.start);

	var that = this;

	for(var i = that.range.start; i < that.range.end; i += that.increment){
		
		var y = this.equations[id][0](i);	

		that.ctx.beginPath();
		that.ctx.moveTo(that.lastPoint.x * that.scale, -that.lastPoint.y * that.scale);
		that.ctx.lineTo(i * that.scale, -y * that.scale);
		that.ctx.stroke();
		that.ctx.closePath();

		that.lastPoint.x = i;
		that.lastPoint.y = y;		
		that.x += that.increment;
	}

}

//  Internal function  ::  to render ALL the equations again
Graphr.prototype.renderAll = function(){
	var that = this;
	for(i in that.equations){
		that.render(i);
	}
	
}

//  Internal function  ::  to set the internal variable values of the Graphr Object based on the provided range and Equations
Graphr.prototype.init = function(settings) {

	this.ctx.translate(0, 0);
	this.ctx.fillStyle = this.backgroundColor;
	this.ctx.fillRect(0, 0, this.can.width, this.can.height);			

	this.scale = this.can.width/(this.range.end - this.range.start);
	this.ctx.translate(-this.range.start * this.scale, this.can.height/2);

	if(this.grid){
		this.renderGrid();
	}
}

//  User's interface to add another graph to the Graphr
Graphr.prototype.addGraph = function(equation, color){

	color = color || "#ff5155";

	var typeHelper = {};
	if(equation && typeHelper.toString.call(equation) === '[object Function]'){
		var id = this.equations.push([equation, color]) - 1;
		this.render(id);
		return id;
	}else{
		console.warn("Graphr >> Incorrect equation function provided to Graphr.addGraph(). Can not draw the graph.")
		return false;
	}

}

//User's interface to update Graphr's dimensions
Graphr.prototype.changeDimensions = function(width, height){
	var that = this;

	if(width < 0 || (width !== 0 && !width)){
		width = that.can.width;
	}
	if(height < 0 || (height !== 0 && !height)){
		height = that.can.height;
	}

	this.can.width = width;
	this.can.height = height;

	this.init();
	this.renderAll();

	return true;

}

//  User's interface to remove the Graphr's grid
Graphr.prototype.removeGrid =  function(){

	this.grid = false;
	this.can.height = this.can.height;
	this.init();
	this.renderAll();
	return true;

}

//  User's interface to add the Graphr's grid
Graphr.prototype.addGrid =  function(){

	this.grid = true;
	this.can.height = this.can.height;
	this.init();
	this.renderAll();
	return true;

}

//  User's interface to change Graphr's backgroundColor
Graphr.prototype.changeBackgroundColor =  function(color){

	if(!color){
		return false;
	}

	this.backgroundColor = color;
	this.can.height = this.can.height;
	this.init();
	this.renderAll();
	return true;

}

//  User's interface to change Graphr's gridColor
Graphr.prototype.changeGridColor =  function(color){

	if(!color){
		return false;
	}

	this.gridColor = color;
	this.can.height = this.can.height;
	this.init();
	this.renderAll();
	return true;

}

//  User's interface to change Graphr's gridColor
Graphr.prototype.changeRange =  function(start, end){

	if((start || start === 0) && (end || end === 0)){
		if(start < end){
			this.range = {
				start: start,
				end: end,				
			};			
		}else{
			console.warn("Incorrect values provided for start or end for the Graphr.changeRange(). Using the default values.");
			return false;
		}
	}else{
		return false;
	}

	this.can.height = this.can.height;
	this.init();
	this.renderAll();
	return true;
}


Graphr.prototype.removeGraph = function(id){

	if(this.equations[id]){
		this.equations.splice(id, 1);
		this.can.height = this.can.height;
		this.init();
		this.renderAll();
		return true;
	}else{
		return false;
	}

};

Graphr.prototype.changeGraph = function(id, equation){

	if(this.equations[id]){
		var typeHelper = {};
		if(equation && typeHelper.toString.call(equation) === '[object Function]'){
			this.equations[id][0] = equation;
		}else{
			console.warn("Graphr >> Incorrect equation function provided to Graphr.changeGraph(). Can not draw the graph.")
			return false;
		}
		this.can.height = this.can.height;
		this.init();
		this.renderAll();
		return true;
	}else{
		return false;
	}

};

Graphr.prototype.changeGraphColor = function(id, color){

	if(!color){
		return false;
	}

	if(this.equations[id]){
		this.equations[id][1] = color;
		this.can.height = this.can.height;
		this.init();
		this.renderAll();
		return true;
	}else{
		return false;
	}
}