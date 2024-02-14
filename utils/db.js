// Class DBClient
import { MongoClient } from 'mongodb';

const dbhost = process.env.DB_HOST || 'localhost';
const dbport = process.env.DB_PORT || 27017;
const dbdatabase = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${dbhost}:${dbport}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true });
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
