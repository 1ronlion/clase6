import { Router } from "express"
import ChartController from "../controllers/chart-controller"

export const ChartRouter = Router()

// GET | 127.0.0.1/api/charts --> Obtener todas las cartas natales.
ChartRouter.get("/", ChartController.getAll)

// GET | 127.0.0.1/api/charts/:name --> Obtener una carta natal por nombre.
ChartRouter.get("/:name", ChartController.getByName)

// POST | 127.0.0.1/api/charts --> Crear nueva carta natal.
ChartRouter.post("/")

// PATCH | 127.0.0.1/api/charts/:id --> Actualizar una carta natal.
ChartRouter.patch("/:id")

// DELETE | 127.0.0.1/api/charts/:name --> Eliminar una carta natal.
ChartRouter.delete("/:name", ChartController.delete)