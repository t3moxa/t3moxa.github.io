if ('serviceWorker' in navigator) {
    window.addEventListener('load' , () => {
        navigator.serviceWorker.register('/service-worker.js')
                  .then(registration => {
            console.log('Service Worker registered with scope:' , registration.scope);
        }).catch(error => {
            console.log('Service Worker registration failed:' , error);
        });
    });
}

function onLoad() {
	for(let i=0; i<localStorage.length; i++) {
		let key = localStorage.key(i);
		addToPage(key)
	}
}

function buttonClick() {
	let login = document.getElementById("login").value; 
	let password = document.getElementById("password").value;
	if ((login == "") || (password == "")) {
		alert("Логин и/или пароль не введён!")
	} else {
		localStorage[login] = password;
		addToPage(login);
	}
}

function addToPage(key) {
	let loginList = document.getElementById("login_list")
	let p = document.createElement("p");
	p.innerText = key + " " + localStorage[key];
	loginList.append(p);
}