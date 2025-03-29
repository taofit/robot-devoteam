import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { isValidSize, isValidPosition, isValidCommand } from "./services/validation";
import readline from "readline";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

app.get("/", (req: Request, res: Response) => {
	res.send("Express - TypeScript Server");	
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

/**
 * Function to initialize the robot's grid size
 */
const initRobot = () => {
	rl.question("Please enter the size of the grid (e.g., 5 5): ", (sizeInput) => {
		const size = sizeInput.trim();
		if (isValidSize(size)) {
			initPosition();
		} else {
			console.log(`Invalid size`);
			initRobot(); // Restart the process if size is invalid
		}
	});
}

/**
 * Function to initialize the robot's position and direction
 */
const initPosition = () => {
	rl.question("Please enter the position of the robot and its direction (e.g., 1 2 N): ", (positionInput) => {
		const position = positionInput.trim();
		if (isValidPosition(position)) {
			initCommand();
		} else {
			console.log(`Invalid position`);
			initPosition(); // Restart the process if position is invalid
		}
	});
}

/**
 * Function to initialize the robot's commands
 */
function initCommand() {
	rl.question("Please enter the commands for the robot (e.g., LRFLRFFRLFFRF): ", (commandInput) => {
		const commands = commandInput.trim(); // Trim the input to remove extra spaces
		if (isValidCommand(commands)) {
			console.log(`Commands accepted: ${commands}`);
			rl.close();
		} else {
			console.log(`Invalid commands`);
			initCommand(); // Restart the process if commands are invalid
		}
	});
}

initRobot();
