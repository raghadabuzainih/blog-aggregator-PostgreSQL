import { getAllFeedFollows, getFeedFollowsForUser } from "src/lib/db/queries/feedfollows"
import { getByID } from "src/lib/db/queries/feeds"
import { User } from "src/types/user"

//print all the names of the feeds the current user is following.
export async function followingHandler(cmdName: string,user: User, ...args: string[]){
    const feedFollows= await getFeedFollowsForUser(user.id)
    for(const x of feedFollows){
        const [feed] = await getByID(x.feedID)
        console.log(feed.name)
    }
}