const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // const {title} = request.query;

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const project = {id: uuid(), title: title, url, techs, likes: 0};
  
  repositories.push(project);

  

  return response.json(project);

});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;
  const ids = [];

  for(reps in repositories){
    ids.push(repositories[reps].id)
  }

  if (ids.find(myId => myId === id) === undefined){
    return response.status(400).json({message:'Invalid ID'});
  }

  const repository = repositories.find(item => item.id === id)
  const index = repositories.indexOf(repository)

  repository.title = title;
  repository.url = url;
  repository.techs = techs

  repositories[index] = repository;

  return response.json(repository);


});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const ids = [];

  for (reps in repositories){
    ids.push(repositories[reps].id);
  }

  if (ids.find(myID => myID === id) === undefined){
    return response.status(400).json({message: 'No Content'})
  }

  const indexRepo = repositories.findIndex(repos => repos.id === id)
  // const index = repositories.indexOf(repository)
  repositories.splice(indexRepo,1)

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  
  // this part creates a array with all of the existent ids in the repository
  const ids = [];
  for (obj in repositories){
    ids.push(repositories[obj].id)
  }
  console.log(ids);

  //to check if the params id exists in the repositories
  if(ids.find(myId => myId === id) === undefined){
    return response.status(400).json({message: 'Invalid ID'})
  }

  const repository = repositories.find(item => item.id = id);
  console.log(repository);
  const index = repositories.indexOf(repository);

  repository.likes += 1

  repositories[index] = repository;

  
  return response.json(repository)
});

module.exports = app;
