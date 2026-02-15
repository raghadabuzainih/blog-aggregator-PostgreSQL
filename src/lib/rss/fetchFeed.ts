export async function fetchFeed(feedURL: string){
    const result = await fetch(feedURL, {
        method: 'get',
        headers: {
            'User-Agent': 'gator'
        }
    })
    console.log('before')
    console.log(result)
    console.log('after')
    console.log(await result.text())
    return await result.text()
}