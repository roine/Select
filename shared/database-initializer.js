const sqlite = require('react-native-sqlite');
const schema = require('./schema');
const {FILENAME, DB} = require('./database-wrapper');
class DBInitializer {

  static init() {
    new DB().prepare().then(function (database) {
      Object.keys(schema).forEach(table => {
        let tableSchema = schema[table];
        let params = Object.keys(tableSchema).map(col => col + ' ' + tableSchema[col]);
        let sql = `CREATE TABLE IF NOT EXISTS ${table} (${params.join(', ')})`;
        database.executeSQL(sql, null, rowCallback, completeCallback);
        function rowCallback(result) {
          console.log('rows', result)
        }

        function completeCallback(error) {
          if (error) {
            console.log('DBInit', error, sql2);
            return;
          }
          console.log('Completed');
          database.close(error => {
            if(error){
              console.log('could not close the database', error);
            }
          })

        }
      })
    });
  }

//
  static createDummy(table, data) {
    if(!table || !data || !data.length) {
      console.log('failed', table, data)
      return;
    }

    new DB().prepare().then(database => {
      let current = data.shift()
      //let sql = `INSERT INTO criteria SELECT '${list[0]}' AS 'name', datetime() AS 'created', datetime() AS updated, NULL as id ${list.map(item=> 'UNION ALL SELECT \'' + item + '\', datetime(), datetime(), NULL').join(' ')}`;
      let sql = `INSERT INTO criteria(${Object.keys(current).join(', ')}) VALUES(${Object.keys(current).map(item => '\'' + current[item] + '\'').join(', ')})`;
      console.log(sql);
      console.log('passed sql')
      database.executeSQL(sql, null, completeRow, completeCallback);

      function completeRow(row){

      }

      function completeCallback(error) {
        if (error) {
          console.log(error);
        }
        else {
          if (data.length) {
            DBInitializer.createDummy(table, data);
          }
          else{
            database.close(error => {
              if(error){
                console.log('could not close the database', error);
              }
            })
          }
        }
      }
    })
  }
}

module.exports = DBInitializer;