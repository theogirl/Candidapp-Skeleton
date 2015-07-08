$(document).ready(function() {
	$('.candidates').hide();

//------GLOBAL VARIABLES---------//
	var total = '';
	var maleCount = 0;
	var femaleCount = 0;
	var photo = '';
	var myData = {};
	var myStats = '';

//-----Display current date---//
	var today = new Date();
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var weekday = days[today.getDay()];
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var mm = months[today.getMonth()];
	var dd = today.getDate();
	var yyyy = today.getFullYear();
	today = weekday+', '+mm+' '+dd+', '+yyyy;
	$('#date').text(today);


//----Get days between today and election---//

	var thisDay = new Date();    
    var electionDay = new Date("2015/10/15");
    var diff = (electionDay - thisDay)/1000;
    var diff = Math.abs(Math.floor(diff)); 
    var days = Math.ceil(diff/(24*60*60));
    $('.number-days').text(days);



getAll();


//-------EVENTS---------//

	$('#btn-all').click(function(e) {  //listen for submit event
		e.preventDefault();
		$('.candidates').show();

		//displayInfo();
	})

//-------FUNCTIONS---------//

function getAll() {

var url = 'https://represent.opennorth.ca/candidates/?callback=?';
var params = {
	  limit: 1000//use limit=1000 to get full list
	};

$.getJSON(url, params, function(data) {
	console.log(data)//just for me so I can see data object	

	if (data.objects && data.objects.length > 0) {
			myData = data.objects;
			myStats = data.meta;
			total = myStats.total_count;
			$('.number-candidates').append(total);//to update stat for total candidates
			myData.sort(dynamicSort("name"));
	}
	else {
			alert('no data!');
	}

	$.each(data.objects, function(i, candidates) {


		//update global variables with actual data
		var name = candidates.name;
		var personalURL = candidates.personal_url;
		var gender = candidates.gender;
		var photoURL = candidates.photo_url;
		var district = candidates.district_name;
		var email = candidates.email;
		var photo = '<div class="avatar" style=\"background-image: url('+photoURL+')\"></div>';
		var party = candidates.party_name;

		switch(party) {
		    case "Green Party" :
		    	party = '<span style="color: #3d9b35;">' + party +'</span>'; 
				break;
		    case "NDP" :
		    	party = '<span style="color: #f58220;">' + party +'</span>'; 
				break;
			case "Conservative" :
		    	party = '<span style="color: #012596;">' + party +'</span>'; 
				break;
			case "Liberal" :
		    	party = '<span style="color: #d51d29;">' + party +'</span>'; 
				break;
			case "Libertarian" :
		    	party = '<span style="color: #f1ba1b;">' + party +'</span>'; 
				break;
		}


		
		if (personalURL !== "") {
			var candidate = '<li class="list-item">'+photo+'<div class="info"><a class="website" href=\"'+personalURL+'\">'+name+' <i class="fa fa-globe"></i></a><br />'+party+'</div></li>';
				$('.can-all').append(candidate);
		}
		else {
			var candidate = '<li class="list-item">'+photo+'<div class="info">'+name+'<br />'+party+'</div></li>';
			$('.can-all').append(candidate);
		};
		
	});//end each

});//end AJAX request
//$('.candidate').append('<p>Show more results...</p>	');
} //end getData



//---------DYNAMIC SORTING FUNCTION-------//
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}



})//end doc ready