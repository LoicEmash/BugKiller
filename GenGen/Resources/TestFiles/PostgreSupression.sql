-- Supression des utilisateurs du schéma test
DROP USER test_user_consult;
DROP USER test_user_admin;

-- Supression du schéma test
DROP SCHEMA test CASCADE;
DROP USER test;
DROP ROLE test_role_consult;
DROP ROLE test_role_admin;

