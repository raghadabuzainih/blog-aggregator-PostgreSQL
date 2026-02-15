import { readConfig } from "config";
import { createFeed } from "src/lib/db/queries/feeds";
import { getByName } from "src/lib/db/queries/users";
import { Feed } from "src/types/feed";
import { User } from "src/types/user";

export async function getLoggedUser(){
    const userName = readConfig().currentUserName
    if(!userName) throw new Error('no user log in')
    const [user] = await getByName(userName)
    return user
}

export async function addFeedHandler(cmdName: string, ...args: string[]){
    const user = await getLoggedUser()
    if(!args[0] || !args[1]) throw new Error('name or url not found')
    const feed = await createFeed(args[0], args[1], user.id)
    printFeed(user, feed[0])
}

export function printFeed(user: User, feed: Feed){
    console.log("Feed fields: ")
    console.log("ID: ",feed.id)
    console.log("Name: ",feed.name)
    console.log("Created At: " ,feed.createdAt)
    console.log("Updated At: ",feed.updatedAt)
    console.log("URL: ",feed.url)
    console.log("User ID: ",feed.userID)
}