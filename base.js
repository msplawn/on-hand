//The 3 IDs in these functions are for the containers around the three "pages" to be displayed
function displayHungry()    {
    $('#hungryPage').attr('style', 'display: flex');
    $('#landingPage').attr('style', 'display: none');
    $('#thirstyPage').attr('style', 'display: none');
}

function displayThirsty()    {
    $('#thirstyPage').attr('style', 'display: flex');
    $('#landingPage').attr('style', 'display: none');
    $('#hungryPage').attr('style', 'display: none');
}

function displayLanding()    {
    $('#landingPage').attr('style', 'display: flex');
    $('#hungryPage').attr('style', 'display: none');
    $('#thirstyPage').attr('style', 'display: none');
}
//I made a clear search function as well see below - Jess
// This is the function to clear the search criteria and #cocktailResults section
function clear() {
    $("#cocktailResults").empty();
    //code to get ride of established search criteria and query add ons
  }

// This is the beginnings of the ajax request, use #searchCocktails for the search button ID
$('#searchCocktails').on('click', function(event)    {
    event.preventDefault();

    // clear();
    // my searchCoctail click function has a queryURL that searches for more than gin see below - Jess
    queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin";
    // var queryURL = buildQueryURL();

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response)    {
      console.log(response);
      
      });
});

//The start of Jess code 
//=============================================================
function updatePage() {
    // Get from the form the number of results to display
    var $ingredientsList = $("<ul>");
    $ingredientsList.addClass("list-group");
    $("#ingredient-section").append($ingredientsList);
    
}

var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

var ingredientName = $('#userInput').val();
console.log(ingredientName);

function mapNumberedKeys(item, field) {
    var count = 1;
    var array = [];
    while (item[`str${field}${count}`]) {
        array.push(item[`str${field}${count}`].toLowerCase());
        count++;
    }
    return array;
}


function clear() {
    $("#ingredientSearch").empty();
}


$('#searchCocktails').on('click', function (event) {
    event.preventDefault();

    clear();

    queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

    // var queryURL = buildQueryURL();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //console.log(response);

        //loop through length of drinks 
        for (var i = 0; i < response.drinks.length; i++) {
            var drink = response.drinks[i];

            let count = 1;
            var ingredients = mapNumberedKeys(drink, "Ingredient");
            var measurements = mapNumberedKeys(drink, "Measure");

            if (ingredients.includes(ingredientName.toLowerCase())) {
                //console.log("DRINK", drink);
            }

            //OBJECT
            //console.log(drinks)
            //drink name 
            //console.log(drinks.strDrink);
            //drink image
            //console.log(drinks.strDrinkThumb);
            //drink ingredients
            //console.log(drinks.strIngredient1);
            //console.log(drinks.strIngredient2);
            // console.log(drinks.strIngredient3);
            // console.log(drinks.strIngredient4);
            // console.log(drinks.strIngredient5);
            // console.log(drinks.strIngredient6);
            // //mesurements 
            // console.log(drinks.strMeasure1);
            // console.log(drinks.strMeasure2);
            // console.log(drinks.strMeasure3);
            // console.log(drinks.strMeasure4);
            // console.log(drinks.strMeasure5);
            // console.log(drinks.strMeasure6);
            // //recipe
            // console.log(drinks.strInstructions);
        }

    });

    //  .on("click") function associated with the clear button
    $("#clear-all").on("click", clear);


    //$("#run-search").on('click', function (event) {
    //event.preventDefault();
    //queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
    //$.ajax({
    //url: queryURL,
    //method: "GET"
    //}).then(function (response) {
    //  console.log(response);

    //let drinks1 = {
    //strIngredient1:'lemon',
    //strIngredient2:'vodka',
    //strIngredient3:'rum',
    //strIngredient4:'other',
    //strIngredient5:'5',
    //strIngredient6:'6',
    //strIngredient7:'7'
    //}



    //console.log(drinks.ingredients1)



    //});
    //});

    //queryURL is the url we'll use to query the API
    //function buildQueryURL() {

    //var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";


    // Begin building an object to contain our API call's query parameters
    // Set the API key

    // Grab text the user typed into the search input, add to the drink object


    ///var drinkIngredient = $("#drink-ingredient").val().trim();


    //queryURL = queryURL + "filter.php?i=" + drinkIngredient;
})
//};



//These three IDs refer to the containers for the hungry / thirsty button&icon container 
//and the landing button in the nav
$('#hungry').on('click', displayHungry);

$('#thirsty').on('click', displayThirsty);
$('#landing').on('click', displayLanding);
