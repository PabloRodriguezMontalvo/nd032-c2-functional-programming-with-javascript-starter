const root = document.getElementById("root");
const roverDiv = document.getElementsByTagName("roverInfo");
const HomeDiv = document.getElementsByTagName("home");

const roverDivSummary = document.getElementById("RoverSummary");
const roverDivPhotos = document.getElementById("RoverPhotos");

const menu = `<header>  <nav> <ul>
<li><a href="/">Image of the day</a></li>
<li><a id="curiosity" href="#">Curiosity</a></li>
<li><a id="opportunity" href="#">Opportunity</a></li>
<li><a id="spirit" href="#">Spirit</a></li>
</ul></nav></header>`;
let store = {
  user: { name: "Pablo" },
  apod: "",
  rover: {},
  active: {},
  rovers: ["Curiosity", "Opportunity", "Spirit"],
  ActiveDetailsRover: function () {
    return Object.keys(this.rover).length === 0;
  },
  NotHavePhotos: function () {
    return this.rover.photos == undefined;
  },
  NotSameRover: function (rovername) {
    return this.rover.name != rovername;
  },
};

// add our markup to the page

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(root, store);
};
const updatePhotos = (store, newState) => {
  store.rover = Object.assign(store.rover, newState);
  render(root, store);
};
const updateWindow = (store, newState) => {
  store.active = newState;
  render(root, store);
};
const render = async (root, state) => {
  root.innerHTML = App(state);
  const menu = root.getElementsByTagName("a");
  const imgContent = document.querySelectorAll(".img-content-hover");

  for (var a = 0; a < menu.length; a++) {
    menu[a].addEventListener(
      "click",
      function (el) {
        if (this.id != null) {
          getRover(store, this.id);
          getPhotos(store, this.id);
          updateWindow(store, this.id);
        }
      },
      false
    );
  }
  // ------------------------------------------------------  Images Hover
  // Cool effect of on-hover image info
  const showInfoPhotoRover = function (e) {
    for (var i = 0; i < imgContent.length; i++) {
      x = e.pageX;
      y = e.pageY;
      imgContent[i].style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  };
  document.addEventListener("mousemove", showInfoPhotoRover);
};

//

// create content
const App = (state) => {
  let { rovers, apod, rover, active } = state;
  // <section id=roverInfo> ${TheRover(store.rovers[0])}
  //</section>
  if (active.length > 0) {
    return menu + RoverPage(state, active);
  }
  return (
    menu +
    `
      
        <home>
            ${Greeting(store.user.name)}
            <section>
          
            ${ImageOfTheDay(apod)}

                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>
               

                
            </section>
         
        </home>
       
        <footer></footer>
    `
  );
};
const RoverPage = (roverData) => {
  return `    
    <main>            
        <section>
        <roverInfo> 
<div id="RoverSummary">${TheRover(store.rover.name)}</div>
</hr>

</roverInfo>
         
           <div id="RoverPhotos"> ${LastPhotos(store.rover)}</div>
        </section>            
    </main>
  `;
};
// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
  if (name) {
    return `
            <h1>Welcome, ${name}!</h1>
        `;
  }

  return `
        <h1>Hello!</h1>
    `;
};

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
  // If image does not already exist, or it is not from today -- request it again
  const today = new Date();
  const photodate = new Date(apod.date);
  console.log(photodate.getDate(), today.getDate());

  console.log(photodate.getDate() === today.getDate());
  if (!apod || apod.date === today.getDate()) {
    getImageOfTheDay(store);
  }

  // check if the photo of the day is actually type video!
  if (apod.media_type === "video") {
    return `
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `;
  } else {
    return `
            <img src="${apod.image.url}" />
            <p>${apod.image.explanation}</p>
        `;
  }
};
const LastPhotos = (rover) => {
  let result = "<div class='container'>";
  if (!rover.photos && rover.name) {
    getPhotos(store.rover.name);
  }
  if (rover.photos) {
    rover.photos.forEach((element) => {
      result += ` <figure class="img-container"> <img class="NasaPhoto" src="${element.UrlPhoto}" alt=""/>
      <figcaption class="img-content">
      <h2 class="title">Taken on: ${element.DateTaken}</h2>
      <h3 class="camera">${element.Camera}</h3>
          </figcaption>
          <span class="img-content-hover">
            <h2 class="title">Taken on:${element.DateTaken}</h2>
            <h3 class="camera">${element.Camera}</h3>
          </span>
          </figure>
    `;
    });
    result += "</div>";
  }
  return result;
};
const TheRover = (rover) => {
  let result = "";

  if (rover) {
    getRover(store, rover);
    if (store.rover.name) {
      result = `<h3>${store.rover.name}</h3>
      <p>
          <strong>Mission start:</strong> ${store.rover.launch_date} <br>
          <strong>Mission landed:</strong> ${store.rover.landing_date} <br>
          <strong>Status</strong>: ${store.rover.status}
      </p>`;
    }
  }
  return result;
};
// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
  let { apod } = state;

  fetch(`http://localhost:3000/apod`)
    .then((res) => res.json())
    .then((apod) => {
      updateStore(store, { apod: apod });
    })
    .catch((err) => console.error("getImageOfTheDay", err));
};

const getPhotos = (state, rovername) => {
  let { rover } = state;
  fetch(`http://localhost:3000/roverPhotos?RoverName=${rovername}`)
    .then((res) => res.json())
    .then((photos) => {
      updatePhotos(store, { photos: photos });
    })
    .catch((err) => console.error("RoverPhotos", err));
};
const getRover = (state, rovername) => {
  let { rover } = state;
  if (store.NotSameRover(rovername) || store.ActiveDetailsRover()) {
    fetch(`http://localhost:3000/roverinfo?RoverName=${rovername}`)
      .then((res) => res.json())
      .then((roverinfo) => {
        updateStore(store, { rover: roverinfo.rover });
      })
      .catch((err) => console.error("RoverInfo", err));
  }
};
