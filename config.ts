import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
	dbUrl: string,
	currentUserName?: string
}

export function setUser(userName: string){
	const config = readConfig();
	const dbUrl = config.dbUrl;
	writeConfig({dbUrl, currentUserName: userName});
}

export function readConfig(): Config{
	const filePath = getConfigFilePath();
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const parsed = JSON.parse(fileContent);
	return validateConfig(parsed);
}

function getConfigFilePath(): string{
	return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(cfg: Config): void{
	const filePath = getConfigFilePath();
	const string = JSON.stringify(cfg);
	fs.writeFileSync(filePath, string);
}

function validateConfig(rawConfig: any): Config{
	if(!rawConfig.dbUrl) throw new Error('this is not config type');
	return {dbUrl: rawConfig.dbUrl, currentUserName: rawConfig.currentUserName};
}
