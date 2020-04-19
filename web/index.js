/**
 * Handles the data returned by the API, read the jsonObject and populate data into html elements
 * @param resultData jsonObject
 */
function handleStarResult(resultData) {
    console.log("handleMoviesResult: populating movie table from resultData");

    let movieTableBodyElement = jQuery("#movie_table_body");

    // Iterate through resultData, no more than 10 entries
    for (let i = 0; i < resultData.length; i++) {
        // Concatenate the html tags with resultData jsonObject
        let rowHTML = "";
        rowHTML += "<tr>";
        rowHTML +=
            "<th>" +
            '<a href="single-movie.html?id=' + resultData[i]['movie_id'] + '">'
            + resultData[i]["movie_title"] +
            '</a>' +
            "</th>";
        rowHTML += "<th>" + resultData[i]["movie_year"] + "</th>";
        rowHTML += "<th>" + resultData[i]["movie_dir"] + "</th>";
        rowHTML += "<th>" + resultData[i]["movie_rating"] + "</th>";

        rowHTML +=
            "<th>" +
            '<a href="single-star.html?id=' + resultData[i]['movie_star1_id'] + '">'
            + resultData[i]["movie_star1"] +
            '</a>' + ', ' +
            '<a href="single-star.html?id=' + resultData[i]['movie_star2_id'] + '">'
            + resultData[i]["movie_star2"] +
            '</a>' + ', ' +
            '<a href="single-star.html?id=' + resultData[i]['movie_star3_id'] + '">'
            + resultData[i]["movie_star3"] +
            '</a>' +
            "</th>";

        if(resultData[i]["movie_genre2"] == undefined){
            rowHTML += "<th>" + resultData[i]["movie_genre1"] + "</th>";
        }
        else if(resultData[i]["movie_genre3"] != undefined){
            rowHTML += "<th>" + resultData[i]["movie_genre1"] + ', ' + resultData[i]["movie_genre2"] + ', ' + resultData[i]["movie_genre3"] + "</th>";
        }
        else{
            rowHTML += "<th>" + resultData[i]["movie_genre1"] + ', ' + resultData[i]["movie_genre2"] + "</th>";
        }
        rowHTML += "</tr>";

        movieTableBodyElement.append(rowHTML);
    }
}

/**
 * Once this .js is loaded, following scripts will be executed by the browser
 */

jQuery.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/movies", // Setting request url, which is mapped by MoviesServlet in MoviesServlet.java
    success: (resultData) => handleStarResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});