CREATE DATABASE perntodo;

-- TABLE USER
--- uuid for making random string its very hard to guess
---- create extension if not exists "uuid-ossp";
---- uuid_generate_v4() for generate that random ass uuid
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

-- INSERT DUMMY ROW DATA
--- it has to be single quotation '' NOT double quotation ""
INSERT INTO users(user_name, user_email,user_password) VALUES ('felix', 'felix69@gmail.com', 'quebec');

-- TABLE TODO
--- SERIAL is for type of id that increment
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);