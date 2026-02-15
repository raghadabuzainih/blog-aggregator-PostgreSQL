import { feeds } from "../schema";
import { db } from "../index";
import { eq } from "drizzle-orm";

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