//The 3 IDs in these functions are for the containers around the three "pages" to be displayed
function displayHungry()    {
    $('#hungryPage').attr('style','display: flex');
    $('#landingPage').attr('style','display: none');
    $('#thirstyPage').attr('style','display: none');
}

function displayThirsty()    {
    $('#thirstyPage').attr('style','display: flex');
    $('#landingPage').attr('style','display: none');
    $('#hungryPage').attr('style','display: none');
}

function displayLanding()    {
    $('#landingPage').attr('style','display: flex');
    $('#hungryPage').attr('style', 'display: none');
    $('#thirstyPage').attr('style','display: none');

}
//=======================================================
//probably dont need this finction now - Jess
function buildQueryURL() {

}

var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

function mapNumberedKeys(item, field) {
    var count = 1;
    var array = [];
    while (item[`str${field}${count}`]) {
        array.push(item[`str${field}${count}`].toLowerCase());
        count++;
    }
    return array;
}

function updatePage(allDrinks) {
    //console.log(allDrinks);

    allDrinks.map((drink) => {
//need to connect elements to semantic elements - jess

        var drinkCard = $('<div class ="ui card">');

        var $drinkName = $("<h2>");
        $drinkName.text(drink.name);
        $("#drink-results").append($drinkName);


        var $drinkImg = $('<div class="image">');
        $("<img src=" + drink.img + ">").appendTo($drinkImg);
        $drinkImg.appendTo("#drink-results");

        var $drinkIngredients = $("<li>");
        $drinkIngredients.text(drink.ingredient);
        $("#drink-results").append($drinkIngredients);

        var $drinkMeasurments = $("<li>");
        $drinkMeasurments.text(drink.measure);
        $("#drink-results").append($drinkMeasurments);

        var $drinkInstructions = $("<p>");
        $drinkInstructions.text(drink.instructions);
        $("#drink-results").append($drinkInstructions);


    })



}


function clear() {
    $("#ingredientSearch").empty();
}


$("#searchCocktails").on('click', function (event) {
    event.preventDefault();
    var ingredientName = $('#userInput').val().trim();


    queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        // console.log(response.drinks);


        let allDrinks = [];
        //loop through length of drinks 

        for (var i = 0; i < response.drinks.length; i++) {
            var drink = response.drinks[i];

            let drinkResult = {};
            
            let count = 1;
            var ingredients = mapNumberedKeys(drink, "Ingredient");
            var measurements = mapNumberedKeys(drink, "Measure");
            var strDrink = (drink.strDrink);
            var strDrinkThumb = (drink.strDrinkThumb);
            var strInstructions = (drink.strInstructions);


            if (ingredients.includes(ingredientName.toLowerCase())) {

                drinkResult.name = strDrink;
                drinkResult.img = strDrinkThumb;
                //console.log(strDrinkThumb);
                drinkResult.ingredient = ingredients;
                drinkResult.measure = measurements;
                drinkResult.instructions = strInstructions;
                allDrinks.push(drinkResult);
                
                // console.log(ingredients);



                // console.log("Drink Name:", strDrink);
                // console.log("Drink Image:", strDrinkThumb);
                //console.log("Ingredient:", ingredients);
                // console.log("Measure:", measurements);
                // console.log("Instructions:", strInstructions);


            }

            if (allDrinks.empty){
                alert("No");
            }
            console.log(allDrinks);

        }
        

        updatePage(allDrinks);

       

    });


    //.on("click") function associated with the clear button
    // $("#clear-all").on("click", clear);


});


//=======================================================

//These three IDs refer to the containers for the hungry / thirsty button&icon container 
//and the landing button in the nav
$('.hungry').on('click', displayHungry);
$('.thirsty').on('click', displayThirsty);
$('.landing').on('click', displayLanding);
