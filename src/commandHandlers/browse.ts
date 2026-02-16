import { getPostsForUser } from "src/lib/db/queries/posts"
import { User } from "src/types/user"

//get posts for user
export async function browsehandler(cmdName: string, user: User, ...args: string[]): Promise<void>{
    const limit = args[0]
    if(limit){ //limit(must be number)
        if(typeof limit !== 'number') throw new Error('limit must be number')
        await getPostsForUser(user.id, limit)
    }else await getPostsForUser(user.id) //if not limited return only 2(its default)
}