import { User } from "./user";

//commands which require user
export type UserCommandHandler = (cmdName: string, user:User, ...args: string[]) => Promise<void>