import { Router } from "express"
import UserController from "../controllers/user-controller"
import isAuth from "../middlewares/auth"
import isAdmin from "../middlewares/admin"

export const UserRouter = Router()


// GET | 127.0.0.1/api/users --> Obtener todos los usuarios registrados.
UserRouter.get("/", UserController.getAll)

// GET | 127.0.0.1/api/users/:id --> Obtener un usuario por su id.
UserRouter.get("/:id", UserController.getById)

// POST | 127.0.0.1/login --> Login de usuario.
UserRouter.post("/login", UserController.login)

// PATCH | 127.0.0.1/api/users/logout/:id --> Logout de usuario.
UserRouter.delete("/logout", isAuth, UserController.logout)

// POST | 127.0.0.1/api/users --> Dar de alta nuevo usuario.
UserRouter.post("/", isAuth, isAdmin, UserController.create)

// PATCH | 127.0.0.1/api/users/:id --> Actualizar un usuario.
UserRouter.patch("/:id")

// DELETE | 127.0.0.1/api/users/delete/:id --> Eliminar un usuario.
UserRouter.delete("/delete", isAuth, isAdmin, UserController.delete)

// NOT FOUND | 127.0.0.1/api/users/* --> Manejo de errores.
UserRouter.use("*", UserController.error)


