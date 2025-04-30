import db from "../database/users.json"
import { writeFile } from "jsonfile"
import { randomUUID } from "node:crypto"
import { createHash } from "node:crypto"
import registerEvent from "../middlewares/events"

const PATH = './src/database/users.json'

abstract class UserModel {

    private static encrypt(password: string): string{

        const hash = createHash("sha256").update(password).digest('hex')
        return hash

    }

    private static compareHash(password: string, hash: string): boolean{

        const input = this.encrypt(password)

        if(input === hash){
            return true
        }

        return false
    }

    private static async writeDB(){
        return writeFile(PATH, db)
    }

    private static async writeInfo(){

        const usersLength = db.users.length
        db.info.users = usersLength

        return this.writeDB()

    }
    
    static async getAll(){
        return db.users
    }

    static async findUser(id: string){
         return db.users.find((user) => user.id === id) 
    }
    
    static async findUserByName(username: string){
        return db.users.find((user) => user.name === username) 
    }

    static async checkToken(usertoken:string){
        return db.users.find((user) => user.token === usertoken)
    }

    static async createUser(data: any){

        const {name, email, password, isAdmin} = data
        const id = randomUUID()
        const hashPass = this.encrypt(password)

        const findUser = await this.findUserByName(name)

        if(findUser) return 400

        const newUser = { id, name, email, password: hashPass, token: "", isAdmin}

        db.users.push(newUser)
        
        await this.writeDB()

        return { name, email}

    }

    static async login(data: any){

        const { name, password } = data

        const findUser = await this.findUserByName(name)

        if(!findUser) return 404
        
        if(findUser.token != "") return 409
        
        const comparePassword = this.compareHash(password, findUser.password)

        if(comparePassword === false) return 400

        const token = randomUUID()
        findUser.token = token

        await registerEvent(token, name)

        await this.writeDB()

        return token

    }

    static async update(){}

    static async delete(username:string){

        const findUser = db.users.findIndex((user)=> user.name === username)

        if(findUser === -1){ return 404 }

        const userDeleted = db.users[findUser]

        db.users.splice(findUser, 1)

        await this.writeDB()

        await this.writeInfo()

        return userDeleted

    }

    static async logout (userId: any){

       const findUser = await this.findUser(userId)

        if(!findUser) return 404

    //    if(findUser.token === "") return 409 

       findUser.token = ""

       await this.writeDB()

       return 202   

    }


}

export default UserModel