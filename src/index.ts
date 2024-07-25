import "reflect-metadata"

import app from "./app";
import {AppDataSource} from "./db";

import { PORT } from "./config";

async function main(){
    try {
        AppDataSource.initialize();

        app.listen(PORT)
        console.log('Server listening on port', PORT);
    } catch (error) {
        console.log(error);
    }
}

main();