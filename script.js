let container = document.createElement('div')
container.classList.add('container')

let row = document.createElement('div')
row.classList.add('row')

container.appendChild(row)
document.body.append(container)

let req = new XMLHttpRequest();

req.open('GET', 'https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json', true);
req.send();

let promise = new Promise(function (resolve, reject) {
  req.onload = function () {
    resolve(JSON.parse(this.response));
  };
  req.onerror = function () {
    reject('Error occured');
  };
});

promise
  .then((data) => {
    console.log(data);
    data.forEach(v => {
        row.append(
        createcard(v.name,v.flag,v.capital,v.alpha2Code,v.region,v.latlng[0],v.latlng[1])
        )
    })
  })
  .catch((error) => {
    console.log(error);
  });






const createcard = (country,src,capital,code,region,lat,lng) => {
  
  let col = document.createElement('div')
  col.setAttribute('class','col-lg-3 col-md-4 col-sm-12')

  let card = document.createElement('div')
  card.classList.add('card')

  let h5 = document.createElement('h5')
  h5.innerText = country

  let img = document.createElement('img')
  img.classList.add('card-img-top')
  img.src = src

  let cardbody = document.createElement('div')
  cardbody.classList.add('card-body')

  let p1 = document.createElement('p');
  p1.classList.add('card-text')
  p1.innerText = `Capital : `

  let span = document.createElement('span')
  span.setAttribute('class','badge badge-success');
  span.innerHTML = capital;

  p1.appendChild(span)

  let p2 = document.createElement('p');
  p2.classList.add('card-text')
  p2.innerHTML = `Country Code : <b>${code}</b> `

  let p3 = document.createElement('p')
  p3.classList.add('card-text')
  p3.innerHTML = `Region : <b>${region}</b>`

  let p4 = document.createElement('p')
  p4.classList.add('card-text')
  p4.innerHTML = `LatLong : <b>${Math.ceil(lat)},${Math.ceil(lng)}</b>`

  cardbody.append(p1,p2,p3,p4)



  card.append(h5,img,cardbody)

  col.appendChild(card)

  return col

}


