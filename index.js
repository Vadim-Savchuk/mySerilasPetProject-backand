import express  from 'express';
import mongoose from 'mongoose';
import dotenv   from 'dotenv';
import cors     from 'cors';

import authRoute   from './routes/auth.js';
import serialRoute from './routes/serial.js';

const app = express();
      dotenv.config();

// Constants
const PORT    = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/serial', serialRoute);

async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ad37www.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
        )

        app.listen(PORT, error => {
            if (error) {
                console.log(`Server do not started. Erro ${error}`);
            }

            console.log(`Server started`);
        })

    } catch (error) {
        console.log(`Server do not started. Erro ${error}`);
    }
}

start();