const FILENAME = 'select.sqlite';
const sqlite = require('react-native-sqlite');
const RSVP = require('rsvp');

class DB {

  constructor() {
    this.prepare();
  }

  prepare() {
    return new RSVP.Promise((resolve, reject) => {
      if (this.database) {
        resolve(this.database);
        return;
      }
      sqlite.open(FILENAME, (error, database)=> {
        if (error) {
          reject(error);
          return;
        }
        this.database = database;
        resolve(database);
      });
    })

  }

  model(model) {
    this.model = model;
    return this;
  }

  add(data) {
  }

  test(){
    console.log('from test',this._all())
  }


  async all() {
    let result = [];
    if (!this.model) {
      return { error: 'You didn\'t set a model: new DB().model(\'model\').all()' };
    }

    return await new RSVP.Promise((resolve, reject) => {
      this.prepare().then((database) => {
        let sql = "SELECT * FROM " + this.model +' ORDER BY ID DESC';
        database.executeSQL(sql, null, rowCallback, completeCallback);
      }, reject);

      function rowCallback(row){
        result.push(row)
      }

      function completeCallback(error) {
        if (error) {
          reject(error);
          return;
        }
        console.log('result', result)
        resolve(result)

      }
    });

  }


}


module.exports = {
  FILENAME,
  DB
};