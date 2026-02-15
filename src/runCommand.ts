import type{CommandsRegistry} from './types/commandsRegistry.js'
export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]){
	const handler = registry[cmdName]
	if(!handler) throw new Error('unknown command '+ cmdName)
	await handler(cmdName, ...args)
}
