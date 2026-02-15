import { feeds } from "../schema";
import { db } from "../index";

export async function createFeed(name: string, url: string, userId: string){
   return await db.insert(feeds).values({name, url, userID: userId}).returning()
}