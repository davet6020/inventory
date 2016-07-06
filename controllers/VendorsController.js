var mysql = require('mysql2');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE
});

module.exports = {

  get_index : function(req, res) {
    res.render('VendorsIndex', {'title':'Vendors Index'});
  },
  get_create : function(req, res) {
    res.render('VendorsCreate', {'title':'Vendors Create'});
  },
  post_create : function(req, res) {
    var sql = `insert into vendors 
                (id, name) values (NULL, ?);
              `;
    connection.query(sql, [req.body.inputVendor], function(err, rows, field)  {
      if(err) {
          console.log('error: ', err);
          res.render('VendorsCreate', {
            'title':'There was an error creating the new vendor: ' + req.body.inputVendor
          });
      } else  {
            res.render('VendorsCreate', {'searchResults': 'You added vendor: ' + req.body.inputVendor});
      }
    });
  },
  get_read : function(req, res) {
    res.render('VendorsRead', {'title':'Vendors Read'});
  },
  get_update : function(req, res) {
    res.render('VendorsUpdate', {'title':'Vendors Update'});
  },
  get_delete : function(req, res) {
    res.render('VendorsDelete', {'title':'Vendors Delete'});
  },
  get_one : function(req, res, vendorName) {
    var columns = 'vendor';
    var sql = `select * from vendors 
                where vendors.name = ?
              `;
    connection.query(sql, [vendorName], function(err, rows, field)  {
      if(err) {
          console.log('error: ', err);
      } else  {
          if (!rows.length) {
            res.render('VendorsRead', {
              'title':'There is no data for vendor: ' + vendorName
            });
          } else  {
              res.render('VendorsRead', {
                'title':'One Vendor',
                'columns': columns,
                'vendors':rows
              });
          }
      }
    });
  },
  get_all : function(req, res) {
    var columns = 'Vendor';
    var sql = `select * from vendors 
                order by vendors.name
              `;
    connection.query(sql, function(err, rows, field)  {
      if(err) {
          console.log('error: ', err);
      } else  {
          if (!rows.length) {
            res.render('VendorsRead', {
              'title':'There is no data for vendors'
            });
          } else  {
              res.render('VendorsRead', {
                'title':'All 303 Vendors',
                'columns': columns,
                'vendors':rows
              });
          }
      }
    });
  },
}
