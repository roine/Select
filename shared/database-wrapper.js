const FILENAME = 'select.sqlite';
const sqlite = require('react-native-sqlite');
const RSVP = require('rsvp');

class DB {

  constructor() {
    this.prepare();
  }

  prepare() {
    let defer = RSVP.defer();
    if (this.database) {
      defer.resolve(this.database);
    }
    else {
      sqlite.open(FILENAME, (error, database)=> {
        if (error) {
          defer.reject(error);
          return;
        }
        this.database = database;
        defer.resolve(database);
      });
    }
    return defer.promise;
  }

  closeHandler(error) {
    if (error) {
      console.log('Failed to close database', error);
      return;
    }
    this.database = null;
  }

  model(model) {
    this.model = model;
    return this;
  }

  all() {
    let result = [];

    return new RSVP.Promise((resolve, reject) => {
      if (!this.model) {
        reject('You didn\'t set a model: new DB().model(\'model\').all()');
        return;
      }
      this.prepare().then(database => {
        let sql = "SELECT * FROM " + this.model + ' ORDER BY ID DESC';
        database.executeSQL(sql, null, rowCallback, completeCallback.bind(this));

      }, reject);

      function rowCallback(row) {
        result.push(row)
      }

      function completeCallback(error) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    });
  }

  create(data) {
    console.log('create call')
    return new RSVP.Promise((resolve, reject) => {
      if (!this.model) {
        reject('You didn\'t set a model: new DB().model(\'model\').create()');
        return;
      }
      // Request the last inserted row and return it in resolve
      this.prepare().then(database => {
        let columns = Object.keys(data);
        let sql = `INSERT INTO ${this.model}(${columns.join(', ')}) VALUES(${columns.map(item => '\'' + data[item] + '\'').join(', ')})`;
        database.executeSQL(sql, null, null, completeCallback.bind(this));
      });

      function completeCallback(error) {
        if (error) {
          reject(error);
        }
        else {
          resolve(true);
        }
      }
    });
  }

  getLastInsertedRow() {
    console.log('called get last');
    var result = [];
    return new RSVP.Promise((resolve, reject)=> {
      this.prepare().then(database => {
        if(!this.model){
          reject('You didn\'t set a model: new DB().model(\'model\').getLastInsertedRow()')
        }
        console.log('prep')
        let sql = `SELECT * from ${this.model} ORDER BY id DESC LIMIT 1`;
        database.executeSQL(sql, null, rowCallback, completeCallback);
        console.log('exec')
        function rowCallback(row) {
          console.log('row', row)
          result.push(row)
        }

        function completeCallback(error) {
          console.log('called last row', error)
          if (error) {
            console.log('err', error)
            reject(error);
          }
          if (result.length) {
            console.log(result)
            resolve(result);
          }
          else {
            console.log(result)
            reject(result);
          }
        }
      });
    });
  }
}


module.exports = {
  FILENAME,
  DB
};