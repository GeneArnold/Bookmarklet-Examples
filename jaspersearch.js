	//debugger;

	function jInit() {
		if (typeof (document.styleSheets) != 'undefined')
	{
		var styleSheetList = document.styleSheets;
		var loaded = false;
		for(var i=0; i < styleSheetList.length; i++) 
		{
        	//alert(styleSheetList[i].href);
        	if (styleSheetList[i].href == 'http://localhost/~HomeBase/css/jquery-ui.css')
        	{
        		loaded = true;
        	}
    	}
    	if (!loaded)
    	{
    		var c = document.createElement('link');
			c.setAttribute('href','http://localhost/~HomeBase/css/jquery-ui.css');
			c.setAttribute('rel','stylesheet');
			c.setAttribute('type','text/css');
			document.getElementsByTagName('head')[0].appendChild(c);
    	}
	}
	else
	{
		var c = document.createElement('link');
		c.setAttribute('href','http://localhost/~HomeBase/css/jquery-ui.css');
		c.setAttribute('rel','stylesheet');
		c.setAttribute('type','text/css');
		document.getElementsByTagName('head')[0].appendChild(c);
	}

	loadS2();

	function loadS2()
	{
		if (typeof (jQuery) == 'undefined')
		{
			s2=document.createElement('SCRIPT');
			s2.type='text/javascript';
			s2.onload=loadS3;
			s2.src='http://localhost/~HomeBase/js/jquery-1.10.2.js';
			document.getElementsByTagName('head')[0].appendChild(s2);
		}
	}

	function loadS3()
	{
		if (typeof (jQuery.ui) == 'undefined') 
		{
			s3=document.createElement('SCRIPT');
			s3.type='text/javascript';
			s3.onload=loadS4;
			s3.src='http://localhost/~HomeBase/js/jquery-ui.js';
			document.getElementsByTagName('head')[0].appendChild(s3);
		}
	}

	function loadS4()
	{
		if (typeof (visualize) == 'undefined')
		{
			s4=document.createElement('SCRIPT');
			s4.type='text/javascript';
			s4.onload=runReport;
			s4.src='http://localhost:8080/jasperserver-pro56_Beta/client/visualize.js';
			document.getElementsByTagName('head')[0].appendChild(s4);
		}
	}

	

	function runReport()
	{
		
		if(!document.getElementById("dialog"))
		{
			var div_dialog = document.createElement('div');
	    	var div_container = document.createElement('div');
	    	div_dialog.setAttribute('id','dialog');
	    	div_container.setAttribute('id','container');
	    	div_dialog.appendChild(div_container);
	    	document.getElementsByTagName('body')[0].appendChild(div_dialog);
	    	$( "#dialog" ).dialog({ height: "500", width: "625", title: "report_Title" });
		}
		else
		{
			document.removeChild("dialog");
			var div_dialog = document.createElement('div');
	    	var div_container = document.createElement('div');
	    	div_dialog.setAttribute('id','dialog');
	    	div_container.setAttribute('id','container');
	    	div_dialog.appendChild(div_container);
	    	document.getElementsByTagName('body')[0].appendChild(div_dialog);
	    	$( "#dialog" ).dialog({ height: "500", width: "625", title: "report_Title" });

		}

		visualize({
			auth: {
			name: "jasperadmin",
			password: "jasperadmin",
			organization: "organization_1"
			}
		}, function (v) {
			//render report from provided resource
			v("#container").report({
				resource: "/public/Samples/Reports/01._Geographic_Results_by_Segment_Report",
				error: handleError
			});

			//show error
			function handleError(err){
				alert(err.message);
			}
			});
		}
	}

	