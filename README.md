<h1> Graphr.js </h1>
<p>
	graphr.js is a easy to use graphing library to draw graphs of equations using JS Canvas API. It has <b>no dependencies</b>.
</p>

<h2>Usage</h2>
<p>
	All you need to do is include either the <code>graphr.js</code> file or the <code>graphr.min.js</code> and you are all set to draw graphs, beautfully. graphr.min.js is just the minified form of graphr.js. For development, it is advised to use graphr.js and for productions, graphr.min.js
</p>

<h2>API</h2>


<h3>The Constructor</h3>	
<b><code>new Graphr()</code></b>
<br>
Creates a new Graphr object with the settings provided.
<h4>Parameters</h4>
<code>new Graphr(settings, canvasElement)</code>
<ul>
	<li>
		<b><code>settings</code></b> - <i>object</i> - <i>optional</i>: An object passed to the contructor containing the settings for the Graphr object. The following properties of the <code>settings</code> can be provided to be used in the returned Graphr object.
		<br>
		<ol>
			<li><b><code>width</code></b>: An integer specifying the width of the graph. Default: 500</li>
			<li><b><code>height</code></b>: An integer specifying the height of the graph in pixels. Default: 250</li>
			<li><b><code>backgroundColor</code></b>: A string specifying the background color of the graph. The string can be any of the CSS colors, including HEX, RGB or color names like red, blue, pink etc. Default: "#223"</li>
			<li><b><code>grid</code></b>: A boolean value specifying if the graph has a grid. Default: true</li>
			<li><b><code>gridColor</code></b>: A string specifying the color of grid of the graph if the <code>grid</code> property is true. The string can be any of the CSS colors, including HEX, RGB or color names like red, blue, pink etc.  Default: "#fff"</li>
			<li><b><code>rangeStart</code></b>:  An integer specifying the starting point of the x axis of the graph. Default: -10</li>
			<li><b><code>rangeStart</code></b>: An integer specifying the ending point of the x axis of the graph. Default: 10</li>
			<br>
			<p>Any graph will be drawn between x = rangeStart and x = rangeEnd. rangeEnd must be larger than rangeStart.</p>
		</ol>
	</li>
	<li>
		<b><code>canvasElement</code></b> - <i>HTML Canvas Element</i> - <i>optional</i>: Graphr.js renders the graphs on a canvas elements which it creates on its own. If however, you want to provide your own canvas element on which Graphr.js must draw the graphs, you can do so by providing the canvas element itself as the second parameter. You may want to do this for several reasons like, adding your own CSS styling to the graph, for an example.
	</li>
</ul>

<b>Note</b>
<br>
The constructor <b>must</b> be called after the document is ready and loaded.
All the settings of the Graphr object can be modified later on (Refer to Modifying Graphr Settings).

<h4>Return Value</h4>
Returns a new Graphr object with the settings provided.

<h4>Example</h4>
<code>
	var graph = new Graphr({ 

		height: 400, 
	
		width: 400, 
	
		backgroundColor: "#222",
	
		gridColor: "#666",
	
		rangeStart: -5,
	
		rangeEnd: 5
	
	});
</code>

<br>


The above code will generate the following graph.
<br><br>
<img src="/readmeFiles/constructorExample.png" alt="Contructor output">

<h3>Adding Graphs</h3>

<p>
	The Graphr object can be thought of like a graph paper. You can add multiple graphs to it and they will be drawn onto the "graph paper" . The equations are added using the <code> .addGraph() </code> method.	
</p>

<h4>Parameters</h4>
<code>.addGraph(equation, graphColor)</code>

<ul>
	<li>
		<code><b> equation </b></code>	- <i>function</i> - <i>required</i>: The equation of the graph to be drawn. The equation is a function which receives a number as a parameter and should return a number.
	</li>
	<li>
		<code><b> graphColor </b></code>	- <i>string</i> - <i>optional</i>: A string specifying the color of the graph to be drawn. The string can be any of the CSS colors, including HEX, RGB or color names like red, blue, pink etc. Default: "#ff5155"</li>
	</li>
</ul>

<b>Note</b>
<br>
Several graphs can be added to a single Graphr object. They can even be modified later on (Refer to Modifying Existing Graphs).

<h4>Return Value</h4>
Returns a number specifying the id of the graph. It is a good to store the returned id for it is used to make any changes to the graph drawn later (Refer to Modifying Existing Graphs).

<h4>Example</h4>
<code>
	var graph = new Graphr({ 

		height: 400, 
	
		width: 400, 
	
		backgroundColor: "#222",
	
		gridColor: "#666",
	
		rangeStart: -3,
	
		rangeEnd: 3
	
	});
	
	graph.addGraph(function(x){return x * x;}, "#2ecc81");
	
	graph.addGraph(function(x){return Math.sin(x);}, "#ff5155");

</code>

<br>


The above code will generate the following graph.
<br><br>
<img src="/readmeFiles/addGraphExample.png" alt=".addGraph() output">
