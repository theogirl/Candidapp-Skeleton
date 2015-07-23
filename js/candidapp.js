$(document).ready(function() {
	$('.candidates').hide();
	$('.parties').hide();
	$('.box2').delay(1500).effect("bounce","slow");


	
//------GLOBAL VARIABLES---------//
	var total = '';
	var photo = '';
	var photoURL = '';
	var myData = {};
	var myStats = '';
	var party = '';
	var name = '';
	var personalURL = '';

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

//----Data request---//

	getData();




//-------EVENTS---------//

	$('#btn-all').click(function(e) {  //listen for submit event
		e.preventDefault();
		$('.candidates').show();
		$('.parties').hide();
		getAll(myData);
		var showMe = $('.buttons')[0];
		showMe.scrollIntoView();
	})


	$('#btn-party').click(function(e) {  //listen for submit event
		e.preventDefault();
		$('.candidates').hide();
		$('.parties').show();
		getParty(myData);
		var showMe = $('.buttons')[0];
		showMe.scrollIntoView();
	})


//-------FUNCTIONS---------//

function getData() {

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
			$('.number-candidates').text(total);//to update stat for total candidates
			myData.sort(dynamicSort("name"));
	}
	else {
			alert('no data!');
	}


});//end AJAX request
} //end getData

function getAll() {

$.each(myData, function(i, candidates) {


		//update global variables with actual data
		name = candidates.name;
		personalURL = candidates.personal_url;
		photoURL = candidates.photo_url;
		//var district = candidates.district_name;
		//var email = candidates.email;
		photo = '<div class="avatar" style=\"background-image: url('+photoURL+')\"></div>';
		party = candidates.party_name;

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
			var candidate = '<li class="list-item">'+photo+'<div class="info"><a class="website" target="_blank" href=\"'+personalURL+'\">'+name+' <i class="fa fa-chevron-circle-right"></i></a><br />'+party+'</div></li>';
				$('.can-all').append(candidate);
		}
		else {
			var candidate = '<li class="list-item">'+photo+'<div class="info">'+name+'<br />'+party+'</div></li>';
			$('.can-all').append(candidate);
		};

});//end each

}//end getAll


function getParty() {

$.each(myData, function(i, candidates) {


		//update global variables with actual data
		name = candidates.name;
		personalURL = candidates.personal_url;
		photoURL = candidates.photo_url;
		//var district = candidates.district_name;
		//var email = candidates.email;
		photo = '<div class="avatar" style=\"background-image: url('+photoURL+')\"></div>';
		party = candidates.party_name;

		if (personalURL !== "") {
			var candidate = '<li class="list-item">'+photo+'<div class="info"><a class="website" target="_blank" href=\"'+personalURL+'\">'+name+' <i class="fa fa-chevron-circle-right"></i></a></div></li>';
			switch (party) {
				case "Liberal" :
					$('.libs-list').append(candidate);
					break;
				case "Green Party" :
					$('.green-list').append(candidate);
					break;
				case "NDP" :
					$('.ndp-list').append(candidate);
					break;
				case "Conservative" :
					$('.cons-list').append(candidate);
					break;
				case "Libertarian" :
					$('.liber-list').append(candidate);
					break;
			}//end switch
		}//end if

		else {
			var candidate = '<li class="list-item">'+photo+'<div class="info">'+name+'</div></li>';
			switch (party) {
				case "Liberal" :
					$('.libs-list').append(candidate);
					break;
				case "Green Party" :
					$('.green-list').append(candidate);
					break;
				case "NDP" :
					$('.ndp-list').append(candidate);
					break;
				case "Conservative" :
					$('.cons-list').append(candidate);
					break;
				case "Libertarian" :
					$('.liber-list').append(candidate);
					break;
			}//end switch
		}//end else
});//end each
}



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