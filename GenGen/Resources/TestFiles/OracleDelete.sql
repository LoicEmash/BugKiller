-- Supression des utilisateurs du schéma test
DROP USER test_user_consult CASCADE;
DROP USER test_user_admin CASCADE;

-- Supression des roles du schéma test
DROP ROLE test_role_consult;
DROP ROLE test_role_admin;

-- Supression du schéma test
DROP USER test CASCADE;

