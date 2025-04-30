import ChartModel from "../model/chart-model";
import { Request, Response } from 'express';

abstract class ChartController {

    static async getAll(req: Request, res: Response){

        const charts = await ChartModel.getAll()
        res.json(charts)
    }

    static async getByName(req: Request, res: Response){

        const chartName = req.params.name
        const chart = await ChartModel.findChart(chartName)

        res.json(chart)

    }

    static async delete(req: Request, res: Response){

        const userName = req.params.name
        const chartDeleted = await ChartModel.delete(userName)

        if(chartDeleted === 404){

            return res.json({message: "Carta no encotrada"}).status(404)

        }else{

            return res.status(200).json({message: "Carta eliminada", chartDeleted})

        }

    }


}

export default ChartController