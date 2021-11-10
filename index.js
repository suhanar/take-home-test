function userData(){
    //console.log("hello");
    /*fetch('https://jsonplaceholder.typicode.com/users/')
    .then(response => {
        return response.json();
       
    })
    .then(data =>{
        
        /*let output = '<h4>List of users</h4>';
        output += '<ul>';
          data.forEach(element => {
              output += `<li id="btn">${element.name}</li> `;
              
              
              
          });
        output += '</ul>';
        document.getElementById('names').innerHTML = output;
        
        
        
    })*/

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            appendUser(data);
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });

    function appendUser(data) {
        var mainContainer = document.getElementById("users");
        for (var i = 0; i < data.length; i++) {
            var table = document.createElement("table");
            table.innerHTML =  data[i].username;
            table.classList.add('table');
            table.dataset.userId = data[i].id;
            table.addEventListener('click', (event) => getPosts(event))
            mainContainer.appendChild(table);
        }

    }

    function cleanPosts() {
        var users = document.querySelectorAll('.table ul');
        for(var i = 0; i < users.length; i++) {
            if(users[i]) {
                users[i].style.display = 'none';
            }
        }
    }

    function getPosts(event) {

        var userId = event.target.dataset.userId;

        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => response.json())
            .then(json => showPosts(json, event.target))
    }

    function showPosts(posts, target) {
        var postsList = target.childNodes[1];

        cleanPosts();

        if(postsList){
            postsList.style.display = 'block';
        } else {
            var list = document.createElement("ul");

            for (var i = 0; i < posts.length; i++) {

                var item = document.createElement("li");
                var title = document.createElement("strong");
                var body = document.createElement("p");

                title.innerHTML = posts[i].title;
                body.innerHTML = posts[i].body;

                item.appendChild(title);
                item.appendChild(body);
                list.appendChild(item);
            }

            target.appendChild(list);
        }

    }

}   
userData();


