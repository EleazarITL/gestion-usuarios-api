# Gestion de Usuarios API

Descripción del Proyecto:
API para gestionar usuarios, que permite realizar las siguientes operaciones básicas:

• Alta de Usuario: Crear un nuevo usuario en el sistema.
• Consulta de Usuarios: Listar todos los usuarios o consultar un usuario específico por su ID.
• Modificación de Usuario: Actualizar los datos de un usuario registrado.
• Baja de Usuario: Eliminar un usuario del sistema por su ID.

Función que se puede ejecutar n cantidad de veces e imprime la cantidad de veces que se ha ejecutado.

## Tecnologías Usadas

**NodeJS** versión 20.18.0
**Express** Framework web para NodeJS
**Swagger** Documentación automatizada.

## Instalación

Sigue los siguientes pasos para configurar el proyecto en tu entorno local:

**Clona el repositorio**
git clone https://github.com/EleazarITL/gestion-usuarios-api.git

**Navega al directorio del proyecto**
cd gestion-usuarios-api

**Instala las dependencias**
npm install

**Ejecuta la compilación**
npm run build

**Ejecuta el servidor**
npm run dev

# Indicaciones de acceso a Swagger
Para acceder a la documentación de la API, visita la siguiente URL: `http://localhost:3000/api-docs`

# Realizar pruebas básicas de la API

Para realizar pruebas de la API, podemos usar Swagger y sus casos de prueba, accediendo a la siguiente URL: `http://localhost:3000/api-docs/`

Otra manera de probar los metodos es utilizando herramientas como `https://www.postman.com/`.

### 1. Usando Postman

1. **Descarga e Instala Postman**:
   - Si no tienes Postman instalado, descárgalo desde `https://www.postman.com/downloads/` e instálalo.

2. **Configuración de las Solicitudes**:
   - Abre Postman y crea una nueva colección para organizar tus pruebas.
   - Agrega nuevas solicitudes con los siguientes detalles:

   **Registrar un nuevo usuario (POST)**
   - URL: `http://localhost:3000/api/usuarios/registrar`
   - Método: `POST`
   - Body:
     ```json
     {
       "name": "Ejemplo",
       "email": "ejemplo@correo.com"
     }
     ```

   **Obtener todos los usuarios (GET)**
   - URL: `http://localhost:3000/api/usuarios/obtener`
   - Método: `GET`

   **Obtener usuario por ID (GET)**
   - URL: `http://localhost:3000/api/usuarios/obtenerPorID/1`
   - Método: `GET`

   **Actualizar usuario (PUT)**
   - URL: `http://localhost:3000/api/usuarios/actualizar/1`
   - Método: `PUT`
   - Body:
     ```json
     {
       "name": "Nuevo Nombre",
       "email": "nuevo@correo.com"
     }
     ```

   **Eliminar usuario (DELETE)**
   - URL: `http://localhost:3000/api/usuarios/eliminar/1`
   - Método: `DELETE`

   **Contador (GET)**
   - URL: `http://localhost:3000/api/usuarios/contador`
   - Método: `GET`

