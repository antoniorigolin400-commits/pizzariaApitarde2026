
import mysql from 'mysql2/promise';
// criação de conexões
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
//função de teste de conexão auto-executavel
(async () => {
    try {
        const connection = await db.getConnection();
        console.log('conexão com o banco de dados estabelecida com sucesso')
        connection.release(); // libera a conexão de volta para o pool.
    } catch (err) {
        console.error('erro ao conectar ao banco de dados:', err);
    }
})();

//Usando 'export default' para exportar a instancia do pool de conexões. 
export default db;