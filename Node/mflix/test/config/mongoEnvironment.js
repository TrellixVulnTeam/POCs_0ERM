const MongoClient = require("mongodb").MongoClient
const NodeEnvironment = require("jest-environment-node")
module.exports = class MongoEnvironment extends NodeEnvironment {
  async setup() {
    if (!this.global.mflixClient) {
      this.global.mflixClient = await MongoClient.connect(
        process.env.MFLIX_DB_URI,
        // TODO: Connection Pooling
        // Set the connection pool size to 50 for the testing environment.
        // TODO: Timeouts
        // Set the write timeout limit to 2500 milliseconds for the testing environment.
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      )
      await super.setup()
    }
  }

  async teardown() {
    // console.log(this.global.mflixClient)
    await this.global.mflixClient.close()
    await super.teardown()
  }

  runScript(script) {
    return super.runScript(script)
  }
}
