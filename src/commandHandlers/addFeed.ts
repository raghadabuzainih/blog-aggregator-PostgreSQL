import { createFeedFollows } from "src/lib/db/queries/feedfollows";
import { createFeed } from "src/lib/db/queries/feeds";
import { getLoggedUser } from "src/shared/getLoggedUser";
import { Feed } from "src/types/feed";
import { User } from "src/types/user";

export async function addFeedHandler(cmdName: string, ...args: string[]){
    const user = await getLoggedUser()
    if(!args[0] || !args[1]) throw new Error('name or url not found')
    const feed = await createFeed(args[0], args[1], user.id)
    const feedFollow = await createFeedFollows(user.id, feed[0].id)
    console.log('feed Name: ', feed[0].name)
    console.log('current user name: ', user.name)
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