const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const app = express();


app.listen(8088);

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

mongoose.connect('mongodb://localhost:27017/movies', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll); // should contain the details of the movies instead of IDs.
app.get('/actors/:id', actors.getOne);
app.post('/actors', actors.createOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.post('/actors/:actorID/:movieID', actors.removeMovie); //Remove a movie from the list of movies of an actor
app.delete('/actors/:id', actors.deleteOne); //Delete an actor and all its movies DONE


//Movie RESTFul  endpoints
app.get('/movies', movies.getAll); //retrieves the details of all actors for each individual movie.
app.get('/movies/:id', movies.getOne);
app.post('/movies', movies.createOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteOne); // Delete a movie by its ID DONE
app.post('/movies/:movieID/:actorID', movies.removeActor); //Remove an actor from the list of actors in a movie
app.post('/movies/:id/actors', movies.addActor); //Add an existing actor to the list of actors in a movie
app.get('/movies/:year1/:year2', movies.getYear)//Retrieve (GET) all the movies produced between year1 and year2, where year1>year2.
app.delete('/movies', movies.deleteYear);//Delete all the movies that are produced between two years.



