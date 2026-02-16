import type {CommandsRegistry} from './types/commandsRegistry.js'
import {runCommand} from './runCommand.js'
import { registerCommand } from './registerCommand.js'
import { registerHandler } from './commandHandlers/register.js'
import { handlerReset } from './commandHandlers/reset.js'
import { handlerUsers } from './commandHandlers/users.js'
import { aggHandler } from './commandHandlers/agg.js'
import { handlerLogin } from './commandHandlers/login.js'
import { addFeedHandler } from './commandHandlers/addFeed.js'
import { feedsHandler } from './commandHandlers/getFeeds.js'
import { followHandler } from './commandHandlers/follow.js'
import { followingHandler } from './commandHandlers/following.js'
import { getLoggedUserMiddleWare } from './shared/getLoggedUser.js'
import { unFollowHandler } from './commandHandlers/unfollow.js'
import { browsehandler } from './commandHandlers/browse.js'

async function main() {
  let commandsRegistry: CommandsRegistry= {}
  const args = process.argv.slice(2)
  if(args.length === 0){
    console.log('not enough arguments were provided')
  	process.exit(1)
  }
  const cmdName = args[0];
  const cmdArgs = args.slice(1);

  //all commands
  await registerCommand(commandsRegistry, 'login', handlerLogin)
  await registerCommand(commandsRegistry, 'register', registerHandler)
  await registerCommand(commandsRegistry, 'reset', handlerReset)
  await registerCommand(commandsRegistry, 'users', handlerUsers)
  await registerCommand(commandsRegistry, 'agg', aggHandler)
  await registerCommand(commandsRegistry, 'addfeed', await getLoggedUserMiddleWare(addFeedHandler))
  await registerCommand(commandsRegistry, 'feeds', feedsHandler)
  await registerCommand(commandsRegistry, 'follow', await getLoggedUserMiddleWare(followHandler))
  await registerCommand(commandsRegistry, 'following', await getLoggedUserMiddleWare(followingHandler))
  await registerCommand(commandsRegistry, 'unfollow', await getLoggedUserMiddleWare(unFollowHandler))
  await registerCommand(commandsRegistry, 'browse', await getLoggedUserMiddleWare(browsehandler))

  try {
    await runCommand(commandsRegistry, cmdName, ...cmdArgs);
    process.exit(0)
  } catch (err) {
    console.error((err as Error).message);
    process.exit(1);
  }
}

main();
