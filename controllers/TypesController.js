var mysql = require('mysql2');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE
});

module.exports = {

  get_index : function(req, res) {
    res.render('TypesIndex', {'title':'Types Index'});
  },
  get_create : function(req, res) {
    res.render('TypesCreate', {'title':'Create New Type'});
  },
  post_create : function(req, res) {
    var sql = `insert into types 
                (id, name) values (NULL, ?);
              `;
    connection.query(sql, [req.body.typeName], 
      function(err, rows, field)  {
      if(err) {
          console.log('error: ', err);
          res.render('TypesCreate', {
            'title':'There was an error creating the new type: ' + req.body.typeName
          });
      } else  {
            res.render('TypesCreate', {'createResults': 'You added type: ' + req.body.typeName});
      }
    });
  },
  get_read : function(req, res) {
    res.render('TypesRead', {'title':'Types Read'});
  },
  get_update : function(req, res) {
    res.render('TypesUpdate', {'title':'Types Update'});
  },
  get_delete : function(req, res) {
    res.render('TypesDelete', {'title':'Types Delete'});
  },
  get_one : function(req, res, typeName) {
    var columns = 'type';
    var sql = `select * from types
                  where types.name = ?
                `;
    connection.query(sql, [typeName], function(err, rows, field)  {
      if(err) {
          console.log('error: ', err);
      } else  {
          if (!rows.length) {
            res.render('TypesRead', {
              'title':'There is no data for type: ' + typeName
            });
          } else  {
              res.render('TypesRead', {
                'title':'One Type',
                'columns': columns,
                'types':rows
              });
          }
      }
    });
  },
  get_all : function(req, res) {
    var columns = 'type';
    var sql = `select * from types
                `;
    connection.query(sql, function(err, rows, field)  {
      if(err) {
          console.log('error: ', err);
      } else  {
          res.render('TypesRead', {
            'title':'All Types',
            'columns': columns,
            'types':rows
          });  
      }
    });
  },
}
