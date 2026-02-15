import type {CommandsRegistry} from './types/commandsRegistry.js'
import type {CommandHandler} from './types/commandHandler.js'
export async function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler){
	registry[cmdName] = handler
}
