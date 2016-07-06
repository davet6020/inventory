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
    res.render('DepartmentsIndex', {'title':'Departments Index'});
  },
  get_create : function(req, res) {
    Util.getSelectUsersActive(res, function(usersRows)   {
      res.render('DepartmentsCreate', {
        'title':'Create New Department',
        'users':usersRows
      }); //End of res.render
    });
  },

  post_create : function(req, res) {
    var sql = `insert into departments
                (id, name, manager_id)
                values (NULL, ?, ?)
              `;
    connection.query(sql, [req.body.departmentName, req.body.user], 
      function(err, rows, field)  {
        if(err) {
          console.log('error: ', err);
          res.render('DepartmentsCreate', {
            'title':'There was an error creating the new record.'
          });
      } else  {
          Util.getSelectUsersActive(res, function(usersRows)   {
            res.render('DepartmentsCreate', {
              'createResults': 'You added new department: ' + req.body.departmentName,
              'title':'Create New Department Entry',
              'users':usersRows
            }); //End of res.render
          }); //End of getSelectUsersActive
      }
    });
  },
  get_read : function(req, res) {
    res.render('DepartmentsRead', {
      'title':'Departments Read'
    });
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
              res.render('DepartmentsRead', {
                'report':'departments',
                'title':'All Departments',
                'rows':rows,
                'columns':columns
              }); //End of res.render
          }
      }); //End of connection.query
  },
  get_list : function(req, res) {
    var columns = 'department manager email';
    var sql = `select * from departments 
                inner join users on departments.manager_id=users.id
                order by departments.name
              `;
    connection.query(sql, function(err, rows, field)  {
      if(err) {
        console.log('error: ', err);
      } else  {
          if (!rows.length) {
            res.render('DepartmentsList', {
              'title':'There is no data for departments'
            });
          } else  {
            Util.getSelectUsersAll(res, req, function(usersName) {
                res.render('DepartmentsList', {
                  'title':'All 303 Departments',
                  'columns': columns,
                  'departments':rows,
                  'users':usersName
                }); //End of res.render
              }); //End of getSelectUsersAll
          }
      }
    });
  },
  get_update : function(req, res) {
    var columns = 'department manager email';
    var sql = `select * from departments 
                inner join users on departments.manager_id=users.id
                order by departments.name
              `;
    connection.query(sql, function(err, rows, field)  {
      if(err) {
        console.log('error: ', err);
      } else  {
          if (!rows.length) {
            res.render('DepartmentsList', {
              'title':'There is no data for departments'
            });
          } else  {
              res.render('DepartmentsList', {
                'title':'All 303 Departments',
                'columns': columns,
                'departments':rows
              });
          }
      }
    });
  },
  post_list : function(req, res) {
    Util.getDepartmentManagerName(res, req, function(mgrName) {
      Util.getSelectManagers(res, function(mgrsRows) {
        res.render('DepartmentsUpdate', {
          'title':'Departments Update',
          'departmentName': req.body.department,
          'depmanager':mgrName,
          'managers':mgrsRows
        }); //End of res.render
      }); //End of getSelectManagers
    }); //End of getDepartmentManagerName
  },
  post_update : function(req, res) {
    var sql = `update departments
                set name=?, manager_id=?
                where name=?
              `;
    connection.query(sql, [req.body.departmentName, req.body.manager, req.body.originalDepartmentName], 
      function(err, rows, field)  {
        if(err) {
          console.log('error: ', err);
        } else  {
            var columns = 'department manager email';
            var sql = `select * from departments 
                        inner join users on departments.manager_id=users.id
                        order by departments.name
                      `;
            connection.query(sql, function(err, rows, field)  {
              if(err) {
                console.log('error: ', err);
              } else  {
                  if (!rows.length) {
                    res.render('DepartmentsList', {
                      'title':'There is no data for departments'
                    });
                  } else  {
                      res.render('DepartmentsList', {
                        'title':'Update Complete',
                        'columns': columns,
                        'departments':rows
                      });
                  }
              }
          });
        }
    });
  },
  get_delete : function(req, res) {
    res.render('DepartmentsDelete', {'title':'Departments Delete'});
  },
  get_one : function(req, res, departmentName) {
    var columns = 'department manager email';
    var sql = `select * from departments 
                inner join users on departments.manager_id=users.id
                where departments.name = ?
              `;
    connection.query(sql, [departmentName], function(err, rows, field)  {
      if(err) {
          console.log('error: ', err);
      } else  {
          if (!rows.length) {
            res.render('DepartmentsRead', {
              'title':'There is no data for department: ' + departmentName
            });
          } else  {
              res.render('DepartmentsRead', {
                'title':'One Department',
                'columns': columns,
                'departments':rows
              });
          }  
      }
    });
  },
  get_all : function(req, res) {
    var columns = 'department manager email';
    var sql = `select * from departments 
                inner join users on departments.manager_id=users.id
                order by departments.name
              `;
    connection.query(sql, function(err, rows, field)  {
      if(err) {
        console.log('error: ', err);
      } else  {
          if (!rows.length) {
            res.render('DepartmentsRead', {
              'title':'There is no data for departments'
            });
          } else  {
              res.render('DepartmentsRead', {
                'title':'All 303 Departments',
                'columns': columns,
                'departments':rows
              });
              //res.json(rows);
          }
      }
    });
  },
}
