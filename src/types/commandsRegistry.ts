import type {CommandHandler} from './commandHandler.js'
export type CommandsRegistry = Record<string, CommandHandler>
