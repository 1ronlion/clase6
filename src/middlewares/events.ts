import { writeFile } from "jsonfile"
import db from "../database/events.json"

const PATH = './src/database/events.json'


async function registerEvent(token: string, username: string) {

    let event = {

        name : username,
        token: token,
        date: new Date().toString(),
        event: "Login"

    }

    db.push(event)
    
    return writeFile(PATH, db)

}

export default registerEvent