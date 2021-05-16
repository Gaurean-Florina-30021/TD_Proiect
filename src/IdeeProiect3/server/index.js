var api = require('./src/api.js').app;
const fs = require('fs');
const laptopsFilepath = './src/laptops.json';

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/laptops', function (request, response) {
  response.json(getLaptops());
});

api.get('/laptops/:id', function (request, response) {
  let laptop = getLaptopById(request.params.id);
  if (laptop) response.json(laptop);
  response.json('not found');
});

api.put('/laptops', function (request, response) {
  saveLaptops(request.body);
  response.json('User was saved succesfully');
});

api.post('/laptops', function (request, response) {
  // in request o sa-mi vina un obiect de tip car care o sa aiba un anumit id
  // console.log(request.body);//un obiect de tipul car actualizat pe client
  // citim cars din fisier pe baza id-ului primit de la client
  let laptop = request.body;
  let laptops = getLaptops();// citire json din fisier
  // cautam daca exista id de pe request.body
  // daca exista actualizam parametrii acestui produs/item
  for(let i=0; i < laptops.length; i++) {
    if (laptops[i].id === laptop.id) {
      laptops[i] = laptop;
    }
  }

  // salvam in fisier produsele actualizate
  try {
    fs.writeFileSync(laptopsFilepath, JSON.stringify(laptops));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }

  response.json('Laptop was updated succesfully');
});

api.delete('/laptops/:index', function (request, response) {
  // delete din fisier pe baza unui id
  // cars.splice(request.params.index, 1);

  response.json('The laptop with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getLaptops() {
  let laptops = [];
  try {
    laptops = JSON.parse(fs.readFileSync(laptopsFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return laptops;
}

function saveLaptop(laptop) {
  let laptops = getLaptops();// citire json din fisier
  let maxId = getMaxId(laptops);  // get maximum id form cars array
  laptop.id = maxId+1;// generare id unic
  laptops.push(laptop);// adaugare masina noua in array
  try {
    fs.writeFileSync(laptopsFilepath, JSON.stringify(laptops));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(laptops) {
  let max = 0;
  for (var i=0; i<laptops.length;i++) {
    if(max < laptops[i].id) {
      max = laptops[i].id;
    }
  }
  return max;
}

function getLaptopById(id){
  let laptops = getLaptops();// citire json din fisier
  let selectedLaptop = null;
  for(var i=0; i<laptops.length; i++) {
    if(id == laptops[i].id) selectedLaptop = laptops[i];
  }
  return selectedLaptop;
}

