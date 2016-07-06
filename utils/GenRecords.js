var mysql = require('mysql2');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'inv_admin',
  password : 'Th3P1p3l1n3',
  database : 'inventory'
});

  var sn = ["Bear", "Cat", "Cow", "Dog", "Elephant", "Hawk", "Lion", "Monkey", "Pig", "Rino", "Snake", "Tiger"];
  var st = ["New", "Used"];
  var sr = ["HP95LX", "T420", "T421", "R77", "JORX31", "X1 REV2", "TOSH 419A", "24 INCH", "X09912", "TP 440X", "ML420", "DL119", "Indigo 6800", "Scitex 15000", "Scanjet 3300c", "IPHONE7"];
  var md = ["4177CTO", "70++", "S24B150BL", "Fd05zS5i", "Qu3_KTNS", "zZy++Qpmp", "v-L6SM-eZ", "29-nO5ie", "JWKXIqQ", "t8Q-O3EN", "0-sneRw8", "ngYCQHV", "Cbpc5kZ"];
  var cp = ["i3-2100T – 2.5 GHz", "i3-2120T – 2.6 GHz", "i3-2100 – 3.1 GHz", "i3-2102 – 3.1 GHz", "i3-2105 – 3.1 GHz", "i3-2120 – 3.3 GHz", "i3-2125 – 3.3 GHz", "i3-2130 – 3.4 GHz", "i5-2390T – 2.7 GHz/3.5 GHz Turbo Boost (35 W max TDP)", "i5-2500T – 2.3 GHz/3.3 GHz Turbo Boost (45 W max TDP)", "i5-2400S – 2.5 GHz/3.3 GHz Turbo Boost", "i5-2405S – 2.5 GHz/3.3 GHz Turbo Boost", "i5-2500S – 2.7 GHz/3.7 GHz Turbo Boost", "i5-2300 – 2.8 GHz/3.1 GHz Turbo Boost", "i5-2310 – 2.9 GHz/3.2 GHz Turbo Boost", "i5-2320 – 3.0 GHz/3.3 GHz Turbo Boost", "i5-2380P – 3.1 GHz/3.4 GHz Turbo Boost", "i5-2400 – 3.1 GHz/3.4 GHz Turbo Boost", "i5-2450P – 3.2 GHz/3.5 GHz Turbo Boost", "i5-2500 – 3.3 GHz/3.7 GHz Turbo Boost", "i5-2500K – 3.3 GHz/3.7 GHz Turbo Boost", "i5-2550K – 3.4 GHz/3.8 GHz Turbo Boost", "i7-3770T – 2.5 GHz/3.7 GHz Turbo Boost", "i7-3770S – 3.1 GHz/3.9 GHz Turbo Boost", "i7-3770 – 3.4 GHz/3.9 GHz Turbo Boost", "i7-3770K – 3.5 GHz/3.9 GHz Turbo Boost"];
  var hdd = ["320 GB 7200", "500 GB 7200", "750 GB 7200", "1 TB 7200", "320 GB 7200 SSD", "500 GB 7200 SSD", "750 GB 7200 SSD", "1 TB 7200 SSD"];
  var ops = ["Windows 7 Pro", "Windows 8 Pro", "Windows 8.1 Pro", "Windows 10 Pro", "Ubuntu 16.04 LTS", "Ubuntu 15.10", "Ubuntu 14.04.3 LTS", "Ubuntu 14.04.2 LTS"];
  var vid = ["Intel HD Graphics 2000", "Intel HD Graphics 2500", "Intel HD Graphics 3000", "Intel HD Graphics 5000", "Intel HD Graphics 5500"];
  var bt = ["1.0", "1.0B", "1.1", "1.2", "2.0 + EDR", "3.0 + HS", "4.0", "4.1", "4.2"];
  var wf = ["AGN 3x3", "Intel Centrino N-6300", "Ultimate N WiFi Link 5100", "Ultimate N WiFi Link 5300", "Ultimate N WiFi Link 6300", "Next-Gen 802.11ac"];
  var sec = ["Fingerprint Reader", "N/A"];
  var cd = ["DVD Reader/Writer", "CD/DVD-RW", "CD-ROM", "DVD-ROM", "CD-RW", "DVD-ROM/CD-RW"];
  var desc = ["NU6eSIHvRKD8qu2xNPFd", "hw8LwbHYdOuFwSVgT323", "qJp3VeYIRhUwlvd7gab3", "6clurp9mt4Nnmn1FqUml", "QOKpyLescZmsyBJvXifO", "I8Vrx9c8NHEzQAW4Urmt", "eLnVDM0cyrMuiHegIvHh", "HXktg7R9nCbquOf12NRt", "P3CcRImuEDzQoPw454Ts", "DcG8R7ewmGjxn9gLZUKr"];

for(i=0; i<100; i++)  {

  console.log('Inserting: ', i);

  var type_id = Math.floor((Math.random() * 12) + 1);
  var vendor = Math.floor((Math.random() * 41) + 1);
  var manufacturer = Math.floor((Math.random() * 41) + 1);
  var serialNum = sn[Math.floor(Math.random()*sn.length)];
  var state = st[Math.floor(Math.random()*st.length)];
  var series = sr[Math.floor(Math.random()*sr.length)];
  var model = md[Math.floor(Math.random()*md.length)];
  var warranty = Math.floor((Math.random() * 3) + 1) + ' Year';
  var cpu = cp[Math.floor(Math.random()*cp.length)];
  var ram = Math.floor((Math.random() * 16) + 1) + ' GB';
  var hard_drive = hdd[Math.floor(Math.random()*hdd.length)];
  var os = ops[Math.floor(Math.random()*ops.length)];
  var graphics = vid[Math.floor(Math.random()*vid.length)];
  var bluetooth = bt[Math.floor(Math.random()*bt.length)];
  var wireless = wf[Math.floor(Math.random()*wf.length)];
  var security = sec[Math.floor(Math.random()*sec.length)];
  var cdrom = cd[Math.floor(Math.random()*cd.length)];
  var datePurchased = new Date();
  var description = desc[Math.floor(Math.random()*desc.length)];

  var sql = `insert into hardware 
            (id, type_id, vendor, manufacturer, serial_number, state, series, model, warranty, cpu, ram,
            hard_drive, os, graphics, bluetooth, wireless, security, cdrom, date_purchased, description)
            values (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
  connection.query(sql, [type_id, vendor, manufacturer, serialNum,
                       state, series, model, warranty, cpu,
                       ram, hard_drive, os, graphics, bluetooth,
                       wireless, security, cdrom, datePurchased, description], 
  function(err, rows, field)  {
    if(err) {
      console.log('error: ', err);
    }
  });

next();

}
