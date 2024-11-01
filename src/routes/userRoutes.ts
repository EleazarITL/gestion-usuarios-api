import { Router } from 'express';
import userController from '../controllers/userController';

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: API para gestión de usuarios
 */

class UserRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        /**
         * @swagger
         * /api/usuarios/registrar:
         *   post:
         *     summary: Registrar un nuevo usuario
         *     description: Crea un nuevo usuario con nombre y correo electrónico. El correo debe ser único.
         *     tags: [Usuarios]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - name
         *               - email
         *             properties:
         *               name:
         *                 type: string
         *                 description: Nombre del usuario.
         *               email:
         *                 type: string
         *                 description: Correo del usuario (único).
         *     responses:
         *       201:
         *         description: Usuario registrado con éxito.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                 user:
         *                   type: object
         *                   properties:
         *                     id:
         *                       type: integer
         *                     name:
         *                       type: string
         *                     email:
         *                       type: string
         *       400:
         *         description: Error de validación o correo duplicado.
         *       500:
         *         description: Error del servidor.
         */
        this.router.post('/registrar', userController.addNew);
        /**
         * @swagger
         * /api/usuarios/obtener:
         *   get:
         *     summary: Obtener todos los usuarios
         *     description: Devuelve una lista de todos los usuarios registrados en el sistema.
         *     tags: [Usuarios]
         *     responses:
         *       200:
         *         description: Lista de usuarios obtenida con éxito.
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   id:
         *                     type: integer
         *                   name:
         *                     type: string
         *                   email:
         *                     type: string
         *       500:
         *         description: Error del servidor.
         */
        this.router.get('/obtener', userController.getAll);
        /**
         * @swagger
         * /api/usuarios/obtenerPorID/{id}:
         *   get:
         *     summary: Obtener un usuario por ID
         *     description: Devuelve los detalles de un usuario específico utilizando su ID.
         *     tags: [Usuarios]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         description: ID del usuario a obtener.
         *         schema:
         *           type: integer
         *     responses:
         *       200:
         *         description: Usuario obtenido con éxito.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 id:
         *                   type: integer
         *                 name:
         *                   type: string
         *                 email:
         *                   type: string
         *       404:
         *         description: Usuario no encontrado.
         *       500:
         *         description: Error del servidor.
         */
        this.router.get('/obtenerPorID/:id', userController.getByID);
        /**
         * @swagger
         * /api/usuarios/actualizar/{id}:
         *   put:
         *     summary: Actualizar un usuario
         *     description: Actualiza los datos de un usuario existente.
         *     tags: [Usuarios]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         description: ID del usuario a actualizar.
         *         schema:
         *           type: integer
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *                 description: Nombre del usuario.
         *               email:
         *                 type: string
         *                 description: Correo del usuario (debe ser único).
         *     responses:
         *       200:
         *         description: Usuario actualizado con éxito.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *       400:
         *         description: Error de validación o correo duplicado.
         *       404:
         *         description: Usuario no encontrado.
         *       500:
         *         description: Error del servidor.
         */
        this.router.put('/actualizar/:id', userController.update);
        /**
         * @swagger
         * /api/usuarios/eliminar/{id}:
         *   delete:
         *     summary: Eliminar un usuario
         *     description: Elimina un usuario del sistema utilizando su ID.
         *     tags: [Usuarios]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         description: ID del usuario a eliminar.
         *         schema:
         *           type: integer
         *     responses:
         *       204:
         *         description: Usuario eliminado con éxito.
         *       404:
         *         description: Usuario no encontrado.
         *       500:
         *         description: Error del servidor.
         */
        this.router.delete('/eliminar/:id', userController.delete);
        /**
         * @swagger
         * /api/usuarios/contador:
         *   get:
         *     summary: Contar ejecuciones
         *     description: Devuelve la cantidad total de ejecuciones realizadas hasta ahora.
         *     tags: [Usuarios]
         *     responses:
         *       200:
         *         description: Se ha obtenido la cantidad total de ejecuciones.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Se ha ejecutado: 5"
         *                 success:
         *                   type: boolean
         *                   example: true
         *                 data:
         *                   type: integer
         *                   description: Número total de ejecuciones contadas.
         *                   example: 5
         *       500:
         *         description: Error del servidor.
         */
        this.router.get('/contador', userController.countExecutions);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
