import { feed_follows } from "../schema";
import { db } from "../index"
import { eq } from "drizzle-orm";
import { getById } from "./users";
import { getByID } from "./feeds";
import { feedFollows } from "src/types/feedFollows";

export async function createFeedFollows(userID: string, feedID: string){    
    return await db.insert(feed_follows).values({userID, feedID}).returning()
}

//for debbuging
export async function getAllFeedFollows(){    
    return await db.select().from(feed_follows)
}

export async function getFeedFollowsForUser(userId: string){
    const feedFollows = await db.select().from(feed_follows).where(eq(feed_follows.userID, userId))
    await printFeedFollows(feedFollows)
    return feedFollows
}

export async function printFeedFollows(feedFollows: feedFollows[]){
    for(const x of feedFollows){
        const [feed] = await getByID(x.feedID)
        console.log(feed.name)
        const [user] = await getById(x.userID)
        console.log(user.name)
    }
}