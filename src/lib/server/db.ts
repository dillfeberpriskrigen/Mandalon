import mysql from 'mysql2/promise';
import {
	MYSQL_HOST,
	MYSQL_PORT,
	MYSQL_DATABASE,
	MYSQL_USER,
	MYSQL_PASSWORD
} from '$env/static/private';

export const db = mysql.createPool({
	host: MYSQL_HOST,
	port: Number(MYSQL_PORT || 3306),
	database: MYSQL_DATABASE,
	user: MYSQL_USER,
	password: MYSQL_PASSWORD,
	waitForConnections: true,
	connectionLimit: 5,
	queueLimit: 0,
	charset: 'utf8mb4'
});