import type {CommandsRegistry} from './commandsRegistry.js'
import type {CommandHandler} from './commandhandler.js'
export async function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler){
	registry[cmdName] = handler
}
