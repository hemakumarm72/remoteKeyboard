const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // change if needed
  password: '', // change if needed
  database: 'remote_keyboard',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
