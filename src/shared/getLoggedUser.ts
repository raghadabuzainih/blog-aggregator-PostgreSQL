import { readConfig } from "config"
import { getByName } from "src/lib/db/queries/users"
import { CommandHandler } from "src/types/commandHandler"
import { UserCommandHandler } from "src/types/userCommandHandler"

export async function getLoggedUserMiddleWare(handler: UserCommandHandler): Promise<CommandHandler>{
    return async(cmdName: string, ...args: string[]) => {
        const userName = readConfig().currentUserName
        if(!userName) throw new Error('no user log in')
        const [user] = await getByName(userName)

        return handler(cmdName, user, ...args)
    }  
}