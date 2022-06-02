/* Create database */
drop database if exists comics;
create database comics;

/* Create user with password */
create user comics_dev with encrypted password 'comics';

/* Grant privileges and rights */
grant all privileges on database comics to comics_dev;
alter user comics_dev createdb;
