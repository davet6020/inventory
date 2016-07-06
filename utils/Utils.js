var mysql = require('mysql2');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE
});


/**
 * Get a specific report from the reports table based on user request.
 */
exports.getReport = function(res, req, done) {
  var sql = `select * from reports
              where id = 1
            `;
  
  connection.query(sql, function(Err, rows, columns)  {
    if(Err) {
      console.log('Error: ', Err);
    }

    done(rows);
  });
} //End getSelectDepartments


/**
 * Gives a list of departments ordered by departments.name
 */
exports.getSelectDepartments = function(res, done) {
  var sql = `select * from departments
              order by name
            `;
  
  connection.query(sql, function(Err, rows, columns)  {
    if(Err) {
      console.log('Error: ', Err);
    }

    done(rows);
  });
} //End getSelectDepartments


/**
 * Returns firstname and lastname of manager for a given department.
 */
exports.getDepartmentManagerName = function(res, req, done) {
  var sql = `select d.manager_id, u.firstname, u.lastname from departments as d
              inner join users as u on d.manager_id=u.id
              where d.name = ?
            `;

  connection.query(sql, [req.body.department], function(Err, rows, field)  {
    if(Err) {
      console.log('Error: ', Err);
    }

    done(rows);
  });
} //End getDepartmentManagerName


/**
 * Returns firstname and lastname of users that are existing managers
 * denoted by their user_id being associated with a department.
 */
exports.getSelectManagers = function(res, done) {
  var sql = `select d.manager_id, u.firstname, u.lastname from departments as d
              inner join users as u on d.manager_id=u.id
            `;
  
  connection.query(sql, function(Err, rows, field)  {
    if(Err) {
      console.log('Error: ', Err);
    }

    done(rows);
  });
} //End getSelectManagers


/**
 * Gives a list of Status ordered by status.name
 */
exports.getSelectStatus = function(res, done) {
  var sql = `select * from status
              order by name
            `;
  
  connection.query(sql, function(Err, rows, field)  {
    if(Err) {
      console.log('Error: ', Err);
    }

    done(rows);
  });
} //End getSelectStatus


/**
 * Gives a list of Types ordered by types.name
 */
exports.getSelectTypes = function(res, done) {
  var sql = `select * from types
                order by types.name
             `;
  
  connection.query(sql, function(Err, rows, field)  {
    if(Err) {
      console.log('Error: ', Err);
    }

    done(rows);
  });
} //End getSelectTypes


/**
 * Gives a list of all vendors ordered by vendor name
 * Vendors and Manufacturers both come from this list.
 */
exports.getSelectVendors = function(res, done) {
  var sql = `select * from vendors
              order by vendors.name
            `;
  
  connection.query(sql, function(Err, rows, field)  {
    if(Err) {
      console.log('Error: ', Err);
    }

    done(rows);
  });
} //End getSelectVendors


/**
 * Gives a list of all users which could be active,
 * conference rooms, vendors, inactive, or not employees
 */
exports.getSelectUsersAll = function(res, done) {
  var sql = `select * from users
              order by users.firstname
            `;
  
  connection.query(sql, function(Err, rows, columns)  {
    if(Err) {
      console.log('Error: ', Err);
    }

    done(rows);
  });
} //End getSelectUsersAll


/**
 * Gives a list of all users where status = 1
 * status 1 is for only active users
 */
exports.getSelectUsersActive = function(res, done) {
  var sql = `select * from users
              where users.status = 1
              order by users.firstname
            `;
  
  connection.query(sql, function(Err, rows, field)  {
    if(Err) {
      console.log('Error: ', Err);
    }

    done(rows);
  });
} //End getSelectUsersActive


/**
 * If res.lastname has "dox" in it, force the firstname to be 'Elizabeth'.
 */
exports.unDoxument = function(res, done) {
  if(res.lastname.toLowerCase().search("dox") < 0) {
    done("Elizabeth");
  }
} //End unDoxument

