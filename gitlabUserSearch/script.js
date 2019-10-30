
let users = [];


window.onload = async () => {
  const url = "https://gitlab.com/api/v4/users";

  const response = await fetch(url, {
    method: 'GET',
    headers: { "private-token": "x5DM8cNykx1kn_sayJFS", 'Content-Type': 'application/json' },

  });

  users = await response.json();
  console.log(users);

  createList(users);
};

createList = userList => {
  document.querySelector("#users").innerHTML = userList
    .map(
      user => `<div class="row">                    
                    <div class="col-md-3"><img src="${user.avatar_url}"></div>
                    <div class="col-md-3">Name: ${user.name}</div>
                    <div class="col-md-3">User Name: ${user.username}</div>
                    <div class="col-md-3">GitLab url: ${user.web_url}</div>                    
                </div>`

    )
    .join("");
};