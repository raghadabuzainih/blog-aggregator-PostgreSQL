import { parseFeed } from "./parseFeed";
import { RSSItem } from "./rssFeed";

export async function printFeed(feedString: string){
    const objResult = await parseFeed(feedString)
    if(!objResult.rss) throw new Error("Invalid RSS format")
    const {channel} = objResult.rss
    let items = [] as RSSItem[]

    //check metadata
    if(!channel) throw new Error('channel not found')

    const {title, link, description, item} = channel
    if(!title) throw new Error('channel title not found')
    if(!link) throw new Error('channel link not found')
    if(!description) throw new Error('channel desctiption not found')
    
    if(item){
        if(Array.isArray(item)){
            for(const x of item){
                const {title, link, description,pubDate} = x
                console.log(x)
                if(title && link && description && pubDate) 
                    items.push({title, link, description, pubDate}) 
            }
        }else{
            const {title, link, description,pubDate} = item
            if(title && link && description && pubDate) items.push({title, link, description, pubDate}) 
        }
    }

    const feed = {
        'channel' : {
            title,
            link,
            description,
            item: items
        }
    }
    return feed
}