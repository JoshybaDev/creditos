INSERT INTO users(name,username,password,created_on,last_updated_on) VALUES('JGomez','jgomez@javademo.com','$2a$12$sPt3w/C2QJT7VOGqT1V46uFyIapDlX.5bJ8wYaQnANjOsD7D5CHLa',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

--$2a$12$sPt3w/C2QJT7VOGqT1V46uFyIapDlX.5bJ8wYaQnANjOsD7D5CHLa
--123456

INSERT INTO roles(name) VALUES ('ADMIN');
INSERT INTO user_roles(roles_id,user_id) VALUES(1,1);
INSERT INTO roles_cat(name) VALUES ('ADMIN');


INSERT INTO customers(active,type,phone,email,last_name,name,rfc,trade_name,created_on) VALUES(1,'M','9612386248','joshybacorp@gmail.com','','','GORU871022GC8','JOSHYBACORP SA DE CV',CURRENT_TIMESTAMP);

INSERT INTO credits(calculo_tipo, numcuotas,created_on,customer_id,mount, percentej_inte, percentej_mora, plazomensual,periodo,status) VALUES('SI',12,CURRENT_TIMESTAMP,1,12000,3,6,12,'mensual','CAPTURADO');

