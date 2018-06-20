//FOR DEBUGGING!!! (CLEAR LOCALSTORAGE VARS)
//localStorage.clear();



// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;


// Initialize app
var myApp = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'Prioriprize',
  // App id
  id: 'com.amohdoh.prioriprize',
  // Add default routes
  routes: [
    {
      name: 'index',
      path: '/',
      url: './index.html',
    },
    {
      name: 'table',
      path: '(/table/)',
      url: './table.html',
    },
    {
      name: 'about',
      path: '(/about/)',
      url: './about.html',
    },
        {
      name: 'amountTimePage',
      path: '(/amounttime/)',
      url: './amounttime.html',
    },
        {
      name: 'mainPage',
      path: '(/mainscreen/)',
      url: './main.html',
    },
        {
          path: '(.*)',
  url: './404.html',
    }
    ]

  // ... other parameters
});
console.log('working');



//COMMENTED OUT IDEAS BELOW
//Turn on sort mode
//var turnOnFor =  document.getElementById("sortableting");
//myApp.sortable.enable(turnOnFor);


//Walkthrough popover--------------------------
//$$('.popover-about').on('popover:open', function (e, popover) {
 // console.log('About popover open');
//});
//$$('.popover-about').on('popover:opened', function (e, popover) {
 // console.log('About popover opened');
//});


// Add view
//app.views.add(el,{...})
//Declare vars on start
  var listNumber = 1;
  var priorityArray = [];
  var hoursArray = [];
  var p = 0;
  var pagenumber = [];

//When device is ready (using cordova)
$$(document).on('deviceready', function() {


  //Debugging
  console.log("Device is ready!");
  //Create main view
    var mainView = myApp.views.create('.view-main');

  //Check if first time using, if not, skip to main
  var setupTour = localStorage.getItem("tour");
  if(setupTour == "1"){
    mainView.router.navigate('/mainscreen/');
  }
  else{
    //Disable sortable table and table elements on page load
    document.getElementById('tableFrame').style.display = "none"; 
    document.getElementById('topRNextBut').style.display = "none"; 
  }

});

//function onHomeInit() {
 //...
//};
//trigger it
//onHomeInit();

//INDEX(sortable page)---------------------------------------
//Function below runs when index is initialized
function onHomeInit() {
    console.log("this is index page");
}

//When "Add" button is clicked (add priorities to table from textbox)
$$('#addButton').on('click', function () {
  //Show table and next button if hidden
  if(document.getElementById('tableFrame').style.display === "none"){
   document.getElementById('tableFrame').style.display = "block"; 
  }
  if(document.getElementById('topRNextBut').style.display === "none"){
   document.getElementById('topRNextBut').style.display = "block"; 
  }

  //Get textbox input
  var inputVar = document.getElementById("priorityInput").value;

  //Store userinput in priorityArray
  priorityArray[listNumber] = inputVar;

  //Sortable list element name
  var listID = "list"+listNumber;

  //Hide non used sortable elements
    for (i = listNumber+1; i > listNumber && i < 8; i++) { 
      var disableListID = "element"+i;
      document.getElementById('tableFrame').contentWindow.document.getElementById(disableListID).style.display = "none";

    }
    
  //Show sortable element
  var enableListID = "element"+listNumber;
  document.getElementById('tableFrame').contentWindow.document.getElementById(enableListID).style.display = "block";

  //Set sortable element value to input
  document.getElementById('tableFrame').contentWindow.document.getElementById(listID).innerHTML = inputVar;

  //Increment to the next list value
  listNumber = listNumber + 1;

}); 

//===================================================================//
//AMOUNT TIME PAGE --------------------------------------------------
//===================================================================//
//Function below runs when amounttime is initialized
function onAmountTimeInit(){
  console.log("yep");
  var stepper = myApp.stepper.create({
    //Stepper element
    el: '.stepper1',
    //Stepper input element
    inputel: '.stepperInput1'
  });

  //Variables
    var tableColNum;
    var tableColName;
    var tablePriorName;
    var inputHoursName = "";
    var thisHours = ""; 

    //Fill the table with priorities
    for (i = 0; i < 7; i++) { 
      tableColNum = i + 1;
      tablePriorName = "priorityVal"+tableColNum;
      tableColName = "tableCol"+tableColNum;

        //Remove column if value is empty, fill it otherwise
       // if(typeof priorityArray[tableColNum] == 'undefined'){
          //document.getElementById(tableColName).style.display = "none"; 
       // }
       // else{
      document.getElementById(tablePriorName).innerHTML = localStorage.getItem(tableColNum);
      //retreove by value
       // }

    } 
}

//Get hours inputs
$$('#confirmHoursButton').on('click', function(){

  for (i = 0; i < 7; i++) { 
    inputHoursName  = "priorityHrs"+(i+1);
    thisHours = document.getElementById(inputHoursName).value;
    hoursArray.push(thisHours);
  }
  myApp.alert('Confirmed!');


});



//===================================================================//
//MAIN (INFO) PAGE --------------------------------------------------
//===================================================================//
//Function below runs when mainPage is initialized
function onMainPageInit(){
    myApp.alert('Here comes main page');
//Hide back button
   document.getElementById('backBut3').style.display = "none"; 
    //Set global var to end tour
    localStorage.setItem("tour", "1");

    myApp.alert('Here comes main page');
    //Swiper
    mySwiper = myApp.swiper.create('.swiper-container',{
     speed: 150,
     spaceBetween: 10,
     slidesPerView: 'auto',
     pagination:'.swiper-pagination'
   });

    //Vars
    var thisInputName = ""; //old hoursInputName
   // old hoursInputValue
   var thisPriorityName  = "blah";
   var prirorArray = [{name:thisPriorityName, hours: "0", weight:100}];
   var iPlusOne = 0;
   var nameHere = "nil";
   var thisPrior = "";

    //Fill priorities object
    for (i = 0; i < 7; i++) { 
        //Vars
        iPlusOne = i+1;
        //1. Get each priority name and save as thisPriorityName
        var currentPriorityName = priorityArray[iPlusOne];

        //2. Get each priority hours and save as thisInputName
        var currentHours = hoursArray[i];
        
        //3. Get priority weight (1 is lowest)
        // Retrieve
        var currentWeight = localStorage.getItem(currentPriorityName);


        //Actually fill array

        prirorArray.push({name:currentPriorityName, hours:currentHours, weight:currentWeight});

       //Save array locally
       localStorage.setItem("prioritiesArray", JSON.stringify(prirorArray));



       //localStorage.setItem("filledPriorityArray", prirorArray);

        //myApp.alert("it's "+prirorArray[i].name+" hours: "+prirorArray[i].num+" weight: "+prirorArray[i].weight);

      }
    //Fill priorities tab
    for (i = 0; i < 7; i++) {
     var prioritiesArray = JSON.parse(localStorage.getItem("prioritiesArray") || "[]");
       //var lastFill = document.getElementById("prioritiesFill").value;
       var thisPriorityTab = prioritiesArray[i+1].name;
       myApp.alert(thisPriorityTab);
       getElementById('prioritiesFill').innerHTML = thisPriorityTab;
     }

}





//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Handle page init
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
myApp.on('pageInit', function (page) {
    if(page.name === 'index'){
      onHomeInit();
    }
    else if(page.name=== 'amountTimePage'){
      onAmountTimeInit();
    }
    else if(page.name=== 'mainPage'){
      onMainPageInit();
    }
});











