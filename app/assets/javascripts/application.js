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
    var monthYear = document.getElementById("monthYear");
    monthYear.innerHTML = months[currentMonth] + " "+ currentYear;
    var week;
    var days = 1;
    var counter = 0;
    var daysStart = false;
    var monthStart = new Date(currentYear, currentMonth, 1).getDay();
    var monthEnd = days_in_month[currentMonth];
    var monthLength = monthEnd;
    
    $(".week").html("");
    
    for(i=2; i<8; i++){
        week = document.getElementById("calendar").rows[i];
        for(j=0; j<7; j++){
            var day = week.insertCell(-1);
            day.id = 'day'+days;
            if(j == monthStart){
                daysStart= true;
            }
            if(days>monthEnd){
                daysStart=false;
            }
            
            if(daysStart){
                day.innerHTML = days.toString();
                if(days == (new Date().getDate())){
                    day.style.backgroundColor = "gray";
                }
                days++;
            }
            
        }
    }
    
    $("td").click(function(){
            var des = $("#description").val();
            var tim = $("#time").val();
            if((des != "") && (tim != "")){
                $(this).append(" " + des+ " " + tim);
                $(this).append("<br>")
                $("#description").val(""); 
                $("#time").empty();
            }else{
                var setMessage = set_Event();
                if(setMessage==null){
                    setMessage = " ";
                }
                setMessage =" "+ setMessage;
                $(this).append(setMessage);
            }
        
    });
    
}

function set_Event(){
    
    var descrip = prompt("Describe your event");
    var time = prompt("Put in the time of event");
    var message;
    if(descrip!=null && time!=null){
        message = descrip + "\n" + time;
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