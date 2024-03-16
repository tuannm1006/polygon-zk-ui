const { exec } = require("child_process");

const currentDir = __dirname;

exec(
  `node ../../node_modules/swagger-react-generator -T ts -I "${currentDir}/src/swagger/docs.json" -C "./src/swagger/ts.mustache" -O "${currentDir}/src/swagger/generated-api/index.ts"`,
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  }
);

// exec(
//   `node ../../node_modules/swagger-react-generator -T ts -I "${currentDir}/src/swagger/ranking-docs.json" -C "./src/swagger/ts.mustache" -O "${currentDir}/src/swagger/ranking-generated-api/index.ts"`,
//   (error, stdout, stderr) => {
//     if (error) {
//       console.log(`error: ${error.message}`);
//       return;
//     }
//     if (stderr) {
//       console.log(`stderr: ${stderr}`);
//       return;
//     }
//     console.log(`stdout: ${stdout}`);
//   }
// );
