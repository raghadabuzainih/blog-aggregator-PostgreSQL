import { deleteAllUsers } from "src/lib/db/queries/users"

export async function handlerReset(cmdName: string, ...args: string[]){
    try{
        await deleteAllUsers()
        console.log("users deleted successfully")
        process.exit(0)
    }catch(err){
        console.error((err as Error).message)
        process.exit(1)
    }
}