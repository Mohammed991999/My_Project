let myHttp = new XMLHttpRequest();
let trendingMovie = [];

myHttp.open('GET' , 'https://api.themoviedb.org/3/trending/movie/week?api_key=f1aca93e54807386df3f6972a5c33b50');
myHttp.send();

myHttp.addEventListener('readystatechange' , function () {
  if(myHttp.readyState == 4) {
  trendingMovie = JSON.parse(myHttp.response).results;
  displayItem()
}
})

function displayItem() {
  let box = ``;
for (let i = 0; i < trendingMovie.length; i++) {
  
  box += `      <div class="col-md-3">
        <div class="post">
          <img src='https://image.tmdb.org/t/p/w500${trendingMovie[i].poster_path}' class='w-100'/>
          <h4>${trendingMovie[i].title}</h4>
          <p>${trendingMovie[i].overview}</p>
        </div>
      </div>`
  
}

document.getElementById('rowData').innerHTML = box;
}

