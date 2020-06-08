//global variables
var resultSection = $("#results");

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

// Creates cards if there are ingredients for that entry
function updatePage(allDrinks) {

    allDrinks.map((drink) => {

        var drinkCard = $('<div class ="ui card">');

        var $drinkImg = $('<div class="image">');
        $("<img src=" + drink.img + ">").appendTo($drinkImg);
        $drinkImg.appendTo(drinkCard);

        var cardBody = $('<div class ="content">')
        $("<h2>").text(drink.name).appendTo(cardBody);
        $("<h4>").text(drink.ingredient).appendTo(cardBody);
        $("<h4>").text(drink.measure).appendTo(cardBody);
        $("<h4>").text(drink.instructions).appendTo(cardBody);

        cardBody.appendTo(drinkCard);
        drinkCard.appendTo("#results");

    })
}

// Button click to show cocktails based on ingredients entry
$("#searchCocktails").on('click', function (event) {
    event.preventDefault();
    var ingredientName = $('#userInput').val().trim();
    resultSection.empty();

    if (ingredientName !== "") {

        queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

        // Pulls response from the API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

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
                    drinkResult.ingredient = ingredients;
                    drinkResult.measure = measurements;
                    drinkResult.instructions = strInstructions;

                    allDrinks.push(drinkResult);

                }

            }

            //If an entry has no ingredients, it will display a message
            if (!allDrinks.length) {
                resultSection.html('<div class="ui massive negative message">' +
                    '<i class="close icon"></i>' +
                    '<div class="header">' +
                    'There\'s no recipes for that entry!' +
                    '</div>' +
                    '<p>Please try again' +
                    '</p></div>');

                $('.close').on('click', function () {
                    resultSection.empty();
                });

                return;

            } else {
                updatePage(allDrinks);
            }

        });
    }

});
