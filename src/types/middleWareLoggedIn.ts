import { CommandHandler } from "./commandHandler";
import { UserCommandHandler } from "./userCommandHandler";

export type middleWareLoggedIn = (handler: UserCommandHandler) => CommandHandler