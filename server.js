const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./models/movieModel');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/', (req,res)=>{
    res.send("Sumit - This is an API Server!!!")
})

//Find All Movies
app.get('/movies', async (req, res)=>{
    try {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
})

//Find Movie by Id
app.get('/movies/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const movie = await Movie.findById(id);
        res.status(200).json(movie);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
})

//Add a Movie to the Database
app.post('/movies', async (req, res)=>{
    try {
        const movie = await Movie.create(req.body);
        res.status(200).json(movie);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
})

//Updtae a Movie by ID
app.put('/movies/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const movie = await Movie.findByIdAndUpdate(id, req.body);
        if(!movie){
            return res.status(404).json({message : `Cannot find movie with ID - ${id}`})
        }
        const updatedMovie = await Movie.findById(id);
        res.status(200).json(updatedMovie);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
})

//Delete a movie by id
app.delete('/movies/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const movie = await Movie.findByIdAndDelete(id, req.body);
        if(!movie){
            return res.status(404).json({message : `Cannot find movie with ID - ${id}`})
        }
        res.status(200).json(movie);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
})

mongoose.connect('mongodb+srv://root:root@crudapi.uplsaqf.mongodb.net/Node-Api?retryWrites=true&w=majority')
.then(()=>{
    console.log("Connected Successfully to MongoDb!!");
    app.listen(3000, ()=>{
        console.log("Port running on Port 3000!!!");
    })
}).catch((error)=>{
    console.log(error);
})