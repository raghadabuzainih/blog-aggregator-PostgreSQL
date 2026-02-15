import { setUser } from "config";
import { getByName } from "src/lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]){
	if(args.length === 0){
		console.log("A username is required");
		process.exit(1)
	}
	if((await getByName(args[0])).length === 0) throw new Error('user doesnot exist in DB')
	setUser(args[0])
	console.log('the user has been set')	
}


