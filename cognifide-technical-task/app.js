// LOADER
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.className += " hidden";
});

// FETCH FUNCTION
var images = [];
var length = 10;
increaseLength = () => {
  console.log("i'm here");
  length = length + 10;
  createList(images, length);
};
// Fetching data
window.onload = async () => {
  var response = await fetch(
    "http://www.splashbase.co/api/v1/images/search?query=trees"
  );
  images = await response.json();
  createList(images, length);
};
createList = (imageList, length) => {
  console.log("LENGTH", length);
  document
    .querySelectorAll("figure")
    .forEach(singleFigure => singleFigure.parentNode.removeChild(singleFigure));
  imageList.images.slice(0, length).map((image, index) => {
    //get a reference to where we want to put the images
    var myFigure = document.querySelector(".gellery");
    var indexPlussOne = index + 1;
    // create a figure element
    var figure = document.createElement("figure");
    // add class to fit it on the grid
    figure.classList.add("gellery__item", "div" + indexPlussOne);
    // adding img and overlay tags to figure
    figure.innerHTML += `                      
                            <img id="modalImg" src="${image.url}" alt="Gallery image" class="gellery__img">
                            
                            <div class="overlay overlayLeft">
                              <div  class="overlay__text">#${image.site}</div>                             
                            </div>                     
                        `;
    myFigure.appendChild(figure);

    figure.querySelector(".overlay").addEventListener("click", () => {

      var modal = document.querySelector("#simpleModal");

      var img = document.querySelector("#modalImage");
      console.log(img);
      console.log(image.url);
      img.setAttribute("src", image.url);
      openSesame();

    })

  });
};

applyFilter = async query => {
  var response = await fetch(
    "http://www.splashbase.co/api/v1/images/search?query=trees"
  );
  images = await response.json();
  let filteredImages = images.images;
  if (query) {
    filteredImages = images.images.filter(img => img.site === query);
  }
  createList({ images: filteredImages });
};





// get open modal button
var modal = document.querySelector("#simpleModal");

var modalBtn = document.querySelector("#modalBtn");

// get modal close span
var closeBtn = document.querySelector("#closeBtn");
// open modal click event
modalBtn.addEventListener('click', openSesame);
// close modal click event
closeBtn.addEventListener('click', closeSesame);
// listen for outside click
window.addEventListener("click", clickout);

function clickout(event) {
  if (event.target == modal) {
    modal.style.opacity = "0";
    modal.style.visibility = "hidden";
  }
}

function openSesame() {
  modal.style.opacity = "1";
  modal.style.visibility = "visible";
}

// close function
function closeSesame() {
  modal.style.opacity = "0";
  modal.style.visibility = "hidden";
}






