import type {CommandHandler} from './commandhandler.js'
export type CommandsRegistry = Record<string, CommandHandler>
