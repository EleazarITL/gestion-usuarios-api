import express, { Application } from 'express';

import userRoutes from './routes/userRoutes';
import setupSwagger from "./swaggerOptions";

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        setupSwagger(this.app);
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {
        this.app.use('/api/usuarios', userRoutes);
    }


    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();
