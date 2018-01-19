// this is the code which will be injected into a given page...
var observer;
var replay_button = document.getElementById("ce-repeat");
(function() {
	// console.log("added button");
	
	if (!replay_button) {
		replay_button = document.createElement("button");
		replay_button.className = "ytp-button";
		replay_button.id = "ce-repeat";

		var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
		svg.style.width = "100%";
		svg.style.height = "100%";

		var shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");

		shape.setAttributeNS(null, "cx", "50%");
		shape.setAttributeNS(null, "cy", "50%");
		shape.setAttributeNS(null, "r",  "25%");
		shape.setAttributeNS(null, "stroke", "white");
		shape.setAttributeNS(null, "stroke-width", "4");
		shape.setAttributeNS(null, "fill-opacity", "0");

		svg.appendChild(shape);
		replay_button.appendChild(svg);

		replay_button.addEventListener("click", function() {
			var color;
			if (observer) {
				// console.log("removed observer");
				observer.disconnect();
				observer = null;

				color = "white";
			} else {
				// console.log("added observer");
				var play_button = document.getElementsByClassName("ytp-play-button ytp-button")[0];
				observer = new MutationObserver(function() {
					// console.log("callback");
					if (play_button.getAttribute("title") === "Replay") play_button.click();
				});
				observer.observe(play_button, {attributes: true});

				color = "red";
			}
			shape.setAttributeNS(null, "stroke", color);
		});

		var right = document.getElementsByClassName("ytp-right-controls")[0];
		right.appendChild(replay_button);
	}

})();
