import { getFeeds } from "src/lib/db/queries/feeds";
import { getById } from "src/lib/db/queries/users";

export async function feedsHandler(cmdName: string, ...args: string[]){
    const feeds = await getFeeds()

    for(const feed of feeds){
        console.log(feed.name)
        console.log(feed.url)
        console.log(await getById(feed.userID))
    }
}