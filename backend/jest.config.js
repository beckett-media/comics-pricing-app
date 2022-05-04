const tsPreset = require("ts-jest/jest-preset")
module.exports = {
  ...tsPreset,
  testEnvironment: "node",
  //this stuff was to mock mongo client, but we use mongoose...
  // ...mongoPreset,
  // mongodbMemoryServerOptions: {
  //   binary: {
  //     version: "4.0.3",
  //     skipMD5: true,
  //   },
  //   instance: {
  //     dbName: "alder",
  //   },
  //   autoStart: false,
  // },
}
