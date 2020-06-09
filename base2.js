//global variables
var resultSection = $('#results');
var searchTitleDiv = $('#searchTitle');

function getRecipes() {
    var userInput = $('#userInput').val();
    resultSection.empty();
    searchTitleDiv.empty();

    if (userInput !== "") {

        var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userInput;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // We store all of the retrieved data inside of an object called "recipeData"
            .then(function (recipeData) {
                if (recipeData.meals === null) {
                    resultSection.html('<div class="ui massive negative message">' +
                        '<i class="close icon"></i>' +
                        '<div class="header">' +
                        'There\'s no recipes for that entry!' +
                        '</div>' +
                        '<p>Please try again' +
                        '</p></div>');

                    $('.close').on('click', function () {
                        resultSection.empty();
                        userInput = $('#userInput');
                        userInput.val('');
                        
                    });

                    return;
                }
                else {
                    var userInputUpper = userInput.toUpperCase()
                    var searchTitle = $('<h2>').text(userInputUpper);
                    searchTitle.appendTo(searchTitleDiv);
                    userInput = $('#userInput')
                    userInput.val('');

                    for (var j = 0; j < recipeData.meals.length; j++) {
                        //Not showing recipe cards if no link is present
                        if (recipeData.meals[j].strYoutube !== ""){
                        
                        
                        var recipeCard = $('<div class ="ui card">');

                        var imgDiv = $('<div class="image">');
                        $('<img src=' + recipeData.meals[j].strMealThumb + '>').appendTo(imgDiv);
                        imgDiv.appendTo(recipeCard);

                        var cardBody = $('<div class ="content">')
                        $('<h4>').text(recipeData.meals[j].strMeal).appendTo(cardBody);
                        $('<h4>').text(recipeData.meals[j].strArea).appendTo(cardBody);

                        

                        $('<a class="link" target="_blank" href=" ' + recipeData.meals[j].strYoutube + '">').text(recipeData.meals[j].strYoutube).appendTo(cardBody);

                        cardBody.appendTo(recipeCard);
                        
                        recipeCard.appendTo(resultSection);

                        }
                    }
                }
            });
    }
}

$(document).ready(function () {
    // Button click to show recipes
    $('#recipeBtn').on('click', function (e) {
        e.preventDefault();
        getRecipes();
    })
});
