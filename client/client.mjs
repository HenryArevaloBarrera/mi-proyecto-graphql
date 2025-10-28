fetch("http://localhost:4000/", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    query: `{ dishes { id name price } }`
  })
})
  .then(resp => resp.json())
  .then(resp => console.log("Todos los platos:", resp.data.dishes))
  .catch(err => console.log(err));


let query = `
  query getDish($dishId: ID!) {
    dish(id: $dishId) {
      id
      name
      price
    }
  }
`;

fetch("http://localhost:4000/", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    query,
    variables: { "dishId": 2 } 
  })
})
  .then(resp => resp.json())
  .then(resp => console.log("Plato por ID:", resp.data.dish))
  .catch(err => console.log(err));


let mutation = `
  mutation updateDish($id: ID!, $name: String, $price: Float) {
    updateDish(id: $id, name: $name, price: $price) {
      id
      name
      price
    }
  }
`;

fetch("http://localhost:4000/", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    query: mutation,
    variables: {
      "id": 1,
      "name": "Bandeja Paisa ",
      "price": 30.0
    }
  })
})
  .then(resp => resp.json())
  .then(resp => console.log("Plato actualizado:", resp.data.updateDish))
  .catch(err => console.log(err));
