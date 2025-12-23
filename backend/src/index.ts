import { getMongoClient } from 'libs/database';
import app from './app';
import ENV from './configs/envs-config';

getMongoClient().then(() => {
    console.log('MongoDB Connected');
    app.listen(ENV.PORT, () => {
        console.log(`The Server is Running on - http://localhost:${ENV.PORT}`);
    });
}).catch(err => {
    console.log(err);
    process.exit(1);
})

