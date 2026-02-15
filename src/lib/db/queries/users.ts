import { db } from "../index";
import { users } from "../schema";
import { eq } from "drizzle-orm";

export async function createUser(name: string){
    if((await getByName(name)).length > 0) throw new Error('user already exists')
    const [result]= await db.insert(users).values({name: name}).returning()
    return result
}

export async function getByName(name: string){
    return await db.select().from(users).where(eq(users.name, name))
}

export async function deleteAllUsers(){
    await db.delete(users)
}

export async function getAllUsers(){
    return await db.select().from(users)
}