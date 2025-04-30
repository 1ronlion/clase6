import db from "../database/charts.json"
import { writeFile } from "jsonfile"

const PATH = './src/database/charts.json'

abstract class ChartModel {

    private static async writeDB(){
        return writeFile(PATH, db)
    }
    
    private static async writeInfo(){

        const usersLength = db.charts.length
        db.info.charts = usersLength

        return this.writeDB()

    }

    static async getAll(){
        return db.charts
    }

    static async findChart(username: string){
         return db.charts.find((user) => user.name === username) 
    }

    static async create(){}
    static async update(){}


    static async delete(username:string){

        const findChart = db.charts.findIndex((chart) => chart.name === username)

        if(findChart === -1){ return 404 }

        const chartDeleted = db.charts[findChart]

        db.charts.splice(findChart, 1)

        await this.writeDB()

        await this.writeInfo()

        return chartDeleted

    }

}

export default ChartModel