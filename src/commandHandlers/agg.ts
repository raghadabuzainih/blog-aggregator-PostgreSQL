import { getFeeds, scrapeFeeds } from "src/lib/db/queries/feeds"

export async function aggHandler(cmdName: string, ...args: string[]){
    if(!args[0]) throw new Error('time between requests is required')
    const timeBetweenRequests = parseDuration(args[0])
    console.log('collecting feeds every ', timeBetweenRequests, ' ms')
    const feeds = await getFeeds()
    setInterval(async()=> {
        await scrapeFeeds()
    }, timeBetweenRequests)
}

//convert to ms
function parseDuration(durationStr: string): number{
    //check if string begins with number & has unit(ms/s/m/h)
    const regex = /^(\d+)(ms|s|m|h)$/
    const match = durationStr.match(regex)
    //for ex: "10x", "ab", "" -> match is null 
    if(!match) throw new Error('invalid duration string')
    //if "100ms" -> match array will be -> ["100ms", "100", "ms"]
    let unit = match[2]
    let number = parseInt(match[1])

    switch(unit){
        case 'ms': return number
        case 's': return number * 1000
        case 'm': return number * 60 * 1000
        case 'h': return number * 60 * 60 * 1000
        default: throw new Error('invalid duration unit')
    }
}