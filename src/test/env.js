process.env.NODE_ENV = "test";
process.env.SEC_TOKEN = "bcp-test-secret";
process.env.CLOUDIN_NAME = process.env.CLOUDIN_NAME || "test-cloud";
process.env.CLOUDIN_KEY = process.env.CLOUDIN_KEY || "test-key";
process.env.CLOUDIN_SEC = process.env.CLOUDIN_SEC || "test-secret";
process.env.AUTHKEY = process.env.AUTHKEY || "Bearer test";
process.env.MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bcp-test";
