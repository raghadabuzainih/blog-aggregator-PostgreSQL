import { deleteFeedFollow } from "src/lib/db/queries/feedfollows"
import { User } from "src/types/user"

export async function unFollowHandler(cmdName: string,user: User, ...args: string[]){
    if(!args[0]) throw new Error('url is required')
    await deleteFeedFollow(user.id, args[0])
}