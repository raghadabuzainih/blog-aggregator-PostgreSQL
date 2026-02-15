import { createFeedFollows } from "src/lib/db/queries/feedfollows"
import { getByURL } from "src/lib/db/queries/feeds"
import { getLoggedUser } from "src/shared/getLoggedUser"

export async function followHandler(cmdName: string, ...args: string[]){
    const url = args[0]
    if(!url) throw new Error('url not found for following')
    const [feed] = await getByURL(url)
    if(!feed) throw new Error('feed not found')
    const user = await getLoggedUser()
    if(!user) throw new Error('user not logged in')
    await createFeedFollows(user.id, feed.id)
    console.log('feed follow created successfully')
    console.log('feed name: ', feed.name)
    console.log('user name: ', user.name)
}