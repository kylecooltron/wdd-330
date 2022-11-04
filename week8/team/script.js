


const baseURL = "https://swapi.dev/api/people"

const cardHolder = document.querySelector(".card-holder");


function processPageInfo(data){
  cardHolder.innerHTML = "";
  if(data){
    data.results.forEach((element) => {
      cardHolder.innerHTML = cardHolder.innerHTML + `<h1> ${element.name} </h1>`;
    });
  }


  const but = document.createElement('button');
  but.innerHTML = ">";
  but.addEventListener('click', () => {
    getPage(data.next);
  });
  cardHolder.appendChild(but);

  const limit = 10;

  for(let i=0;i<data.count/10;i++){

    const pagin = document.createElement('button');

    pagin.innerHTML = `${(i*10)+1} - ${Math.min((i*10)+10, data.count)}`;
    
    pagin.addEventListener('click', () => {
      getPage(baseURL + `/?page=${i+1}`);
    });

    cardHolder.appendChild(pagin);
  }

}


function getPage(URL){
  fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    processPageInfo(data);
    console.log(data);
  }
  );

}


// call to start
getPage(baseURL);


