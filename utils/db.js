// Class DBClient
import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const {
      DB_HOST = 'localhost',
      DB_PORT = 27017,
      DB_DATABASE = 'files_manager',
    } = process.env;

    this.dbhost = DB_HOST;
    this.dbport = DB_PORT;
    this.dbdatabase = DB_DATABASE;

    this.client = new MongoClient(`mongodb://${this.dbhost}:${this.dbport}/${this.dbdatabase}`, { userUuseUnifiedTopology: true });
    this.client.connect();
  }

  isAlive() {
    try {
      this.client.isConnected();
      return true;
    } catch (error) {
      return false;
    }
  }

  async nbUsers() {
    const usersCollection = this.db.collection('users');
    const count = await usersCollection.countDocument();
    return count;
  }

  async nbFiles() {
    const filesCollection = this.db.collection('files');
    const count = await filesCollection.countDocument();
    return count;
  }
}

const dbClient = new DBClient();
export default dbClient;
