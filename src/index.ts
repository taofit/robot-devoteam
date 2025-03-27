import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express - TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

const initRobot = () => {
  console.log(`please enter size of the table`);
  process.stdin.on("data", (d) => {
    const size = d.toString().trim();
    const isValidSize = size.match(/^[1-9][0-9]*\s[1-9][0-9]*$/);

    if (isValidSize) {
      console.log(`please enter position of robot and its direction`);
      process.stdin.once("data", (d) => {
        const position = d.toString().trim();
        const isValidPosition = position.match(/^[0-9]+\s[0-9]+\s(N|E|S|W)$/);

        if (isValidPosition) {
          console.log(`please enter command for robot`);

          process.stdin.once("data", (d) => {
            const command = d.toString().trim();
            const isValidCommand = command.match(/^[LRF]+$/);

            if (isValidCommand) {
              console.log(`Report: ${position} ${command}`);
              console.log(`please enter position of robot and its direction`);
            } else {
              console.log(`Invalid command`);
              process.exit(0);
            }
          });
        } else {
          console.log(`Invalid position`);
          process.exit(0);
        }
      });
    } else {
      console.log(`Invalid size`);
      process.exit(0);
    }
  });
  // process.stdin.on('readable', () => { 
  //   let chunk; 
  //   // Use a loop to make sure we read all available data. 
  //   while ((chunk = process.stdin.read()) !== null) { 
  //    process.stdout.write(`data: ${chunk}`); 
  //   } 
  // });
}

initRobot();