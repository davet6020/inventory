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
    res.render('UsersIndex', {'title':'Users Index'});
  },
  get_create : function(req, res) {
    Util.getSelectDepartments(res, function(departmentsRows) {
      Util.getSelectStatus(res, function(statusRows)   {

          res.render('UsersCreate', {
            'title':'Create New User',
            'departments':departmentsRows,
            'status':statusRows
          }); //End of res.render

      }); //End of getSelectStatus
    }); //End of getSelectDepartments
  },

  post_create : function(req, res) {
    var sql = `insert into users 
                (id, email, lastname, firstname, department_id, status) values (NULL, ?, ?, ?, ?, ?);
              `;
    connection.query(sql, [req.body.email, req.body.lastName, req.body.firstName, req.body.dept_id, req.body.st_id], 
      function(err, rows, field)  {
      if(err) {
          console.log('error: ', err);
          res.render('UsersCreate', {
            'title':'There was an error creating the new vendor: ' + req.body.firstName + ' ' + req.body.lastName
          });
      } else  {

          Util.getSelectDepartments(res, function(departmentsRows) {
            Util.getSelectStatus(res, function(statusRows)   {
              res.render('UsersCreate', {
                'createResults': 'You added user: ' + req.body.firstName + ' ' + req.body.lastName,
                'title':'Create New User',
                'departments':departmentsRows,
                'status':statusRows
              }); //End of res.render
            }); //End of getSelectStatus
          }); //End of getSelectDepartments
      }
    });
  },
  get_read : function(req, res) {
  },
  get_update : function(req, res) {
    res.render('UsersUpdate', {'title':'Users Update'});
  },
  post_edit : function(req, res) {
    var columns = 'Pick a user you want to make changes to';
    var sql = `select * from users
                where users.email = ?
              `;
    connection.query(sql, [req.body.email], function(err, rows, field)  {
      if(err) {
          console.log('error: ', err);
      } else  {
          if (!rows.length) {
            res.render('UsersRead', {
              'title':'There is no data for users'
            });
          } else  {
              res.render('UsersUpdate', {
                'title':'Update a User',
                'columns': columns,
                'users':rows
              });
          }
      }
    });
  },
  post_update : function(req, res) {
    console.log(req.body.email, req.body.lastname, req.body.firstname, req.body.department_id, req.body.status);

    var columns = 'Updated User';
    var sql = `update users set
                email = ?, lastname = ?, firstname = ?,
                department_id = ?, status = ?
                where email = ?
              `;
    connection.query(sql, [req.body.email, req.body.lastname, req.body.firstname, req.body.department_id, req.body.status, req.body.email], 
      function(err, rows, field)  {
      if(err) {
          console.log('error: ', err);
      }
    });
  },
  get_delete : function(req, res) {
    res.render('UsersDelete', {'title':'Users Delete'});
  },
  get_one : function(req, res, userLastName) {
    var columns = 'name email';
    var sql = `select * from users 
                where users.lastname = ?
              `;
    connection.query(sql, [userLastName], function(err, rows, field)  {
      if(err) {
          console.log('error: ', err);
      } else  {
          if (!rows.length) {
            res.render('VendorsRead', {
              'title':'There is no data for user: ' + userLastName
            });
          } else  {
              res.render('UsersRead', {
                'title':'One User',
                'columns': columns,
                'users':rows
              });
          }
      }
    });
  },
  get_all : function(req, res) {
    var columns = 'Pick a user you want to make changes to';
    var sql = `select * from users 
                inner join departments on users.department_id=departments.id
                  where users.status = 1 
                  order by lastname
              `;
    connection.query(sql, function(err, rows, field)  {
      if(err) {
          console.log('error: ', err);
      } else  {
          if (!rows.length) {
            res.render('UsersRead', {
              'title':'There is no data for users'
            });
          } else  {
              res.render('UsersRead', {
                'title':'All 303 Software Users',
                'columns': columns,
                'users':rows
              });
          }
      }
    });
  }
}
