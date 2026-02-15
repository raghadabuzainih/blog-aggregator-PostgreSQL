import { fetchFeed } from "src/lib/rss/fetchFeed"
import { printFeed } from "src/lib/rss/printFeed"


export async function aggHandler(cmdName: string, ...args: string[]){
    const feed =await fetchFeed('https://www.wagslane.dev/index.xml')
    console.log(await printFeed(feed))
}