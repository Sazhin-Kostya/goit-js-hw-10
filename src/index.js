import axios from "axios";
import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";

const API_KEY = 'live_OjSVPlk5JuIN94iDQmU0szAidryjc7gSzAq0XiTtICIEzoCttwc9ynp8MKU3VKOB';


axios.defaults.headers.common["x-api-key"] = API_KEY;
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';
console.log(axios.defaults.baseURL)


const selectors = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info'),  
}
selectors.select.addEventListener('change', changeBreed)


selectors.select.hidden = true
selectors.error.hidden = true;


fetchBreeds()
 .then(data => {
selectors.select.hidden = false

   data.map(breed =>
     
      selectors.select.insertAdjacentHTML(
        'beforeend',
        `<option value="${breed.id}">${breed.name}</option>`
      )
    );
  })
 .catch(error => {
    selectors.error.hidden = false;
    console.log(error);
  })
  .finally(() => {
    selectors.loader.hidden = true;
  });


function changeBreed() {
  selectors.loader.hidden = false;
    const select = selectors.select.value;
    fetchCatByBreed(select)
      .then(data => {
          
            selectors.error.hidden = true;
            selectors.loader.hidden = false;
            selectors.catInfo.hidden = true;
            selectors.catInfo.innerHTML = `<img src=${data[0].url}
      alt=${data[0].breeds[0].name}
      width="400" >
    <h1>${data[0].breeds[0].name}</h1>
    <p>${data[0].breeds[0].temperament}</p>
    <p>${data[0].breeds[0].description}</p>
    `;
        })
        .catch(err => {
            selectors.error.hidden = false;
            selectors.catInfo.innerHTML = ''
            console.log(err);
        })
        .finally(() => {
            selectors.loader.hidden = true;
            selectors.catInfo.hidden = false;
        });

}
