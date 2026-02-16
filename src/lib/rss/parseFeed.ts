import {XMLParser} from 'fast-xml-parser'
import { Feed } from 'src/types/feed'
import { RSSFeed } from './rssFeed'

export async function parseFeed(xmlString: string){
    const parser = new XMLParser()
    const jsObj = parser.parse(xmlString)
    return jsObj
}