import { setUser } from "../../config"
import { createUser } from "src/lib/db/queries/users"

export async function registerHandler(cmdName: string, ...args: string[]){
    if(!args[0]) throw new Error('name is required')
    try{
        const result = await createUser(args[0])
        setUser(result.name)
        console.log('user was created', result)
    }catch(err){
        console.error((err as Error).message)
        process.exit(1)
    }
}