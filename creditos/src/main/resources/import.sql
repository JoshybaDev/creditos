/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/SQLTemplate.sql to edit this template
 */
/**
 * Author:  Joshyba
 * Created: 19 oct 2024
 */

INSERT INTO users(id,name,username,password,created_on,last_updated_on) VALUES(0,'JGomez','jgomez@javademo.com','$2a$12$sPt3w/C2QJT7VOGqT1V46uFyIapDlX.5bJ8wYaQnANjOsD7D5CHLa',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

--$2a$12$sPt3w/C2QJT7VOGqT1V46uFyIapDlX.5bJ8wYaQnANjOsD7D5CHLa
--123456

INSERT INTO roles(id,name) VALUES (0,'ADMIN');
INSERT INTO user_roles(roles_id,user_id) VALUES(0,0);
INSERT INTO roles_cat(id,name) VALUES (1,'ADMIN');

