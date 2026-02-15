import {XMLParser} from 'fast-xml-parser'

export async function parseFeed(xmlString: string){
    const parser = new XMLParser()
    const jsObj = parser.parse(xmlString)
    return jsObj
}