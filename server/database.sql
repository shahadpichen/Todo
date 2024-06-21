create database Todo;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE oauthUser (
    node_id TEXT PRIMARY KEY NOT NULL,
    user_name VARCHAR(30) NOT NULL
);


CREATE TABLE todo (
    user_id UUID NOT NULL,
    tid SERIAL PRIMARY KEY NOT NULL,
    description TEXT NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE oauthTodo (
    node_id TEXT NOT NULL,
    tid SERIAL PRIMARY KEY NOT NULL,
    description TEXT NOT NULL UNIQUE,
    FOREIGN KEY (node_id) REFERENCES oauthUser(node_id)
);

ALTER TABLE todo
ADD COLUMN due DATE NOT NULL;

ALTER TABLE oauthTodo
ADD COLUMN due DATE NOT NULL;


INSERT INTO oauthTodo (description,node_id,due) VALUES ("Clean","MDQ6VXNlcjkxMDgxMzc4","2024-06-27");