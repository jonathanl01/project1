// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
//= require bootstrap

var months=new Array(
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novermber",
    "December");

var days_in_month = new Array(
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
);

var date = new Date();
var currentMonth = date.getMonth();
var currentYear = date.getFullYear();


$(document).ready(function(){
    
    initialize_page();
    
    $("#yearBack").click(function(){
        update_year(-1);
        initialize_page();
    });
    
    $("#monthBack").click(function(){
        update_month(-1);
        initialize_page();
    });
    
    $("#monthForward").click(function(){
        update_month(1);
        initialize_page();
    });
    
    $("#yearForward").click(function(){
        update_year(1);
        initialize_page();
    });
});


function initialize_page()
{
	var events;
    var monthYear = document.getElementById("monthYear");
    monthYear.innerHTML = months[currentMonth] + " "+ currentYear;
    var week;
    var days = 1;
    var counter = 0;
    var daysStart = false;
    var monthStart = new Date(currentYear, currentMonth, 1).getDay();
    var monthEnd = days_in_month[currentMonth];
    var monthLength = monthEnd;
    
    /*$.ajax({
            	type: "POST",
            	url: '/appointments',
            	data: { appointment: { time: "hello", description:"hello", month: currentMonth+1, day: clickday, year: currentYear} },
            	datatype: 'json',
            	async: false,
            	sucess: function(data){
            		events = data;
            	}
    }); */
    
    $(".week").html("");
    
    for(i=2; i<8; i++){
        week = document.getElementById("calendar").rows[i];
        for(j=0; j<7; j++){
            var day = week.insertCell(-1);
            
            if(j == monthStart){
                daysStart= true;
            }
            if(days>monthEnd){
                daysStart=false;
            }
            
            if(daysStart){
            	//day.id = 'day'+days;
            	day.className = 'weekday';
            	day.id = days;
                day.innerHTML = days.toString()+"<br/>";
                //day.append(days.toString()+"<br/>");
                //day.attr('data-day =' + days);
                if(days == (new Date().getDate())){
                    day.style.backgroundColor = "gray";
                }
                days++;
            }
            
        }
    }
    
    $.getJSON("/appointments",function(data){
    	for(var i = 0; i < data.length; i++){
    		if(data[i].year == currentYear && data[i].month-1 == currentMonth){
    			$("#"+ data[i].day).append(data[i].description + " - " + data[i].time + "<br/>");
    		}
    	}
    })
    
    
    $(".weekday").click(function(){
            var des = $("#description").val();
            var tim = $("#time").val();
            var clickday = $(this).attr('id');
            if((des != "") && (tim != "")){
                $(this).append(" " + des+ " " + tim + "<br/>");
                
                $.ajax({
            	type: "POST",
            	url: '/appointments',
            	data: { appointment: {time: tim, description: des, month: currentMonth+1, day: clickday, year: currentYear}},
            	datatype: 'json'
            });  
                
                $("#description").val(""); 
                //$("#time").empty();
            }else{
                var setMessage = set_Event(clickday);
                if(setMessage==null){
                    setMessage = " ";
                }
                setMessage =" "+ setMessage;
                $(this).append(setMessage);
            }
        
    });
    
}

function set_Event(clickday){
    
    var descrip = prompt("Describe your event");
    var time = prompt("Put in the time of event");
    var message;
    
    
    
    if(descrip!=null && time!=null){
        message = descrip + " " + time;
        
        $.ajax({
            	type: "POST",
            	url: '/appointments',
            	data: { appointment: {time: time, description: descrip, month: currentMonth+1, day: clickday, year: currentYear}},
            	datatype: 'json'
            });  
        
    }
    return message;
    
}

function update_month(i){
    currentMonth=currentMonth+i;
    if(currentMonth>11){
        currentMonth = 0;
        currentYear++;
    }else if(currentMonth<0){
        currentMonth = 11;
        currentYear--;
    }
}

function update_year(i){
    currentYear=currentYear+i;
}