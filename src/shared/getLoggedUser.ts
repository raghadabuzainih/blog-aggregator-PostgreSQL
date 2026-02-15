import { readConfig } from "config"
import { getByName } from "src/lib/db/queries/users"

export async function getLoggedUser(){
    const userName = readConfig().currentUserName
    if(!userName) throw new Error('no user log in')
    const [user] = await getByName(userName)
    return user
}