//The 3 IDs in these functions are for the containers around the three "pages" to be displayed
function displayHungry()    {
    $('#hungryPage').style('display: flex');
    $('#landingPage').style('display: none');
    $('#thirstyPage').style('display: none');
}

function displayThirsty()    {
    $('#thirstyPage').style('display: flex');
    $('#landingPage').style('display: none');
    $('#hungryPage').style('display: none');
}

function displayThirsty()    {
    $('#landingPage').style('display: flex');
    $('#hungryPage').style('display: none');
    $('#thirstyPage').style('display: none');
}

// This is the function to clear the search criteria and #cocktailResults section
function clear() {
    $("#cocktailResults").empty();
    //code to get ride of established search criteria and query add ons
  }

// This is the beginnings of the ajax request, use #searchCocktails for the search button ID
$('#searchCocktails').on('click', function(event)    {
    event.preventDefault();

    // clear();
    queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin";
    // var queryURL = buildQueryURL();

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response)    {
      console.log(response);
      
      });
});

//These three IDs refer to the containers for the hungry / thirsty button&icon container 
//and the landing button in the nav
$('#hungry').on('click', displayHungry());
$('#thirsty').on('click', displayThirsty());
$('#landing').on('click', displayLanding());
