import { Request, Response } from "express";

interface User {
    id: number;
    name: string;
    email: string;
}

const users: User[] = [];
let userIdCounter = 1;

let counter = 0;

class UserController {
    /**
        * Registra un nuevo usuario en el sistema.
        * 
        * @param req - Contiene los datos del nuevo usuario.
        * @param req.body {name: string, email: string} - Los datos necesarios para registrar un usuario, donde:
        *   - `name`: Nombre del usuario (requerido).
        *   - `email`: Correo electrónico del usuario (debe ser único, requerido).
        * @param res - Contiene la respuesta que se enviará al cliente.
        * @returns {object} - Un objeto con la respuesta, que incluye:
        *   - `message`: Mensaje de éxito o error.
        *   - `data`: Información del usuario registrado (en caso de éxito).
    */
    public async addNew(req: Request, res: Response): Promise<void> {
        const { name, email } = req.body;

        try {
            if (!name || !email) {
                res.status(400).json({ message: 'El nombre y el correo son obligatorios.' });
                return;
            }

            const userExists = users.some((user) => user.email === email); // Validamos que el email no exista ya dentro del objeto, utilizando el método some, ya que este si encuentra una coincidencia nos regresará un valor true o false en caso de que no exista el email.
            if (userExists) {
                res.status(400).json({ message: 'El correo ya está registrado.' });
                return;
            }

            const newUser: User = {
                id: userIdCounter++,
                name,
                email,
            };

            users.push(newUser);

            res.status(201).json({ message: 'Usuario registrado con éxito.', data: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Error al intentar registrar el usuario, favor de revisar su conexión a internet', error });
        }
    }
    /**
        * Obtener todos los usuarios registrados en el sistema.
        * 
        * @param req - No contiene datos en el cuerpo, ya que es un método GET.
        * @param req.body {} - El cuerpo de la solicitud está vacío en un método GET.
        * @param res - Contiene la respuesta que se enviará al cliente.
        * @returns {object} - Un objeto con la respuesta, que incluye:
        *   - `message`: Mensaje de éxito.
        *   - `data`: Array de objetos que contienen la información de los usuarios registrados (en caso de éxito).
    */
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json({ message: 'Se han obtenido los usuarios con éxito.', data: users });
        } catch (error) {
            res.status(500).json({ message: 'Error al intentar obtener los usuarios, favor de revisar su conexión a internet.', error });
        }
    }
    /**
        * Obtener usuario por su id.
        * 
        * @param req - No contiene datos en el cuerpo, ya que es un método GET.
        * @param req.params /id - Contiene el id del usuario en el parametro del path.
        * @param res - Contiene la respuesta que se enviará al cliente.
        * @returns {object} - Un objeto con la respuesta, que incluye:
        *   - `message`: Mensaje de éxito.
        *   - `data`: Array de objetos que contienen la información de los usuarios registrados (en caso de éxito).
        *  
    */
    public async getByID(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const user = users.find((user) => user.id === Number(id)); // Buscamos el usuario dentro del objeto users, usando el id.
            if (!user) {
                res.status(404).json({ message: 'Usuario no encontrado.' });
                return;
            }
            res.status(200).json({ message: 'Usuario obtenido con éxito.', data: user });
        } catch (error) {
            res.status(500).json({ message: 'Error al intentar obtener el usuario, favor de revisar su conexión a internet.', error });
        }
    }

    /**
        * Actualizar usuario por su id.
        * 
        * @param req - Contiene los nuevos datos del usuario que se va a actualizar.
        * @param req.params /id - Contiene el id del usuario en el parametro del path.
        * @param req.body {name: string, email: string} - Los datos necesarios para actualizar un usuario, donde:
        *   - `name`: Nombre del usuario (requerido).
        *   - `email`: Correo electrónico del usuario (debe ser único, requerido).
        * @param res - Contiene la respuesta que se enviará al cliente.
        * @returns {object} - Un objeto con la respuesta, que incluye:
        *   - `message`: Mensaje de éxito.
        *   - `data`: Array de objetos que contienen la información de los usuarios registrados (en caso de éxito).
        *  
    */
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { name, email } = req.body;
        try {
            const userIndex = users.findIndex((user) => user.id === Number(id)); // Buscamos el index del usuario, usando el id.
            if (userIndex === -1) {
                res.status(404).json({ message: 'Usuario no encontrado.' });
                return;
            }
            const userExists = users.some((user) => user.email === email && user.id !== Number(id)); // Validamos que el email no exista ya dentro del objeto, utilizando el método some, ya que este si encuentra una coincidencia nos regresará un valor true o false en caso de que no exista el email.
            if (userExists) {
                res.status(400).json({ message: 'El correo ya está registrado por otro usuario.' });
                return;
            }

            users[userIndex] = { id: Number(id), name, email };
            res.status(200).json({ message: 'Usuario actualizado con éxito.', data: users[userIndex] });
        } catch (error) {
            res.status(500).json({ message: 'Error al intentar actualizar el usuario, favor de revisar su conexión a internet.', error });
        }
    }
    /**
        * Eliminar usuario por su id.
        * 
        * @param req - No contiene datos en el cuerpo, ya que es un método DELETE.
        * @param req.params /id - Contiene el id del usuario en el parametro del path.
        * @param res - Contiene la respuesta que se enviará al cliente.
        * @returns {object} - Un objeto con la respuesta, que incluye:
        *   - `message`: Mensaje de éxito.
        *   - `data`: Array de objetos que contienen la información de los usuarios registrados (en caso de éxito).
        *  
    */
    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const userIndex = users.findIndex((user) => user.id === Number(id)); // Buscamos el index del usuario, usando el id.
            if (userIndex === -1) {
                res.status(404).json({ message: 'Usuario no encontrado.' });
                return;
            }
            users.splice(userIndex, 1); // Eliminamos el usuario dentro del objeto users
            res.status(200).json({ message: 'Usuario eliminado con éxito.' });
        } catch (error) {
            res.status(500).json({ message: 'Error al intentar eliminar el usuario, favor de revisar su conexión a internet.', error });
        }
    }

    /**
        * Obtener el conteo de ejecuciones.
        * 
        * @param req - No contiene datos en el cuerpo, ya que es un método GET.
        * @param res - Contiene la respuesta que se enviará al cliente.
        * @returns {object} - Un objeto con la respuesta, que incluye:
        *   - `message`: Mensaje de éxito.
        *   - `data`: Array de objetos que contienen la información de los usuarios registrados (en caso de éxito).
        *  
    */
    public async countExecutions(req: Request, res: Response): Promise<void> {
        try {
            let counted = ++counter; // Guardamos la suma de conteos en la variable counted.
            res.json({ message: 'Se ha ejecutado: ' + counted, success: true, data: counted });
        } catch (error) {
            res.status(500).json({ message: 'Error al intentar obtener el número de ejecuciones, favor de revisar su conexión a internet.', error });
        }
    }
}

const userController = new UserController();

export default userController;
