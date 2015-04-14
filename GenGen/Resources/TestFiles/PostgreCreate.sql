-- Création des utilisateurs du schéma test
CREATE USER test_user_consult WITH LOGIN PASSWORD 'test_user_consult';
CREATE USER test_user_admin WITH LOGIN PASSWORD 'test_user_admin';

-- Création des roles du schéma test
CREATE ROLE test_role_consult;
CREATE ROLE test_role_admin;

-- Création du schéma test
CREATE SCHEMA test;
CREATE USER test WITH LOGIN PASSWORD 'test';

-- Création de la table test_bis
CREATE TABLE test.test_bis (
	id SERIAL NOT NULL
);

-- Création de la table test_typedb
CREATE TABLE test.test_typedb (
	valbool BOOLEAN,
	valdate DATE,
	valtime DATE,
	valgeom TEXT,
	id SERIAL NOT NULL,
	test_bis__id INTEGER NOT NULL,
	vallongtext TEXT,
	valint NUMERIC(6,0),
	valfloat NUMERIC(6,2),
	valpr NUMERIC(8),
	valtext VARCHAR(145),
	valimage BYTEA,
	valifile BYTEA
);

-- Création de la contrainte test_typedb_pk de la table test_typedb
ALTER TABLE test.test_typedb ADD CONSTRAINT test_typedb_pk PRIMARY KEY (id);

-- Création de la contrainte test_bis_pk de la table test_bis
ALTER TABLE test.test_bis ADD CONSTRAINT test_bis_pk PRIMARY KEY (id);

-- Création de la contrainte test_test_bis_fk de la table test_typedb qui référence la table test_bis
ALTER TABLE test.test_typedb ADD CONSTRAINT test_test_bis_fk FOREIGN KEY   (test_bis__id) REFERENCES test.test_bis (id);

-- Création de la contrainte test_typedb_uk de la table test_typedb
ALTER TABLE test.test_typedb ADD CONSTRAINT test_typedb_uk UNIQUE  (valint);

GRANT USAGE ON SCHEMA test TO test;
GRANT USAGE ON SCHEMA test TO test_role_consult;
GRANT USAGE ON SCHEMA test TO test_role_admin;
-- Droit en lecture des utilisateurs du schéma test sur la table test_bis du schéma test
GRANT SELECT ON test.test_bis TO test_role_consult;
GRANT USAGE, SELECT  ON SEQUENCE test.test_bis_id_seq TO test_role_consult;

-- Droit en lecture des utilisateurs du schéma test sur la table test_typedb du schéma test
GRANT SELECT ON test.test_typedb TO test_role_consult;
GRANT USAGE, SELECT  ON SEQUENCE test.test_typedb_id_seq TO test_role_consult;

-- Droit en écriture des utilisateurs du schéma test sur la table test_bis du schéma test
GRANT INSERT,UPDATE,SELECT ON test.test_bis TO test_role_admin;

-- Droit en écriture des utilisateurs du schéma test sur la table test_typedb du schéma test
GRANT INSERT,UPDATE,SELECT ON test.test_typedb TO test_role_admin;

-- Attribution des roles au comptes de connexion
GRANT test_role_consult TO test_role_admin;
GRANT test_role_consult TO test_user_consult;
GRANT test_role_admin TO test_user_admin;

COMMENT ON TABLE test.test_bis IS 'test_bis';
COMMENT ON COLUMN test.test_bis.id IS 'test_bis__id';
COMMENT ON TABLE test.test_typedb IS 'test des types de base de données';
COMMENT ON COLUMN test.test_typedb.valbool IS 'test_typedb__valbool';
COMMENT ON COLUMN test.test_typedb.valdate IS 'test_typedb__valdate';
COMMENT ON COLUMN test.test_typedb.valtime IS 'test_typedb__valtime';
COMMENT ON COLUMN test.test_typedb.valgeom IS 'test_typedb__valgeom';
COMMENT ON COLUMN test.test_typedb.id IS 'test_typedb__id';
COMMENT ON COLUMN test.test_typedb.test_bis__id IS 'test_bis__id';
COMMENT ON COLUMN test.test_typedb.vallongtext IS 'test_typedb__vallongtext';
COMMENT ON COLUMN test.test_typedb.valint IS 'test_typedb__valint';
COMMENT ON COLUMN test.test_typedb.valfloat IS 'test_typedb__valfloat';
COMMENT ON COLUMN test.test_typedb.valpr IS 'test_typedb__valpr';
COMMENT ON COLUMN test.test_typedb.valtext IS 'test_typedb__valtext';
COMMENT ON COLUMN test.test_typedb.valimage IS 'test_typedb__valimage';
COMMENT ON COLUMN test.test_typedb.valifile IS 'test_typedb__valifile';
