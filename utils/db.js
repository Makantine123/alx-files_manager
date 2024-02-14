// Class DBClient
import MongoClient from 'mongodb';

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

    const url = `mongodb://$(this.dbhost):$(this.dbport)`;

    this.client = new MongoClient(url);
    this.client.connect();
    this.db = this.client.db(this.dbdatabase);
  }

  isAlive() {
    try {
      this.client.db().admin().ping();
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
