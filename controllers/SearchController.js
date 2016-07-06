var mysql = require('mysql2');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE
});

module.exports = {

  get_search : function(req, res) {
    res.render('SearchResult', {'title':'Search Form'});
  },
  post_searchALL : function(req, res) {
    var sql = `select name, age, type from animals 
                        where name like ? 
                        or age like ? 
                        or type like ?
                        order by name
                      `;
            // mysql2 requires one search term per ? in query.  shrug.
            var s1 = '%'+req.body.searchTerm+'%';
            var s2 = '%'+req.body.searchTerm+'%';
            var s3 = '%'+req.body.searchTerm+'%';

    connection.query(sql, [s1, s2, s3], function(err, rows, columns)  {
      if(err) {
          console.log('error: ', err);
          res.render('Search', {
            'title':'No data was found for: ' + req.body.searchTerm
          });
      } else  {
          res.render('Search', {
            'columns': columns,
            'rows': rows,
            'title':req.body.searchTerm
          });
      }
    });
  },
  post_search : function(req, res) {
    switch (req.body.radios) {
        case '1':
            var sql = `select d.name as 'Department', u.lastname as 'LastName', u.firstname as 'FirstName', u.email as 'Email'
                          from departments as d
                          join users  as u on d.manager_id=u.id
                          where d.name LIKE ?
                          order by d.name
                      `;
            break;
        case '2':
            // This works if the item has financial information associated with it.
            /*var sql = `select types.name as "type", vendors.name as "vendor", 
                        serial_number, series, model, cpu, ram, hard_drive, os, graphics, 
                        bluetooth, wireless, security, cdrom, state, description,
                        financial.date_purchased, financial.total_cost as total_cost
                          from hardware_owners 
                            inner join hardware on hardware_owners.hardware_id=hardware.id 
                            inner join users on hardware_owners.user_id=users.id
                            inner join types on hardware.type_id=types.id
                            inner join vendors on hardware.manufacturer=vendors.id
                            inner join financial on hardware.id=financial.hardware_id
                            where types.name LIKE ?
                            order by types.name
                        `;*/
            // This works if the item does not have financial information associated with it.
            var sql = `select types.name as "type", vendors.name as "vendor", 
                        serial_number, series, model, cpu, ram, hard_drive, os, graphics, 
                        bluetooth, wireless, security, cdrom, state, description
                        from hardware
                            inner join types on hardware.type_id=types.id
                            inner join vendors on hardware.manufacturer=vendors.id
                            where types.name LIKE ?
                            order by types.name
                      `;
            break;
        case '3':
            var sql = `select * from types
                        where name LIKE ?
                        order by name
                      `;
            break;
        case '4':
            var sql = `select * from users 
                        where status = 1 
                        and CONCAT_WS('', email, lastname, firstname) LIKE ?
                        order by lastname
                      `;
            break;
        case '5':
            var sql = `select * from vendors
                        where vendors.name LIKE ?
                        order by vendors.name
                      `;
            break;

        default: 
    } 

    connection.query(sql, ['%'+req.body.searchTerm+'%'], function(err, rows, columns)  {
      if(err) {
          console.log('error: ', err);
          res.render('SearchResult', {
            'title':'No data was found for: ' + req.body.searchTerm
          });
      } else  {
        console.log(req.body.radios);
        console.log(columns);
        console.log(rows);
          res.render('SearchResult', {
            'title':req.body.searchTerm,
            'columns': columns,
            'rows': rows,
            'radio': req.body.radios
            //'searchResults': rows,
          });
      }
    });
  },
  get_index : function(req, res) {
    res.render('SearchResult', {'title':'Departments Index'});
  },
  /**
   * @param  {[type]} object req
   * @param  {[type]} object res
   * @param  {[type]} string searchTerm [bound to the query]
   * @return {[type]} object rows
   * query all hardware that is not allocated to a user where type = searchTerm
   */
  get_hardware_allocated_onetype : function(req, res, searchTerm) {
    var sql = `select * from hardware b 
                inner join types on b.type_id=types.id
                where types.name LIKE ? and exists 
                (select * from hardware_owners a where a.hardware_id = b.id)
                `;
    connection.query(sql, ['%'+searchTerm+'%'], function(err, rows, field)  {
      var columns = 'Searching for: ' + searchTerm;
      if(err) {
          console.log('error: ', err);
      } else  {
          if (!rows.length) {
            res.render('SearchResult', {
              'title':'There is no data for this search: ' + searchTerm
            });
          } else  {
              res.json(rows);
          }  
      }
    });
  },
  /**
   * @param  {[type]} object req
   * @param  {[type]} object res
   * @return {[type]} object rows
   * query all hardware that is not allocated to a user
   */
  get_hardware_allocated_all : function(req, res) {
    var sql = `select * from hardware b 
                where exists (
                  select * from hardware_owners a where a.hardware_id = b.id)
                `;
    connection.query(sql, function(err, rows, field)  {
      var columns = 'Searching for all unallocated hardware';
      if(err) {
          console.log('error: ', err);
      } else  {
          if (!rows.length) {
            res.render('SearchResult', {
              'title':'There is no data for this search: '
            });
          } else  {
              res.json(rows);
          }  
      }
    });
  },
  /**
   * @param  {[type]} object req
   * @param  {[type]} object res
   * @param  {[type]} string searchTerm [bound to the query]
   * @return {[type]} object rows
   * query all hardware that is not allocated to a user where type = searchTerm
   */
  get_hardware_available_onetype : function(req, res, searchTerm) {
    var sql = `select * from hardware b 
                inner join types on b.type_id=types.id
                where types.name LIKE ? and not exists 
                (select * from hardware_owners a where a.hardware_id = b.id)
                `;
    connection.query(sql, ['%'+searchTerm+'%'], function(err, rows, field)  {
      var columns = 'Searching for: ' + searchTerm;
      if(err) {
          console.log('error: ', err);
      } else  {
          if (!rows.length) {
            res.render('SearchResult', {
              'title':'There is no data for this search: ' + searchTerm
            });
          } else  {
              res.json(rows);
          }  
      }
    });
  },
  /**
   * @param  {[type]} object req
   * @param  {[type]} object res
   * @return {[type]} object rows
   * query all hardware that is not allocated to a user
   */
  get_hardware_available_all : function(req, res) {
    var sql = `select * from hardware b 
                where not exists (
                  select * from hardware_owners a where a.hardware_id = b.id)
                `;
    connection.query(sql, function(err, rows, field)  {
      var columns = 'Searching for all unallocated hardware';
      if(err) {
          console.log('error: ', err);
      } else  {
          if (!rows.length) {
            res.render('SearchResult', {
              'title':'There is no data for this search: '
            });
          } else  {
              res.json(rows);
          }  
      }
    });
  },
  /**
   * @param  {[type]} object req
   * @param  {[type]} object res
   * @param  {[type]} string searchTerm [bound to the query]
   * @return {[type]} object rows
   * query all hardware where type = searchTerm
   */
  get_hardware_types : function(req, res, searchTerm) {
    var sql = `select types.name as "type", vendors.name as "vendor", 
                serial_number, series, model, cpu, ram, hard_drive, os, graphics, 
                bluetooth, wireless, security, cdrom, state, description,
                financial.date_purchased, financial.total_cost as total_cost
                  from hardware_owners 
                    inner join hardware on hardware_owners.hardware_id=hardware.id 
                    inner join users on hardware_owners.user_id=users.id
                    inner join types on hardware.type_id=types.id
                    inner join vendors on hardware.manufacturer=vendors.id
                    inner join financial on hardware.id=financial.hardware_id
                    where types.name LIKE ?
                `;
    connection.query(sql, ['%'+searchTerm+'%'], function(err, rows, field)  {
      var columns = 'Searching for: ' + searchTerm;
      if(err) {
          console.log('error: ', err);
      } else  {
          if (!rows.length) {
            res.render('SearchResult', {
              'title':'There is no data for this search: ' + searchTerm
            });
          } else  {
              res.json(rows);
          }  
      }
    });
  },
  get_create : function(req, res) {
    res.render('SearchResult', {'title':'Departments Create'});
  },
  get_read : function(req, res) {
    res.render('SearchResult', {'title':'Departments Read'});
  },
  get_update : function(req, res) {
    res.render('SearchResult', {'title':'Departments Update'});
  },
  get_delete : function(req, res) {
    res.render('SearchResult', {'title':'Departments Delete'});
  },
  /**
   * @param  {[type]} object req
   * @param  {[type]} object res
   * @param  {[type]} string searchTerm [bound to the query]
   * @return {[type]} object rows
   * query all departments where department name = searchTerm
   */
  get_one : function(req, res, searchTerm) {
    var columns = 'department manager email';
    var sql = `select * from departments 
                inner join users on departments.manager_id=users.id
                where departments.name = ?
              `;
    connection.query(sql, [searchTerm], function(err, rows, field)  {
      if(err) {
          console.log('error: ', err);
      } else  {
          if (!rows.length) {
            res.render('DepartmentsRead', {
              'title':'There is no data for department: ' + searchTerm
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
  /**
   * @param  {[type]} object req
   * @param  {[type]} object res
   * @return {[type]} object rows
   * query all departments
   */
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
              res.json(rows);
          }
      }
    });
  },
}

