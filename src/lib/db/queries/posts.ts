import { Post } from "src/types/post";
import { db } from "..";
import { feeds, posts } from "../schema";
import { desc, eq } from "drizzle-orm";

// Create a createPost function. This should insert a new post into the database.
// Create a getPostsForUser function. Order the results so that the most recent posts are first.
//  Make the number of posts returned configurable.

export async function createPost(post: Post){
    await db.insert(posts).values(post)
}

export async function getPostsForUser(userId: string, limit=2){
    //user id come from feed which comes from feed id in post schema
    //so we must use join
    return db.select().from(posts)
        .innerJoin(feeds, eq(feeds.id, posts.feed_id))
        .where(eq(feeds.userID, userId))
        .orderBy(desc(posts.published_at))
        .limit(limit)
}