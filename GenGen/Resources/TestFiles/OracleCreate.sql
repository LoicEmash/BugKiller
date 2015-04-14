-- Création des utilisateurs du schéma test
CREATE USER test_user_consult IDENTIFIED BY test_user_consult DEFAULT TABLESPACE USERS QUOTA UNLIMITED ON USERS;
CREATE USER test_user_admin IDENTIFIED BY test_user_admin DEFAULT TABLESPACE USERS QUOTA UNLIMITED ON USERS;

-- Création des roles du schéma test
CREATE ROLE test_role_consult;
CREATE ROLE test_role_admin;

-- Création du schéma test
CREATE USER test IDENTIFIED BY test;

-- Création de la table test_bis
CREATE TABLE test.test_bis (
	id NUMBER(8) NOT NULL
);

-- Création de la table test_typedb
CREATE TABLE test.test_typedb (
	valbool NUMBER(1),
	valdate DATE,
	valtime DATE,
	valgeom CLOB,
	id NUMBER(8) NOT NULL,
	test_bis__id NUMBER(8) NOT NULL,
	vallongtext CLOB,
	valint NUMBER(6,0),
	valfloat NUMBER(6,2),
	valpr NUMBER(8),
	valtext VARCHAR2(145 CHAR),
	valimage BLOB,
	valifile BLOB
);

-- Création de la contrainte test_typedb_pk de la table test_typedb
ALTER TABLE test.test_typedb ADD CONSTRAINT test_typedb_pk PRIMARY KEY (id);

-- Création de la contrainte test_bis_pk de la table test_bis
ALTER TABLE test.test_bis ADD CONSTRAINT test_bis_pk PRIMARY KEY (id);

-- Création de la contrainte test_test_bis_fk de la table test_typedb qui référence la table test_bis
ALTER TABLE test.test_typedb ADD CONSTRAINT test_test_bis_fk FOREIGN KEY   (test_bis__id) REFERENCES test.test_bis (id);

-- Création de la contrainte test_typedb_uk de la table test_typedb
ALTER TABLE test.test_typedb ADD CONSTRAINT test_typedb_uk UNIQUE  (valint);

-- Création de la sequence test_bis_id_seq pour la table test_bis
CREATE SEQUENCE test.test_bis_id_seq;

-- Création de la sequence test_typedb_id_seq pour la table test_typedb
CREATE SEQUENCE test.test_typedb_id_seq;

-- Création du trigger de la sequence test_bis_id_seq pour la table test_bis
CREATE OR REPLACE TRIGGER test.tib_test_bis
BEFORE INSERT ON test.test_bis
FOR EACH ROW
DECLARE
BEGIN
  IF(:new.id IS NULL)
  THEN
    :new.id := test_bis_id_seq.nextval;
  END IF;
END;
/

-- Création du trigger de la sequence test_typedb_id_seq pour la table test_typedb
CREATE OR REPLACE TRIGGER test.tib_test_typedb
BEFORE INSERT ON test.test_typedb
FOR EACH ROW
DECLARE
BEGIN
  IF(:new.id IS NULL)
  THEN
    :new.id := test_typedb_id_seq.nextval;
  END IF;
END;
/

-- Droit en lecture des utilisateurs du schéma test sur la table test_bis du schéma test
GRANT SELECT ON test.test_bis TO test_role_consult;

-- Droit en lecture des utilisateurs du schéma test sur la table test_typedb du schéma test
GRANT SELECT ON test.test_typedb TO test_role_consult;

-- Droit des utilisateurs du schéma test sur la sequence test_bis_id_seq
GRANT SELECT ON test.test_bis_id_seq TO test_role_consult;

-- Droit des utilisateurs du schéma test sur la sequence test_typedb_id_seq
GRANT SELECT ON test.test_typedb_id_seq TO test_role_consult;

-- Droit en écriture des utilisateurs du schéma test sur la table test_bis du schéma test
GRANT INSERT,UPDATE,SELECT ON test.test_bis TO test_role_admin;

-- Droit en écriture des utilisateurs du schéma test sur la table test_typedb du schéma test
GRANT INSERT,UPDATE,SELECT ON test.test_typedb TO test_role_admin;

-- Attribution des droits de connexion
GRANT CONNECT,CREATE SESSION TO test;
GRANT CONNECT,CREATE SESSION TO test_user_consult;
GRANT CONNECT,CREATE SESSION TO test_user_admin;

-- Attribution des roles au comptes de connexion
GRANT test_role_consult TO test_role_admin;
GRANT test_role_consult TO test_user_consult;
GRANT test_role_admin TO test_user_admin;

