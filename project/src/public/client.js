const Map = Immutable.Map;
const List = Immutable.List;
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
let store = new Map({
  user: { name: "Pablo" },
  apod: new Map(),
  rover: new Map(),

  rovers: new List(["Curiosity", "Opportunity", "Spirit"]),
  ActiveDetailsRover: function () {
    return Object.keys(store.get("rover")).length === 0;
  },
  NotHavePhotos: function () {
    return store.get("rover").photos == undefined;
  },
  NotSameRover: function (rovername) {
    return store.get("rover").name != rovername;
  },
});

// add our markup to the page

const updateStore = (state, newState) => {
  store = state.mergeDeep(newState);
  render(root, store);
};
const updatePhotos = (state, newState) => {
  store = store.set("photos", newState);

  render(root, store);
};
const AttachEventClick = (link) => {
  link.addEventListener(
    "click",
    function (el) {
      if (this.id != null) {
        // updateWindow(store, this.id);

        getRover(store, this.id);
        getPhotos(store, this.id);
      }
    },
    false
  );
};
const render = async (root, state) => {
  if (state.get("rover").size > 0) {
    root.innerHTML = RoverPage(state);
  } else {
    root.innerHTML = App(state);
  }
  const menu = root.getElementsByTagName("a");
  [...menu].forEach((element) => AttachEventClick(element));

  const CoolEffect = function (element, e) {
    x = e.pageX;
    y = e.pageY;
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  // ------------------------------------------------------  Images Hover
  // Cool effect of on-hover image info
  const showInfoPhotoRover = function (e) {
    document
      .querySelectorAll(".img-content-hover")
      .forEach((element) => CoolEffect(element, e));
  };
  document.addEventListener("mousemove", showInfoPhotoRover);
};
//

// create content
const App = (state) => {
  rovers = state.get("rovers");
  apod = state.get("apod");
  rover = state.get("rover");

  return (
    menu +
    `
        <home>
            ${Greeting(store.get("user").name)}
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
  return (
    menu +
    `    
    <main>            
        <section>
          <roverInfo> 
            <div id="RoverSummary">${TheRover(
              roverData.toJSON().rover.rover
            )}</div>
            </hr>

          </roverInfo>
          <div id="RoverPhotos">${LastPhotos(roverData.toJSON())}</div>

        </section>            
    </main>
  `
  );
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
  const photodate = new Date(apod.get("date"));
  console.log(photodate.getDate(), today.getDate());

  console.log(photodate.getDate() === today.getDate());
  if (apod.size == 0 || apod.get("date") === today.getDate()) {
    getImageOfTheDay(store);
  }
  return GetHTMLApod(apod);
};
const GetHTMLApod = (apod) => {
  // No API Info? Error!
  if (apod.size == 0) {
    return "<h2>The API is broken, try again later</h2>";
  }
  // check if the photo of the day is actually type video!
  else if (apod.media_type === "video") {
    return `
            <p>See today's featured video <a href="${apod
              .get("image")
              .get("url")}">here</a></p>
            <p>${apod.get("image").get("title")}</p>
            <p>${apod.get("image").get("explanation")}</p>
        `;
  } else {
    return `
            <img src="${apod.get("image").get("url")}" />
            <p>${apod.get("image").get("explanation")}</p>
        `;
  }
};
const LastPhotos = (store) => {
  let result = "<div class='container'>";
  if (!store.photos && store.rover.name) {
    getPhotos(store.rover.name);
  }
  if (store.photos) {
    store.photos.forEach((element) => {
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
    result = `<h3>${rover.name}</h3>
      <p>
          <strong>Mission start:</strong> ${rover.launch_date} <br>
          <strong>Mission landed:</strong> ${rover.landing_date} <br>
          <strong>Status</strong>: ${rover.status}
      </p>`;
  }
  return result;
};
// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
  fetch(`http://localhost/apod`)
    .then((res) => res.json())
    .then((apod) => {
      if (!apod.image.error) updateStore(store, { apod: apod });
    })
    .catch((err) => console.log(err));
};

const getPhotos = (state, rovername) => {
  fetch(`http://localhost/roverPhotos?RoverName=${rovername}`)
    .then((res) => res.json())
    .then((photos) => {
      if (!photos.error) updatePhotos(state, photos);
    })
    .catch((err) => console.log(err));
};

const getRover = (state, rovername) => {
  if (
    store.get("NotSameRover")(rovername) ||
    store.get("ActiveDetailsRover")()
  ) {
    fetch(`http://localhost/roverinfo?RoverName=${rovername}`)
      .then((res) => res.json())
      .then((roverinfo) => {
        if (!roverinfo.rover.error)
          updateStore(state, { rover: roverinfo.rover });
      })
      .catch((err) => console.log(err));
  }
};
