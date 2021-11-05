module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '1122',
    DATABASE: 'lab-5',
    //MULTIPLESTATEMENTS: true,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
