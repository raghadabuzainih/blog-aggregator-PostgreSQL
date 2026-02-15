import { readConfig } from "config";
import { getAllUsers } from "src/lib/db/queries/users";

export async function handlerUsers(cmdName: string, ...args: string[]){
    try{
        const users = await getAllUsers()
        for(const user of users){
            if(user.name === readConfig().currentUserName) console.log(user.name + " (current)")
            else console.log(user.name)
        }
        process.exit(0)
    }catch(err){
        console.log((err as Error).message)
        process.exit(1)
    }
}
