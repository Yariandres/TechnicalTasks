

let events = [];

window.onload = async () => {
  const drinks_url = 'https://mock-api.drinks.test.siliconrhino.io/events?page=1&pageSize=7&search=';
  const response = await fetch(drinks_url);
  events = await response.json();
  
  createList(events);
};

createList = eventList => {
  document.querySelector('#event-list').innerHTML = eventList.map( event =>    
    `<div class="col-xs-2 col-sm-4 col-md-4">
      <div class="card-wrap mt-5">
            
            <h2 class="card-wrap_title text-center my-5">${event.type}</h2>
        
        <p class="card-text"><strong>time: </strong>${event.time}</p>       
        <p class="card-text"><strong>title: </strong>${event.title}</p>            
        <p class="card-text"><strong>Location: </strong>${event.location.name}</p>
        <p class="card-text"><strong>location:</strong></p>
        <iframe
        class="mb-2"
          width="100%"
          height="100%"
          frameborder="0" style="border:0"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBLP6dT7PuK2uoIKXnETfnl5mOP_vjC4YY&q=${event.location.latitude}+${event.location.longitude}">
        </iframe>
        
          <h2 class="mt-4">Organiser: </h2>
                   
            <img class="card-wrap__creator mt-4" src="${event.creator.avatarUrl}">
          

          
            <h2 class="card-wrap__creatortext mt-4 ml-3">${event.creator.name}</h2>
    
         

        <div class="card-body">
          <h3 class="mb-4">Guests:</h3>
          ${event.guests.map(guests => 
            `<ul class="list-unstyled">
              <li><img class="card-wrap__guest mb-4" width="50" height="50" src="${guests.avatarUrl}"><span class="ml-4">${guests.name}</span></li>
            </ul>
              
            `
            ).join("")
          }
          <div class="card-body">
            <h2><strong>Comments: </strong></h2> 
              ${event.comments.map(comment => 
                `<p>${comment.user.name}</p>
                  <img class="card-wrap__avatar" width="20" height="20" src="${comment.user.avatarUrl}">
                  <span>${comment.message}</span>
                  <br>
                  <p class="mt-2">${comment.timestamp}</p>
                  <hr>
                `
              ).join("")
            }
          </div>    
        </div>  
      </div>
    </div>    
    <hr>
    `
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



