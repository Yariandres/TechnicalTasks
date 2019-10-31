
let users = [];

window.onload = async () => {
  const url = "https://gitlab.com/api/v4/users";

  const response = await fetch(url, {
    method: 'GET',
    headers: { "private-token": "x5DM8cNykx1kn_sayJFS", 'Content-Type': 'application/json' },

  });

  users = await response.json();
  createList(users);
};

createList = userList => {
  document.querySelector("#users").innerHTML = userList
    .map(
      user => `<div class="cards">                    
                    <div class="card-img"><img src="${user.avatar_url}"></div>
                    <div class="card-name"><strong>Name:</strong> ${user.name}</div>
                    <div class="card-username"><strong>User Name:</strong> ${user.username}</div>
                    <div class="card-url"><strong>GitLab url:</strong> ${user.web_url}</div>
                    <div class="card-id"><strong>GitLab url:</strong> ${user.id}</div>                  
                </div>
              `
    )
    .join("");
};

applyFilter = () => {
  let searchQuery = document.querySelector("#searchQuery").value;
  let searchType = document.querySelector("#searchType").value;

  if (searchQuery.length >= 1) {
    let filteredUsers = users.filter(user => user[searchType].includes(searchQuery));
    createList(filteredUsers);

  } else {
    createList(users);
  }
};