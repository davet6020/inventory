var mysql = require('mysql2');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE
});

var Util = require('../utils/Utils');

module.exports = {

  get_index : function(req, res) {
    res.render('Reports', {

    }); //End of res.render
  },
  get_departments : function(req, res)  {
      var sql = `select d.name as 'Department', u.lastname as 'LastName', u.firstname as 'FirstName', u.email as 'Email'
                  from departments as d
                  join users  as u on d.manager_id=u.id
                  order by d.name
                  `;

      connection.query(sql, function(err, rows, columns)  {
          if(err) {
              console.log('error: ', err);
          } else {
              res.render('Reports', {
                'report':'departments',
                'title':'All Departments',
                'rows':rows,
                'columns':columns
              }); //End of res.render
          }
      }); //End of connection.query
  },
  get_hardwares : function(req, res)  {
      var sql = `select types.name as 'Type', vendors.name as 'Vendor', serial_number as 'Serial', series as 'Series', 
                    model as 'Model', cpu as 'CPU', ram as 'Ram', hard_drive as 'HDD', os as 'OS', graphics as 'Graphics', 
                    bluetooth as 'Bluetooth', wireless as 'WiFi', security as 'Security', cdrom as 'CD_DVD', 
                    state as 'State'
                        from hardware
                            inner join types on hardware.type_id=types.id
                            inner join vendors on hardware.manufacturer=vendors.id
                            order by types.name
                      `;

      connection.query(sql, function(err, rows, columns)  {
          if(err) {
              console.log('error: ', err);
          } else {
              res.render('Reports', {
                'report':'hardwares',
                'title':'All Departments',
                'rows':rows,
                'columns':columns
              }); //End of res.render
          }
      }); //End of connection.query
  },
  get_types : function(req, res)  {
      var sql = `select name as 'Name' from types
                  order by name
                `;
      connection.query(sql, function(err, rows, columns)  {
          if(err) {
            console.log('error: ', err);
          } else {
          res.render('Reports', {
            'report':'types',
            'title':'All Types',
            'rows':rows,
            'columns':columns
          }); //End of res.render
        }
      }); //End of connection.query
  },
  get_users : function(req, res)  {
      var sql = `select u.firstname as 'FirstName', u.lastname as 'LastName', u.email as 'Email' from users as u
                  left join departments as d on u.department_id=d.id 
                  where status=1
                  order by lastname
                `;
      connection.query(sql, function(err, rows, columns)  {
          if(err) {
            console.log('error: ', err);
          } else {
          res.render('Reports', {
            'report':'users',
            'title':'All Users',
            'rows':rows,
            'columns':columns
          }); //End of res.render
        }
      }); //End of connection.query
  },
  get_vendors : function(req, res)  {
      var sql = `select name as 'Name' from vendors
                  order by name
                `;
      connection.query(sql, function(err, rows, columns)  {
          if(err) {
            console.log('error: ', err);
          } else {
          res.render('Reports', {
            'report':'vendors',
            'title':'All Vendors',
            'rows':rows,
            'columns':columns
          }); //End of res.render
        }
      }); //End of connection.query
  },
  get_index : function(req, res) {
    res.render('Reports', {

    }); //End of res.render
  },
}
