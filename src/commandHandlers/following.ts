import { getAllFeedFollows, getFeedFollowsForUser } from "src/lib/db/queries/feedfollows"
import { getByID } from "src/lib/db/queries/feeds"
import { getLoggedUser } from "src/shared/getLoggedUser"

//print all the names of the feeds the current user is following.
export async function followingHandler(cmdName: string, ...args: string[]){
    const user = await getLoggedUser()
    if(!user) throw new Error('user not logged in')
    const feedFollows= await getFeedFollowsForUser(user.id)
    for(const x of feedFollows){
        const [feed] = await getByID(x.feedID)
        console.log(feed.name)
    }
}