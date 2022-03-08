const serverUrl = 'http://localhost:3000';

/* Global variables*/


/*Events*/



/*
const home = document.getElementById('home')
const addCat = document.getElementById('add-cat')
const toAllCats = document.getElementById('all-cats');

*/

/*home.addEventListener('click', async() => {
    location.assign(serverUrl + '/');
});

addCat.addEventListener('click',  async() => {
    location.assign(serverUrl + '/add-cat')
});

toAllCats.addEventListener('click',  async() => {
    location.assign(serverUrl + '/all-cats')
});
*/


/*
const baseUrl = 'www.hakunamatata.com';




const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

let url = '/data';

const getData = async ()=> {
    const response = await fetch(url);

    try {
        const data = await response.json();
    }
    catch {
        console.log('error', error);
    }
}*/
