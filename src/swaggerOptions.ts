import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const setupSwagger = (app: Application) => {
    const swaggerOptions = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: 'Gestión de Usuarios API',
                version: '1.0.0',
                description: 'API para gestión de usuarios',
            },
            servers: [
                {
                    url: `http://localhost:${app.get('port')}`,
                },
            ],
        },
        apis: ['./src/routes/*.ts'],
    };
    

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;
