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

$('#hungry').on('click', displayHungry());
$('#thirsty').on('click', displayThirsty());
$('#landing').on('click', displayLanding());
