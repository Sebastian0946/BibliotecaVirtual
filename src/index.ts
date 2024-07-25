import "reflect-metadata"

import app from "./app";
import {AppDataSource} from "./db";

async function main(){
    try {
        AppDataSource.initialize();

        app.listen(3000)
        console.log('Server listening on port', 3000);
    } catch (error) {
        console.log(error);
    }
}

main();