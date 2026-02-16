import { feeds } from "../schema";
import { db } from "../index";
import { eq } from "drizzle-orm";
import { fetchFeed } from "src/lib/rss/fetchFeed";
import { parseFeed } from "src/lib/rss/parseFeed";
import { printFeed } from "src/lib/rss/printFeed";
import { Feed } from "src/types/feed";

export async function createFeed(name: string, url: string, userId: string){
   return await db.insert(feeds).values({name, url, userID: userId}).returning()
}

export async function getFeeds(){
    return await db.select().from(feeds)
}

export async function getByID(id: string){
    return await db.select().from(feeds).where(eq(feeds.id, id))
}

export async function getByURL(url: string){
    return await db.select().from(feeds).where(eq(feeds.url, url))
}

//set the last_fetched_at and updated_at columns to the current time
export async function markFeedFetched(id: string){
    const now = new Date()
    await db.update(feeds).set({updatedAt: now, lastFetchedAt: now})
        .where(eq(feeds.id, id))
}

export async function getNextFeedToFetch(){
    const feeds = await getFeeds()
    if(feeds.length === 0) return
    let min = feeds[0].lastFetchedAt
    let minFetchedFeed= {} as Feed
    //priority to fetch -> feeds were still not fetched(priority for first null) 
    //but if all fetched then the priority for oldest
    for(const feed of feeds){
        if(!feed.lastFetchedAt){
            return feed
        }else if(min !== null && feed.lastFetchedAt < min){
            min = feed.lastFetchedAt
            minFetchedFeed = feed
        }
    }
    return minFetchedFeed
}

// Get the next feed to fetch from the DB.
// Mark it as fetched.
// Fetch the feed using the URL (we already wrote this function)
// Iterate over the items in the feed and print
export async function scrapeFeeds(){
    const feed = await getNextFeedToFetch()
    if(!feed) return 'feed not found'
    await markFeedFetched(feed.id)
    const feedByURL = await fetchFeed(feed.url)
    await printFeed(feedByURL)
}
