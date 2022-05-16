import { config, createApp } from "./loader"

createApp().listen(config.port, () => {
  console.log(`Started on port ${config.port}...`)
})
