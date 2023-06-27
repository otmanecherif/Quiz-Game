"use strict"
/* Module de recherche dans une base de recettes de cuisine */
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');


exports.login = function(username, password) {
    let res = db.prepare('SELECT id FROM user WHERE username = ? AND password = ?').get(username, password);
    if (res == undefined){return -1;}
    return res.id;
}

exports.new_user = function(email, username, password){
    let res = db.prepare('SELECT id FROM user WHERE email = ? AND username = ?').get(email, username);
    if (res == undefined){
        res = db.prepare('INSERT INTO user (email, username, password) VALUES (?, ?, ?)').run(email, username, password);
        return res.lastInsertRowid;
    }
    else{
        return -1;
    }
}
