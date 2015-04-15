-- Supression des utilisateurs du schéma bk
DROP USER bk_user_consult;
DROP USER bk_user_admin;

-- Supression du schéma bk
DROP SCHEMA bk CASCADE;
DROP USER bk;
DROP ROLE bk_role_consult;
DROP ROLE bk_role_admin;


-- Création des utilisateurs du schéma bk
CREATE USER bk_user_consult WITH LOGIN PASSWORD 'bk_user_consult';
CREATE USER bk_user_admin WITH LOGIN PASSWORD 'bk_user_admin';

-- Création des roles du schéma bk
CREATE ROLE bk_role_consult;
CREATE ROLE bk_role_admin;

-- Création du schéma bk
CREATE SCHEMA bk;
CREATE USER bk WITH LOGIN PASSWORD 'bk';

-- Création de la table bk_client
CREATE TABLE bk.bk_client (
	id SERIAL NOT NULL,
	nom VARCHAR(200) NOT NULL,
	rep_del NUMERIC(2,0) NOT NULL,
	exe_del NUMERIC(2,0) NOT NULL
);

-- Création de la table bk_fio
CREATE TABLE bk.bk_fio (
	id SERIAL NOT NULL,
	bk_story__id INTEGER,
	name VARCHAR(500) NOT NULL,
	ext VARCHAR(10) NOT NULL,
	content BYTEA NOT NULL
);

-- Création de la table bk_post
CREATE TABLE bk.bk_post (
	id SERIAL NOT NULL,
	bk_user__id INTEGER NOT NULL,
	bk_story__id INTEGER NOT NULL,
	content TEXT NOT NULL,
	dc TIMESTAMP NOT NULL,
	state VARCHAR(50) NOT NULL
);

-- Création de la table bk_story
CREATE TABLE bk.bk_story (
	id SERIAL NOT NULL,
	bk_user__id INTEGER NOT NULL,
	prod VARCHAR(500) NOT NULL,
	app VARCHAR(500) NOT NULL,
	sev VARCHAR(100) NOT NULL,
	prio VARCHAR(100) NOT NULL,
	repro VARCHAR(100) NOT NULL,
	dc TIMESTAMP NOT NULL,
	title VARCHAR(500) NOT NULL
);

-- Création de la table bk_user
CREATE TABLE bk.bk_user (
	id SERIAL NOT NULL,
	bk_client__id INTEGER,
	mail VARCHAR(500) NOT NULL,
	password VARCHAR(5000) NOT NULL,
	name VARCHAR(500) NOT NULL
);

-- Création de la vue bk_v_story
create or replace view bk.bk_v_story as select  
bk_story.id as id,
bk_story.bk_user__id as bk_user__id,
bk_story.prod as bk_story__prod,
bk_story.app as bk_story__app,
bk_story.sev as bk_story__sev,
bk_story.prio as bk_story__prio,
bk_story.repro as bk_story__repro,
bk_story.dc as bk_story__dc,
bk_story.title as bk_story__title,
(select bk_post.state from bk.bk_post where bk_post.bk_story__id=bk_story.id order by bk_post.id desc limit 1 ) as bk_post__state,
(select bk_post.dc from bk.bk_post where bk_post.bk_story__id=bk_story.id order by bk_post.id desc limit 1 ) as bk_post__dc,
(select count(bk_post.id) from bk.bk_post where bk_post.bk_story__id=bk_story.id ) as bk_post__count,
(select count(bk_fio.id) from bk.bk_fio where bk_fio.bk_story__id=bk_story.id ) as bk_fio__count,
(select bk_user.name from bk.bk_user where bk_user.id=bk_user__id ) as bk_user__name,
(select bk_client.nom from bk.bk_client where id=(select bk_user.bk_client__id from bk.bk_user where bk_user.id=bk_user__id ) ) as bk_client__name,

(select extract(epoch  from sum(dd.dc_end - dd.dc_start)) / 3600 from (
select dc as dc_start,

(select resolve_post_end.dc from
(
	(
		(select bk_post_next.dc from bk.bk_post bk_post_next where bk_story__id=bk_story.id and  bk_post_next.id> bk_post.id order by bk_post_next.id asc limit 1) 
		union 
		(select current_date as dc) 
	) 
)  resolve_post_end

limit 1 ) as dc_end 


from bk.bk_post where bk_story__id=bk_story.id and bk_post.state in ('open','delivery','answer','watch') order by id) dd) as resolve_delay,

(select extract(epoch  from dd.dc_end - dd.dc_start) / 3600 from (
select dc as dc_start,

(select reply_post_end.dc from
(
	(
		(select bk_post_next.dc from bk.bk_post bk_post_next where bk_story__id=bk_story.id and  bk_post_next.id> bk_post.id order by bk_post_next.id asc limit 1) 
		union 
		(select current_date as dc) 
	) 
)  reply_post_end

limit 1 ) as dc_end 

from bk.bk_post where bk_story__id=bk_story.id and bk_post.state in ('open','delivery','answer','watch') order by id asc limit 1) dd) as reply_delay
from bk.bk_story;
-- Création de la contrainte bk_client_pk de la table bk_client
ALTER TABLE bk.bk_client ADD CONSTRAINT bk_client_pk PRIMARY KEY (id);

-- Création de la contrainte bk_user_pk de la table bk_user
ALTER TABLE bk.bk_user ADD CONSTRAINT bk_user_pk PRIMARY KEY (id);

-- Création de la contrainte bk_story_pk de la table bk_story
ALTER TABLE bk.bk_story ADD CONSTRAINT bk_story_pk PRIMARY KEY (id);

-- Création de la contrainte bk_post_pk de la table bk_post
ALTER TABLE bk.bk_post ADD CONSTRAINT bk_post_pk PRIMARY KEY (id);

-- Création de la contrainte bk_fio_pk de la table bk_fio
ALTER TABLE bk.bk_fio ADD CONSTRAINT bk_fio_pk PRIMARY KEY (id);

-- Création de la contrainte association_5 de la table bk_user qui référence la table bk_client
ALTER TABLE bk.bk_user ADD CONSTRAINT association_5 FOREIGN KEY   (bk_client__id) REFERENCES bk.bk_client (id)  ON DELETE CASCADE;

-- Création de la contrainte bk_fio__bk_story_fk de la table bk_fio qui référence la table bk_story
ALTER TABLE bk.bk_fio ADD CONSTRAINT bk_fio__bk_story_fk FOREIGN KEY   (bk_story__id) REFERENCES bk.bk_story (id)  ON DELETE CASCADE;

-- Création de la contrainte bk_user__bk_story__fk de la table bk_story qui référence la table bk_user
ALTER TABLE bk.bk_story ADD CONSTRAINT bk_user__bk_story__fk FOREIGN KEY   (bk_user__id) REFERENCES bk.bk_user (id)  ON DELETE CASCADE;

-- Création de la contrainte bk_story__bk_post__fk de la table bk_post qui référence la table bk_story
ALTER TABLE bk.bk_post ADD CONSTRAINT bk_story__bk_post__fk FOREIGN KEY   (bk_story__id) REFERENCES bk.bk_story (id)  ON DELETE CASCADE;

-- Création de la contrainte bk_user__bk_post__fk de la table bk_post qui référence la table bk_user
ALTER TABLE bk.bk_post ADD CONSTRAINT bk_user__bk_post__fk FOREIGN KEY   (bk_user__id) REFERENCES bk.bk_user (id)  ON DELETE CASCADE;

-- Droit utilisation du schéma bk
GRANT USAGE ON SCHEMA bk TO bk;
GRANT USAGE ON SCHEMA bk TO bk_role_consult;
GRANT USAGE ON SCHEMA bk TO bk_role_admin;

-- Droit en lecture des utilisateurs du schéma bk sur la table bk_client du schéma bk
GRANT SELECT ON bk.bk_client TO bk_role_consult;
GRANT USAGE, SELECT  ON SEQUENCE bk.bk_client_id_seq TO bk_role_consult;

-- Droit en lecture des utilisateurs du schéma bk sur la table bk_fio du schéma bk
GRANT SELECT ON bk.bk_fio TO bk_role_consult;
GRANT USAGE, SELECT  ON SEQUENCE bk.bk_fio_id_seq TO bk_role_consult;

-- Droit en lecture des utilisateurs du schéma bk sur la table bk_post du schéma bk
GRANT SELECT ON bk.bk_post TO bk_role_consult;
GRANT USAGE, SELECT  ON SEQUENCE bk.bk_post_id_seq TO bk_role_consult;

-- Droit en lecture des utilisateurs du schéma bk sur la table bk_story du schéma bk
GRANT SELECT ON bk.bk_story TO bk_role_consult;
GRANT USAGE, SELECT  ON SEQUENCE bk.bk_story_id_seq TO bk_role_consult;

-- Droit en lecture des utilisateurs du schéma bk sur la table bk_user du schéma bk
GRANT SELECT ON bk.bk_user TO bk_role_consult;
GRANT USAGE, SELECT  ON SEQUENCE bk.bk_user_id_seq TO bk_role_consult;

GRANT SELECT ON bk.bk_v_story TO bk_role_consult;
-- Droit en écriture des utilisateurs du schéma bk sur la table bk_client du schéma bk
GRANT INSERT,UPDATE,SELECT ON bk.bk_client TO bk_role_admin;

-- Droit en écriture des utilisateurs du schéma bk sur la table bk_fio du schéma bk
GRANT INSERT,UPDATE,SELECT ON bk.bk_fio TO bk_role_admin;

-- Droit en écriture des utilisateurs du schéma bk sur la table bk_post du schéma bk
GRANT INSERT,UPDATE,SELECT ON bk.bk_post TO bk_role_admin;

-- Droit en écriture des utilisateurs du schéma bk sur la table bk_story du schéma bk
GRANT INSERT,UPDATE,SELECT ON bk.bk_story TO bk_role_admin;

-- Droit en écriture des utilisateurs du schéma bk sur la table bk_user du schéma bk
GRANT INSERT,UPDATE,SELECT ON bk.bk_user TO bk_role_admin;

-- Attribution des roles au comptes de connexion
GRANT bk_role_consult TO bk_role_admin;
GRANT bk_role_consult TO bk_user_consult;
GRANT bk_role_admin TO bk_user_admin;

COMMENT ON TABLE bk.bk_client IS 'client';
COMMENT ON COLUMN bk.bk_client.id IS 'id';
COMMENT ON COLUMN bk.bk_client.nom IS 'nom';
COMMENT ON COLUMN bk.bk_client.rep_del IS 'délai réponse (heure)';
COMMENT ON COLUMN bk.bk_client.exe_del IS 'délai éxécution (jour)';
COMMENT ON TABLE bk.bk_fio IS 'fichier';
COMMENT ON COLUMN bk.bk_fio.id IS 'id';
COMMENT ON COLUMN bk.bk_fio.bk_story__id IS 'rapport';
COMMENT ON COLUMN bk.bk_fio.name IS 'nom';
COMMENT ON COLUMN bk.bk_fio.ext IS 'extension';
COMMENT ON COLUMN bk.bk_fio.content IS 'contenu';
COMMENT ON TABLE bk.bk_post IS 'post';
COMMENT ON COLUMN bk.bk_post.id IS 'id';
COMMENT ON COLUMN bk.bk_post.bk_user__id IS 'utilisateur';
COMMENT ON COLUMN bk.bk_post.bk_story__id IS 'rapport';
COMMENT ON COLUMN bk.bk_post.content IS 'contenu';
COMMENT ON COLUMN bk.bk_post.dc IS 'date création';
COMMENT ON COLUMN bk.bk_post.state IS 'etat';
COMMENT ON TABLE bk.bk_story IS 'rapport';
COMMENT ON COLUMN bk.bk_story.id IS 'id';
COMMENT ON COLUMN bk.bk_story.bk_user__id IS 'utilisateur';
COMMENT ON COLUMN bk.bk_story.prod IS 'produit';
COMMENT ON COLUMN bk.bk_story.app IS 'application';
COMMENT ON COLUMN bk.bk_story.sev IS 'sévérité';
COMMENT ON COLUMN bk.bk_story.prio IS 'priorité';
COMMENT ON COLUMN bk.bk_story.repro IS 'reproductible';
COMMENT ON COLUMN bk.bk_story.dc IS 'date création';
COMMENT ON COLUMN bk.bk_story.title IS 'titre';
COMMENT ON TABLE bk.bk_user IS 'utilisateurs';
COMMENT ON COLUMN bk.bk_user.id IS 'id';
COMMENT ON COLUMN bk.bk_user.bk_client__id IS 'client';
COMMENT ON COLUMN bk.bk_user.mail IS 'email';
COMMENT ON COLUMN bk.bk_user.password IS 'password';
COMMENT ON COLUMN bk.bk_user.name IS 'nom complet';

