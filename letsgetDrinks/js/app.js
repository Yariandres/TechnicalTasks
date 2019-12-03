

let events = [];

window.onload = async () => {
  const drinks_url = 'https://mock-api.drinks.test.siliconrhino.io/events?page=1&pageSize=7&search=';
  const response = await fetch(drinks_url);
  events = await response.json();
  
  createList(events);
};

createList = eventList => {
  document.querySelector('#event-list').innerHTML = eventList.map( event => 
    `<div class="card"> 
        <div class="card__event--type">
          <p><strong>Type: </strong>${event.type}</p>           
        </div>

        <div class="card__time">
          <p><strong>time: </strong>${event.time}</p>           
        </div>

        <div class="card__title">
          <p><strong>title: </strong>${event.title}</p>           
        </div>

        <div class="card__location">        
          <p><strong>Location: </strong>${event.location.name}</p>
        </div>

        <div class="card__location--cordinates">
          <p><strong>location:</strong></p>
          <iframe
            width="600"
            height="450"
            frameborder="0" style="border:0"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBLP6dT7PuK2uoIKXnETfnl5mOP_vjC4YY&q=${event.location.latitude}+${event.location.longitude}">
          </iframe>
          
                  
        </div>

        <div class="card__organiser">
          <p><strong>Creator: </strong>${event.creator.name}</p>
        </div>
        
        <div class="card__avatarUrl">
          <img src="${event.creator.avatarUrl}">
        </div>

        <div class="card__guests">
          <p>Guests:</p>
          ${event.guests.map(guests => 
            `<p>${guests.name}</p>
              <img width="50" height="50" src="${guests.avatarUrl}">
            `
            ).join("")
          }
        </div>
        <div class="card__comments">
          <strong>Comments: </strong>
            ${event.comments.map(comment => 
              `<p>${comment.user.name}</p>
                <img width="20" height="20" src="${comment.user.avatarUrl}">
                <span>${comment.message}</span>
                <span>${comment.timestamp}</span>
              `
            ).join("")
          }
        </div>
        <hr>
      </div>`
  ).join('');
}

applyFilter = () => {
  let searchQuery = document.querySelector("#searchQuery").value;
  let searchType = document.querySelector("#searchType").value;

  if (searchQuery.length >= 1) {
    let filteredEvents = events.filter(show => show[searchType].includes(searchQuery));
    createList(filteredEvents);

    console.log(filteredEvents);
  } else {
    createList(events);
  }
};



