import express from "express";
import config from "./config.js";
import router from "./routes/route.js"
import mongoose from "mongoose";


const app = express();

//Middleware for parsing our request body
app.use(express.json());

app.get('/', (request, response) => {
    // console.log(request);
    return response.status(200).send('Welcome')
})

//Mounting login router to the app
app.use('/api', router)

mongoose
    .connect(config.mongoDBURL)
    .then(() => {
        console.log('App connected to database')
        app.listen(config.PORT, () => {
            console.log(`App is listening to port: ${config.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    });