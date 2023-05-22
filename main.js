$(document).ready(function () {
  //all of my jQuery codes
});
const searchButton = $("#get-gifs");
const mainContent = $("#main-content");
const searchInput = $("#search-by-name");

function fetchAPI(apiURL) {
  mainContent.empty();
  return new Promise((resolve, reject) => {
    let http = new XMLHttpRequest();
    http.open("GET", apiURL);
    http.responseType = "json";
    http.onreadystatechange = function () {
      if (http.readyState === 4 && http.status === 200) {
        resolve(http.response);
      } else if (http.status === 400 || http.status === 500) {
        reject(http.response);
      }
    };
    http.send();
  });
}

function getGifs() {
  fetchAPI(
    `https://g.tenor.com/v1/search?q=${searchInput.val()}&key=JJHDC7UK73EH&limit=14`
  )
    .then((responseBody) => {
      responseBody.results.forEach((result) => {
        //each obj inside the array results is named by me result
        let imageUrl = result.media[0].gif.url;
        let newEl = $(`
                            <div class="card" style="width: 15rem;">
                                <img src=${imageUrl} class="card-img-top" alt="a funny gif">                                
                            </div>
                        `);
        newEl.appendTo(mainContent);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

searchButton.click(() => {
  getGifs();
});
