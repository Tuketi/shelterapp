var httpthang;

function GetXmlHttpObject(){
	var httpthang = null;
	try{
		httpthang = new XMLHttpRequest();
	}catch(e){
		try{
			httpthang = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			httpthang = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return httpthang;
}

window.onload = newsList();

function newsList(){
	httpthang = GetXmlHttpObject();
		if (httpthang == null){
			alert("You are using a herpderp browser.");
			return;
		}
	var url = "http://www.rat-trails.com/shelter_app/get_news.php";
	httpthang.onreadystatechange = getNewsList;
	httpthang.open("GET", url, true);
	httpthang.send(null);
}

function showAnimals(category_id, breed){
	var breed = breed || "";
	httpthang = GetXmlHttpObject();
		if (httpthang == null){
			alert("You are using a herpderp browser.");
			return;
		}
	var url = "http://www.rat-trails.com/shelter_app/get_animals.php?id=" + category_id + "&breed=" + breed;
	httpthang.onreadystatechange = function(){newAnimalList(category_id)};
	httpthang.open("GET", url, true);
	httpthang.send(null);
}

function getAnimalDetails(animal_id){
	httpthang = GetXmlHttpObject();
		if (httpthang == null){
			alert("You are using a herpderp browser.");
			return;
		}
	var url = "http://www.rat-trails.com/shelter_app/get_animal_info.php?id=" + animal_id;
	httpthang.onreadystatechange = showAnimalDetails;
	httpthang.open("GET", url, true);
	httpthang.send(null);
}

function getNewsList(){
	if (httpthang.readyState == 4 || httpthang.readyState == "complete"){
		var bd_news = JSON.parse(httpthang.responseText);
		
		for (var poop = 0; poop < bd_news.news.length; poop++){
		
			document.getElementById("news_place").innerHTML += "<div class='ui-grid-solo'>";
			document.getElementById("news_place").innerHTML += "<div data-role='header' data-theme='a' class='news_header ui-header ui-bar-a' role='banner'><h3 class='ui-title' role='heading' aria-level='1'>" + bd_news.news[poop].n_title + "</h3></div>";
			document.getElementById("news_place").innerHTML += "<div data-role='content' data-theme='b' class='news_body ui-content ui-body-b' role='main'>" + bd_news.news[poop].n_body + "<br /><span class='news_date'>" + bd_news.news[poop].n_date + "</span></div>";
			
			document.getElementById("news_place").innerHTML += "</div><br />";
		}
	
	}
}

function newAnimalList(category_id){
	if (httpthang.readyState == 4 || httpthang.readyState == "complete"){
		var db_animal_info = JSON.parse(httpthang.responseText);
		
		switch(category_id){
			case(1):
				var which_id = "list_area_dog";
				break;
			case(2):
				var which_id = "list_area_cat";
				break;
			case(3):
				var which_id = "list_area_other";
				break;
		}
		
		document.getElementById(which_id).innerHTML = "<ul data-role='listview' class='ui-listview'>";
		
		for (var poop = 0; poop < db_animal_info.animals.length; poop++){
		// I had to write out all these classes and things, because I realised jquery parses its
		// custom properties (data-role, etc) before this js function runs, so just putting in 
		// the properties by themselves wasn't working properly.
		// So I know it looks like crap in this file, but it looks normal on the page. WIN!
		
			document.getElementById(which_id).innerHTML += "<li data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-icon='arrow-r' data-iconpos='right' data-theme='c' class='ui-btn ui-btn-up-c ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-first-child ui-last-child'><div class='ui-btn-inner ui-li'><div class='ui-btn-text'><a href='#animal_details' class='ui-link-inherit' data-rel='dialog' data-transition='flip' onclick='getAnimalDetails(" + db_animal_info.animals[poop].a_id + ")'><img src='./images/" + db_animal_info.animals[poop].a_photo + "' alt='" + db_animal_info.animals[poop].a_name + "' class='ui-li-thumb'><h3 class='ui-li-heading'>" + db_animal_info.animals[poop].a_name + "</h3><p class='ui-li-desc'><i>" + db_animal_info.animals[poop].a_breed + "</i><br />" + db_animal_info.animals[poop].a_info + "</p></a></div><span class='ui-icon ui-icon-arrow-r ui-icon-shadow'>&nbsp;</span></div></li>";
		}
		
		document.getElementById(which_id).innerHTML += "</ul>";
	}
}

function showAnimalDetails(){
	if (httpthang.readyState == 4 || httpthang.readyState == "complete"){
		var animals_info = JSON.parse(httpthang.responseText);
	}
	
	document.getElementById("animal_info_area").innerHTML = "<img src='./images/" + animals_info.a_photo + "' alt='" + animals_info.a_name + "' style='float:left;margin-right:10px;'><h1 style='margin-bottom:0px;'>" + animals_info.a_name + "</h1><br /><i>" + animals_info.a_breed + "</i>";
	document.getElementById("animal_info_area").innerHTML += "<p>" + animals_info.a_info + "</p><p style='font-size:80% !important;'><i>For more information, or to adopt " + animals_info.a_name + ", please call 555-334-6632</i></p>";
}