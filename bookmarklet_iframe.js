/*
 * ========================================================================
 * bookmarklet_iframe.js : v0.0.1
 * 
 * ========================================================================
 * Copyright 2014 
 * Author: Gene Arnold 
 *
 * https://github.com/GeneArnold/Bookmarklet-Examples
 *
 * Unless you have purchased a commercial license agreement from Jaspersoft Inc., the following license terms apply:
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the 
 * GNU Affero General Public License as published by the Free Software Foundation, either version 3 
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public 
 * License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License 
 * along with this program. If not, see http://www.gnu.org/licenses/.
 * ======================================================================== 
 *
 * Code for bookmarklet:
 * javascript:(function(){if(window.myBookmarklet!==undefined){myBookmarklet();}else{document.body.appendChild(document.createElement('script')).src='http://localhost/~HomeBase/bookmarklets/bookmarklet_iframe.js?';}})();
 *
 * The report for this example can be found here
 * https://github.com/GeneArnold/Github-Reports
 */

(function(){

	// the minimum version of jQuery we want
	var v = "1.3.2";
	var jq;
		
	// check for jQuery. if it exists, verify it's not too old.
	if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
		var done = false;
		var script = document.createElement("script");
		script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				initMyBookmarklet();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	} else {
		initMyBookmarklet();
	}
	
	function initMyBookmarklet() {
		var jq = window.jQuery.noConflict();
		(window.myBookmarklet = function() {
			function getSelText() {
				var s = '';
				if (window.getSelection) {
					s = window.getSelection();
				} else if (document.getSelection) {
					s = document.getSelection();
				} else if (document.selection) {
					s = document.selection.createRange().text;
				}
				return s;
			}
			if (jq("#theFrame").length == 0) {
				var s = "";
				s = getSelText();
				if (s == "") {
					var s = prompt("Forget?");
				}
				if ((s != "") && (s != null)) {
					//alert(s);
					jq("body").append("\
					<div id='theFrame'>\
						<div id='theFrame_veil' style=''>\
							<p style='position: fixed; top: 60%; left: 40%;'>Loading...</p>\
						</div>\
						<iframe style='background-color:white' scrolling='no' src='http://localhost:8080/jasperserver-pro/flow.html?_flowId=viewReportFlow&j_username=jasperadmin&j_password=jasperadmin&reportUnit=/public/Samples/Reports/ProductDetails&parProductId=" + s + "&viewAsDashboardFrame=true' onload=\"window.jQuery('#theFrame iframe').slideDown(500);\">Enable iFrames.</iframe>\
						<style type='text/css'>\
							#theFrame_veil { display: none; position: fixed; width: 100%; height: 100%; top: 0; left: 0; background-color: rgba(255,255,255,.6); cursor: pointer; z-index: 900; }\
							#theFrame_veil p { color: black; font: normal normal bold 20px/20px Helvetica, sans-serif; position: absolute; top: 50%; left: 50%; width: 10em; margin: -10px auto 0 -5em; text-align: center; }\
							#theFrame iframe { display: none; position: fixed; top: 25%; left: 35%; width: 300px; height: 400px; z-index: 999; border: 5px solid rgba(0,0,0,.5); margin: 0 0 0 0; }\
						</style>\
					</div>");
					jq("#theFrame_veil").fadeIn(750);
				}
			} else {
				jq("#theFrame_veil").fadeOut(750);
				jq("#theFrame iframe").slideUp(500);
				var elem = document.getElementById("theFrame");
				//elem.remove();
				//setTimeout("jq('#theFrame').remove()", 750);
				setTimeout(elem.remove(), 750);
			}
			jq("#theFrame_veil").click(function(event){
				jq("#theFrame_veil").fadeOut(750);
				jq("#theFrame iframe").slideUp(500);
				var elem = document.getElementById("theFrame");
				//elem.remove();
				//setTimeout("jq('#theFrame').remove()", 750);
				setTimeout(elem.remove(), 750);
			});
		})();
	}

})();