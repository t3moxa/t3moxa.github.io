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

function saveButtonClick() {
	let url = document.getElementById("url").value;
	let login = document.getElementById("login").value; 
	let password = document.getElementById("password").value;
	if ((url == "") || (login == "") || (password == "")) {
		alert("URl и/или логин и/или пароль не введён!")
	} else {
		localStorage[url] = [login, password];
		addToPage(url);
	}
}

function addToPage(key) {
	let urlList = document.getElementById("url_list")
	let p = document.createElement("p");
	p.innerText = key + " " + localStorage[key];
	urlList.append(p);
}

//Я ни разу не криптограф и не знаю насколько на самом деле сложным выходит пароль, но мне просто захотелось сделать дурацкую переусложнённую функцию для генерации :D
function generateButtonClick() {
	let cryptArray = new Uint32Array(10)
	self.crypto.getRandomValues(cryptArray)
	let key = cryptArray[Number(String(cryptArray[0])[0])]
	let value = cryptArray[Number(String(cryptArray[0])[1])]
	let pass = new String()
	for (let i = 0; i < key.toString().length; i++) {
		if (i > value.toString().length)
			break
		let num = Number(String(key)[i])
		
		if (num % 2 == 0) {
			pass = pass + String(Number(String(value)[i]))
		}
		else {
			pass = pass + (Number(String(value)[i]) + 9).toString(36).toUpperCase()
		}
	}
	
	document.getElementById("password").value = pass
}