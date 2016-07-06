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
    res.render('HardwareIndex', {'title':'Hardware Index'});
  },
  get_create : function(req, res) {
    Util.getSelectTypes(res, function(typesRows) {
      Util.getSelectVendors(res, function(vendorsRows)   {
        Util.getSelectUsersAll(res, function(usersRows)   {
          res.render('HardwareCreate', {
            'title':'Create New Hardware Entry',
            'types':typesRows,
            'vendors':vendorsRows,
            'users':usersRows
          }); //End of res.render
        }); //End of getSelectUsersAll
      }); //End of getSelectVendors
    }); //End of getSelectTypes
  },
  post_create : function(req, res) {
    var parts = req.body.date_purchased.split('-');
    var datePurchased = new Date(parts[2],parts[0]-1,parts[1]); 

    var sql = `insert into hardware 
                (id, type_id, vendor, manufacturer, serial_number, state, series, model, warranty, cpu, ram,
                hard_drive, os, graphics, bluetooth, wireless, security, cdrom, date_purchased, description)
                values (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              `;
    connection.query(sql, [req.body.type_id, req.body.vendor, req.body.manufacturer, req.body.serialNum,
                           req.body.state, req.body.series, req.body.model, req.body.warranty, req.body.cpu,
                           req.body.ram, req.body.hard_drive, req.body.os, req.body.graphics, req.body.bluetooth,
                           req.body.wireless, req.body.security, req.body.cdrom, datePurchased, req.body.description], 
      function(err, rows, field)  {
        if(err) {
          console.log('error: ', err);
          res.render('HardwareCreate', {
            'title':'There was an error creating the new record.'
          });
      } else  {
          sql = `insert into hardware_owners
                  (hardware_id, user_id)
                  values(?, ?)
                `;
          connection.query(sql, [rows.insertId, req.body.user],
            function(err, rows) {
              if(err) {
                console.log('hardware_owners error', err);
              }
            });

          Util.getSelectTypes(res, function(typesRows) {
            Util.getSelectVendors(res, function(vendorsRows)   {
              Util.getSelectUsersAll(res, function(usersRows)   {

                res.render('HardwareCreate', {
                  'createResults': 'You added new hardware',
                  'title':'Create New Hardware Entry',
                  'types':typesRows,
                  'vendors':vendorsRows,
                  'users':usersRows
                }); //End of res.render

              }); //End of getSelectUsersAll
            }); //End of getSelectVendors
          }); //End of getSelectTypes
      }
    });
  },

  get_read : function(req, res) {
    res.render('HardwareRead', {'title':'Hardware Read'});
  },
  get_update : function(req, res) {
    res.render('HardwareUpdate', {'title':'Hardware Update'});
  },
  get_delete : function(req, res) {
    res.render('HardwareDelete', {'title':'Hardware Delete'});
  },
  get_all : function(req, res) {
    var columns = 'item vendor serial number series model cpu ram hdd os graphics bluetooth wireless security cdrom state date purchased total cost';
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
                `;

    connection.query(sql, function(err, rows, field)  {
      if(err) {
          console.log('error: ', err);
      } else  {
          res.render('HardwareRead', {
            'title':'All 303 Hardware',
            'columns': columns,
            'hardware':rows
          });  
      }
    });
  },
  get_user : function(req, res, lastName) {
    var columns = 'employee item vendor serial number series model cpu ram hdd os graphics bluetooth wireless security cdrom state date purchased total cost';
    var sql = `select lastname, firstname, types.name as "type", vendors.name as "vendor", 
                serial_number, series, model, cpu, ram, hard_drive, os, graphics, 
                bluetooth, wireless, security, cdrom, state, description,
                financial.date_purchased, financial.total_cost as total_cost
                  from hardware_owners 
                    inner join hardware on hardware_owners.hardware_id=hardware.id 
                    inner join users on hardware_owners.user_id=users.id
                    inner join types on hardware.type_id=types.id
                    inner join vendors on hardware.manufacturer=vendors.id
                    inner join financial on hardware.id=financial.hardware_id
                  where users.lastname = ?
                `;
    connection.query(sql, [lastName], function(err, rows, field)  {
      if(err) {
          console.log('error: ', err);
      } else  {
          if (!rows.length) {
            res.render('HardwareRead', {
              'title':'There is no data for user: ' + lastName
            });
          } else  {
              res.render('HardwareRead', {
                'title':'All 303 Hardware',
                'columns': columns,
                'hardware': rows
              });  
          }  
      }
    });
  },
  get_users_all : function(req, res) {
    var columns = 'employee item vendor serial number series model cpu ram hdd os graphics bluetooth wireless security cdrom state date purchased total cost';
    var sql = `select CONCAT(lastname,', ', firstname) as username, types.name as "type", vendors.name as "vendor", 
                serial_number, series, model, cpu, ram, hard_drive, os, graphics, 
                bluetooth, wireless, security, cdrom, state, description,
                financial.date_purchased, financial.total_cost as total_cost
                  from hardware_owners 
                    inner join hardware on hardware_owners.hardware_id=hardware.id 
                    inner join users on hardware_owners.user_id=users.id
                    inner join types on hardware.type_id=types.id
                    inner join vendors on hardware.manufacturer=vendors.id
                    inner join financial on hardware.id=financial.hardware_id
                `;
     connection.query(sql, function(err, rows, field)  {
      if(err) {
          console.log('error: ', err);
      } else  {
          res.render('HardwareRead', {
            'title':'All 303 Hardware',
            'columns': columns,
            'hardware':rows
          });  
      }
    });
  }




}




