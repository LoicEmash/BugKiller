﻿-- Création des utilisateurs du schéma cadix
CREATE USER cadix_user_consult IDENTIFIED BY cadix_user_consult DEFAULT TABLESPACE USERS QUOTA UNLIMITED ON USERS;
CREATE USER cadix_user_admin IDENTIFIED BY cadix_user_admin DEFAULT TABLESPACE USERS QUOTA UNLIMITED ON USERS;

-- Création des roles du schéma cadix
CREATE ROLE cadix_role_consult;
CREATE ROLE cadix_role_admin;

-- Création du schéma cadix
CREATE USER cadix IDENTIFIED BY cadix;

-- Création de la table ana_prp
CREATE TABLE cadix.ana_prp (
	ana_thema__id_thema NUMBER(6,0) NOT NULL,
	legende VARCHAR2(100 CHAR) NOT NULL,
	ordre NUMBER(2,0) NOT NULL,
	couleur VARCHAR2(9 CHAR) NOT NULL,
	valeur1 VARCHAR2(50 CHAR),
	valeur2 VARCHAR2(50 CHAR),
	operateur VARCHAR2(15 CHAR)
);

-- Création de la table ana_thema
CREATE TABLE cadix.ana_thema (
	id_thema NUMBER(6,0) NOT NULL,
	prof_user__id_user NUMBER(6,0) NOT NULL,
	tablename VARCHAR2(150 CHAR) NOT NULL,
	colonne VARCHAR2(100 CHAR) NOT NULL,
	libelle VARCHAR2(100 CHAR) NOT NULL,
	isshared NUMBER(1),
	showothervalues NUMBER(1),
	countothervalues NUMBER(1),
	legendtype VARCHAR2(50 CHAR) NOT NULL,
	imagepreview BLOB
);

-- Création de la table deg_app
CREATE TABLE cadix.deg_app (
	name VARCHAR2(50 CHAR) NOT NULL,
	libelle VARCHAR2(150 CHAR)
);

-- Création de la table deg_indic
CREATE TABLE cadix.deg_indic (
	deg_app__name VARCHAR2(50 CHAR) NOT NULL,
	name VARCHAR2(50 CHAR) NOT NULL,
	libelle VARCHAR2(150 CHAR) NOT NULL,
	unite VARCHAR2(3 CHAR) NOT NULL,
	sens VARCHAR2(1 CHAR),
	s1 NUMBER(3,0),
	s2 NUMBER(3,0),
	s3 NUMBER(3,0),
	max_value NUMBER(3,0),
	type_trace NUMBER(2,0),
	couleur VARCHAR2(9 CHAR)
);

-- Création de la table deg_matrix
CREATE TABLE cadix.deg_matrix (
	deg_model__model VARCHAR2(50 CHAR) NOT NULL,
	key VARCHAR2(50 CHAR) NOT NULL,
	currow NUMBER(1,0) NOT NULL,
	maxrow NUMBER(1,0) NOT NULL,
	curcol NUMBER(1,0) NOT NULL,
	maxcol NUMBER(1,0) NOT NULL,
	nbseuil NUMBER(1,0) NOT NULL,
	valeur NUMBER(3,0) NOT NULL
);

-- Création de la table deg_mesure
CREATE TABLE cadix.deg_mesure (
	deg_indic__deg_app__name VARCHAR2(50 CHAR) NOT NULL,
	deg_indic__name VARCHAR2(50 CHAR) NOT NULL,
	absdeb NUMBER(7,0) NOT NULL,
	datereleve DATE NOT NULL,
	numroute NUMBER(5,0) NOT NULL,
	absfin NUMBER(7,0),
	valeur NUMBER(8,2),
	repaired NUMBER(1) NOT NULL
);

-- Création de la table deg_mesure_agregee
CREATE TABLE cadix.deg_mesure_agregee (
	deg_indic__deg_app__name VARCHAR2(50 CHAR) NOT NULL,
	deg_indic__name VARCHAR2(50 CHAR) NOT NULL,
	numtroncon NUMBER(3,0) NOT NULL,
	numroute NUMBER(5,0) NOT NULL,
	valeur NUMBER(8,2)
);

-- Création de la table deg_mesure_agregee_pourcent
CREATE TABLE cadix.deg_mesure_agregee_pourcent (
	deg_indic__deg_app__name VARCHAR2(50 CHAR) NOT NULL,
	deg_indic__name VARCHAR2(50 CHAR) NOT NULL,
	numtroncon NUMBER(3,0) NOT NULL,
	numroute NUMBER(5,0) NOT NULL,
	valeur NUMBER(8,2) NOT NULL,
	pourcent NUMBER(5,2)
);

-- Création de la table deg_model
CREATE TABLE cadix.deg_model (
	model VARCHAR2(50 CHAR) NOT NULL
);

-- Création de la table deg_model_indic
CREATE TABLE cadix.deg_model_indic (
	deg_model__model VARCHAR2(50 CHAR) NOT NULL,
	deg_indic__deg_app__name VARCHAR2(50 CHAR) NOT NULL,
	deg_indic__name VARCHAR2(50 CHAR) NOT NULL,
	poidstruct NUMBER(2,0),
	poidsurf NUMBER(2,0)
);

-- Création de la table deg_seuil
CREATE TABLE cadix.deg_seuil (
	seuil NUMBER(1,0) NOT NULL,
	nbseuil NUMBER(1,0) NOT NULL,
	couleur VARCHAR2(9 CHAR) NOT NULL,
	etatvaleur NUMBER(1,0) NOT NULL
);

-- Création de la table devis_bordereau
CREATE TABLE cadix.devis_bordereau (
	id_bordereau NUMBER(6,0) NOT NULL,
	code VARCHAR2(10 CHAR) NOT NULL,
	nature VARCHAR2(50 CHAR) NOT NULL,
	libelle VARCHAR2(254 CHAR) NOT NULL,
	unite VARCHAR2(5 CHAR) NOT NULL,
	prixunite NUMBER(8,2) NOT NULL,
	datemaj TIMESTAMP,
	archived NUMBER(1) NOT NULL
);

-- Création de la table devis_detailtechnique
CREATE TABLE cadix.devis_detailtechnique (
	devis_technique__id_technique NUMBER(6,0) NOT NULL,
	devis_bordereau__id_bordereau NUMBER(6,0) NOT NULL
);

-- Création de la table devis_partie
CREATE TABLE cadix.devis_partie (
	tablename VARCHAR2(150 CHAR) NOT NULL,
	libelle VARCHAR2(100 CHAR)
);

-- Création de la table devis_prevision
CREATE TABLE cadix.devis_prevision (
	id_prevision NUMBER(6,0) NOT NULL,
	libelle VARCHAR2(150 CHAR) NOT NULL,
	numroute NUMBER(6,0) NOT NULL,
	absdeb NUMBER(8,2) NOT NULL,
	absfin NUMBER(6,0) NOT NULL,
	datedevis TIMESTAMP NOT NULL,
	repaired NUMBER(1)
);

-- Création de la table devis_previsiondetail
CREATE TABLE cadix.devis_previsiondetail (
	devis_prevision__id_prevision NUMBER(6,0) NOT NULL,
	devis_technique__id_technique NUMBER(6,0) NOT NULL,
	devis_bordereau__id_bordereau NUMBER(6,0) NOT NULL,
	taux NUMBER(8,2) NOT NULL,
	quantite NUMBER(7,0)
);

-- Création de la table devis_technique
CREATE TABLE cadix.devis_technique (
	id_technique NUMBER(6,0) NOT NULL,
	devis_partie__tablename VARCHAR2(150 CHAR) NOT NULL,
	technique VARCHAR2(100 CHAR) NOT NULL,
	description VARCHAR2(254 CHAR),
	datetech TIMESTAMP,
	fixed NUMBER(1) NOT NULL
);

-- Création de la table image_camera
CREATE TABLE cadix.image_camera (
	idcamera NUMBER(6,0) NOT NULL,
	libelle VARCHAR2(150 CHAR) NOT NULL,
	focal NUMBER(9,6),
	deplacement NUMBER(9,0),
	ordredefilement NUMBER(1,0) NOT NULL,
	dossier VARCHAR2(50 CHAR)
);

-- Création de la table image_prp
CREATE TABLE cadix.image_prp (
	name VARCHAR2(50 CHAR) NOT NULL,
	valeur VARCHAR2(255 CHAR) NOT NULL
);

-- Création de la table image_valeur
CREATE TABLE cadix.image_valeur (
	idimage NUMBER(6,0) NOT NULL,
	image_camera__idcamera NUMBER(6,0) NOT NULL,
	numroute NUMBER(6,0) NOT NULL,
	absdeb NUMBER(8,2) NOT NULL,
	nomimage VARCHAR2(100 CHAR) NOT NULL,
	coord_x NUMBER(18,9),
	datereleve DATE NOT NULL,
	coord_y NUMBER(18,9),
	coord_z NUMBER(18,9)
);

-- Création de la table map_dependance
CREATE TABLE cadix.map_dependance (
	row_id NUMBER(5,0) NOT NULL,
	insee VARCHAR2(5 CHAR) NOT NULL,
	numroute NUMBER(6,0) NOT NULL,
	numtroncon NUMBER(6,0) NOT NULL,
	absdeb NUMBER(6,0),
	absfin NUMBER(6,0),
	rivoli VARCHAR2(5 CHAR),
	nomroute VARCHAR2(50 CHAR) NOT NULL,
	libelle VARCHAR2(150 CHAR) NOT NULL,
	sens VARCHAR2(12 CHAR) NOT NULL,
	longueur NUMBER(6,0),
	largeur NUMBER(5,2),
	surface NUMBER(8,2),
	dependance VARCHAR2(50 CHAR),
	materiau VARCHAR2(50 CHAR),
	etat VARCHAR2(50 CHAR),
	degrad_majo VARCHAR2(50 CHAR),
	bordure VARCHAR2(50 CHAR),
	bordure_etat VARCHAR2(50 CHAR),
	caniveau VARCHAR2(50 CHAR),
	caniveau_etat VARCHAR2(50 CHAR),
	commentaire CLOB
);

-- Création de la table map_stationnement
CREATE TABLE cadix.map_stationnement (
	row_id NUMBER(5,0) NOT NULL,
	insee VARCHAR2(5 CHAR) NOT NULL,
	numroute NUMBER(6,0) NOT NULL,
	numtroncon NUMBER(6,0) NOT NULL,
	absdeb NUMBER(6,0),
	absfin NUMBER(6,0),
	rivoli VARCHAR2(5 CHAR),
	nomroute VARCHAR2(50 CHAR) NOT NULL,
	libelle VARCHAR2(150 CHAR) NOT NULL,
	sens VARCHAR2(12 CHAR) NOT NULL,
	longueur NUMBER(6,0),
	largeur NUMBER(5,2),
	surface NUMBER(8,2),
	typeparking VARCHAR2(15 CHAR),
	typeplace VARCHAR2(15 CHAR),
	etat VARCHAR2(15 CHAR),
	nbrplaces NUMBER(2,0),
	handicap NUMBER(2,0),
	livraison NUMBER(2,0),
	reserve NUMBER(2,0),
	illicite NUMBER(2,0)
);

-- Création de la table map_voirie
CREATE TABLE cadix.map_voirie (
	row_id NUMBER(6,0) NOT NULL,
	insee VARCHAR2(5 CHAR),
	numroute NUMBER(6,0) NOT NULL,
	numtroncon NUMBER(6,0) NOT NULL,
	absdeb NUMBER(8,2) NOT NULL,
	absfin NUMBER(6,0) NOT NULL,
	nomroute VARCHAR2(150 CHAR),
	libelle VARCHAR2(150 CHAR),
	longueur NUMBER(6,0),
	largeur NUMBER(5,2),
	surface NUMBER(8,2),
	aboutissant VARCHAR2(150 CHAR),
	bus VARCHAR2(50 CHAR),
	categorie VARCHAR2(50 CHAR),
	classeadmin VARCHAR2(12 CHAR),
	commentaire CLOB,
	commune VARCHAR2(50 CHAR),
	decisionmodel VARCHAR2(50 CHAR),
	diag_annee VARCHAR2(4 CHAR),
	domaine VARCHAR2(50 CHAR),
	etat VARCHAR2(50 CHAR),
	etat_struct VARCHAR2(50 CHAR),
	etat_surf VARCHAR2(50 CHAR),
	gestionnaire VARCHAR2(50 CHAR),
	hierarchie NUMBER(1,0),
	importance NUMBER(1,0),
	indchausse NUMBER(5,2),
	indstruct NUMBER(5,2),
	indsurf NUMBER(5,2),
	ivh VARCHAR2(50 CHAR),
	nbrvoie NUMBER(1,0),
	prev_annee VARCHAR2(4 CHAR),
	prev_cout NUMBER(11,2),
	prev_nature VARCHAR2(50 CHAR),
	prev_realise NUMBER(1),
	prev_regroupement VARCHAR2(50 CHAR),
	priorite NUMBER(1,0),
	quartier VARCHAR2(50 CHAR),
	rivoli VARCHAR2(5 CHAR),
	secteur VARCHAR2(50 CHAR),
	sens VARCHAR2(50 CHAR),
	tenant VARCHAR2(150 CHAR),
	trafic NUMBER(1,0),
	trav_date DATE,
	trav_datefg DATE,
	trav_entreprise VARCHAR2(50 CHAR),
	trav_montant NUMBER(11,2),
	trav_nature VARCHAR2(50 CHAR),
	type_struct VARCHAR2(50 CHAR),
	utilisation VARCHAR2(50 CHAR)
);

-- Création de la table prof_role
CREATE TABLE cadix.prof_role (
	name VARCHAR2(50 CHAR) NOT NULL,
	description VARCHAR2(254 CHAR)
);

-- Création de la table prof_role_table
CREATE TABLE cadix.prof_role_table (
	prof_role__name VARCHAR2(50 CHAR) NOT NULL,
	tablename VARCHAR2(100 CHAR) NOT NULL,
	property VARCHAR2(50 CHAR) NOT NULL,
	value VARCHAR2(50 CHAR)
);

-- Création de la table prof_user
CREATE TABLE cadix.prof_user (
	id_user NUMBER(6,0) NOT NULL,
	prof_role__name VARCHAR2(50 CHAR) NOT NULL,
	login VARCHAR2(50 CHAR) NOT NULL,
	pass VARCHAR2(100 CHAR),
	nom VARCHAR2(50 CHAR),
	prenom VARCHAR2(50 CHAR),
	email VARCHAR2(100 CHAR)
);

-- Création de la table prp_client
CREATE TABLE cadix.prp_client (
	city VARCHAR2(50 CHAR) NOT NULL,
	adress VARCHAR2(254 CHAR),
	zipcode VARCHAR2(20 CHAR),
	email VARCHAR2(50 CHAR),
	website VARCHAR2(100 CHAR),
	logo BLOB
);

-- Création de la table prp_general
CREATE TABLE cadix.prp_general (
	name VARCHAR2(254 CHAR) NOT NULL,
	value VARCHAR2(254 CHAR) NOT NULL
);

-- Création de la table prp_group
CREATE TABLE cadix.prp_group (
	tb_group__id_group NUMBER(6,0) NOT NULL,
	prof_user__id_user NUMBER(6,0) NOT NULL,
	name VARCHAR2(50 CHAR) NOT NULL,
	value VARCHAR2(50 CHAR) NOT NULL
);

-- Création de la table prp_importexport
CREATE TABLE cadix.prp_importexport (
	tablename VARCHAR2(50 CHAR) NOT NULL,
	columnshape VARCHAR2(15 CHAR) NOT NULL,
	columnbase VARCHAR2(50 CHAR) NOT NULL
);

-- Création de la table prp_map
CREATE TABLE cadix.prp_map (
	tb_map__id_map NUMBER(6,0) NOT NULL,
	prof_user__id_user NUMBER(6,0) NOT NULL,
	property VARCHAR2(50 CHAR) NOT NULL,
	columnname VARCHAR2(50 CHAR) NOT NULL,
	value VARCHAR2(50 CHAR) NOT NULL
);

-- Création de la table prp_system
CREATE TABLE cadix.prp_system (
	code_table VARCHAR2(50 CHAR) NOT NULL,
	code_colonne VARCHAR2(50 CHAR) NOT NULL,
	code_prp VARCHAR2(50 CHAR) NOT NULL,
	val_prp VARCHAR2(254 CHAR)
);

-- Création de la table sis_param
CREATE TABLE cadix.sis_param (
	id_paramsis NUMBER(6,0) NOT NULL,
	nommodel VARCHAR2(50 CHAR) NOT NULL,
	libelle VARCHAR2(100 CHAR) NOT NULL,
	ordre NUMBER(2,0),
	tablename VARCHAR2(100 CHAR) NOT NULL,
	columnname VARCHAR2(100 CHAR),
	typetrace NUMBER(2,0) NOT NULL,
	hauteurzone NUMBER(3,1) NOT NULL,
	filtre VARCHAR2(100 CHAR),
	filtresub VARCHAR2(100 CHAR)
);

-- Création de la table sis_valeur
CREATE TABLE cadix.sis_valeur (
	id_valeur NUMBER(6,0) NOT NULL,
	sis_param__id_paramsis NUMBER(6,0) NOT NULL,
	requete VARCHAR2(255 CHAR),
	libelle VARCHAR2(50 CHAR) NOT NULL,
	couleur VARCHAR2(9 CHAR) NOT NULL,
	hasborder NUMBER(1),
	taille NUMBER(2,0),
	symbtype VARCHAR2(25 CHAR),
	font_name VARCHAR2(50 CHAR),
	font_char NUMBER(3,0),
	opacity NUMBER(3,2)
);

-- Création de la table tb_doc
CREATE TABLE cadix.tb_doc (
	id_doc NUMBER(6,0) NOT NULL,
	title VARCHAR2(50 CHAR),
	pathdoc CLOB,
	isdefault NUMBER(1),
	layername VARCHAR2(75 CHAR),
	numroute NUMBER(9,0),
	numtroncon NUMBER(6,0),
	coord_x NUMBER(18,9),
	coord_y NUMBER(18,9),
	dateheure TIMESTAMP
);

-- Création de la table tb_group
CREATE TABLE cadix.tb_group (
	id_group NUMBER(6,0) NOT NULL,
	groupe VARCHAR2(50 CHAR) NOT NULL,
	libelle VARCHAR2(50 CHAR) NOT NULL,
	ordre NUMBER(2,0)
);

-- Création de la table tb_label
CREATE TABLE cadix.tb_label (
	tb_map__id_map NUMBER(6,0) NOT NULL,
	columnname VARCHAR2(50 CHAR) NOT NULL,
	textfont VARCHAR2(50 CHAR) NOT NULL,
	textcolor VARCHAR2(9 CHAR) NOT NULL,
	textsize NUMBER(2,0) NOT NULL,
	backgroundcolor VARCHAR2(9 CHAR),
	bordercolor VARCHAR2(9 CHAR),
	labelposition VARCHAR2(50 CHAR) NOT NULL
);

-- Création de la table tb_map
CREATE TABLE cadix.tb_map (
	id_map NUMBER(6,0) NOT NULL,
	tb_style__id_style NUMBER(6,0) NOT NULL,
	tb_group__id_group NUMBER(6,0) NOT NULL,
	map VARCHAR2(50 CHAR) NOT NULL,
	libelle VARCHAR2(50 CHAR),
	ordre_group NUMBER(2,0),
	ordre_map NUMBER(2,0),
	typemap NUMBER(2,0),
	path VARCHAR2(254 CHAR),
	iszoomthreshold NUMBER(1),
	zoomthresholdmin NUMBER(9,0),
	zoomthresholdmax NUMBER(9,0)
);

-- Création de la table tb_postit
CREATE TABLE cadix.tb_postit (
	id_postit NUMBER(6,0) NOT NULL,
	prof_user__id_user NUMBER(6,0) NOT NULL,
	layername VARCHAR2(75 CHAR) NOT NULL,
	texte CLOB,
	pos_x NUMBER(4,0),
	pos_y NUMBER(4,0),
	largeur NUMBER(5,2),
	hauteur NUMBER(4,0),
	couleur VARCHAR2(9 CHAR),
	dateheure TIMESTAMP,
	coord_x NUMBER(18,9),
	coord_y NUMBER(18,9),
	numroute NUMBER(9,0),
	numtroncon NUMBER(6,0)
);

-- Création de la table tb_style
CREATE TABLE cadix.tb_style (
	id_style NUMBER(6,0) NOT NULL,
	libelle VARCHAR2(50 CHAR),
	color1 VARCHAR2(9 CHAR),
	color2 VARCHAR2(9 CHAR),
	color_selected1 VARCHAR2(9 CHAR),
	color_selected2 VARCHAR2(9 CHAR),
	color_border VARCHAR2(9 CHAR),
	color_border_selected VARCHAR2(9 CHAR),
	size_normal NUMBER(3,1),
	size_selected NUMBER(3,1),
	size_border NUMBER(3,1),
	type_style VARCHAR2(50 CHAR),
	type_symbole NUMBER(2,0),
	type_line NUMBER(2,0),
	type_polygone NUMBER(2,0)
);

-- Création de la table voirie_tab
CREATE TABLE cadix.voirie_tab (
	tab VARCHAR2(50 CHAR) NOT NULL,
	libelle VARCHAR2(100 CHAR) NOT NULL,
	ordre NUMBER(2,0) NOT NULL
);

-- Création de la table voirie_tabcolumns
CREATE TABLE cadix.voirie_tabcolumns (
	voirie_tab__tab VARCHAR2(50 CHAR) NOT NULL,
	prof_user__id_user NUMBER(6,0) NOT NULL,
	columnname VARCHAR2(50 CHAR) NOT NULL,
	position NUMBER(2,0) NOT NULL,
	taille NUMBER(6,2)
);

-- Création de la contrainte tb_map_pk de la table tb_map
ALTER TABLE cadix.tb_map ADD CONSTRAINT tb_map_pk PRIMARY KEY (id_map);

-- Création de la contrainte tb_group_pk de la table tb_group
ALTER TABLE cadix.tb_group ADD CONSTRAINT tb_group_pk PRIMARY KEY (id_group);

-- Création de la contrainte prp_general_pk de la table prp_general
ALTER TABLE cadix.prp_general ADD CONSTRAINT prp_general_pk PRIMARY KEY (name);

-- Création de la contrainte prp_map_pk de la table prp_map
ALTER TABLE cadix.prp_map ADD CONSTRAINT prp_map_pk PRIMARY KEY (tb_map__id_map,prof_user__id_user,property,columnname);

-- Création de la contrainte tb_style_pk de la table tb_style
ALTER TABLE cadix.tb_style ADD CONSTRAINT tb_style_pk PRIMARY KEY (id_style);

-- Création de la contrainte tb_postit_pk de la table tb_postit
ALTER TABLE cadix.tb_postit ADD CONSTRAINT tb_postit_pk PRIMARY KEY (id_postit);

-- Création de la contrainte prof_user_pk de la table prof_user
ALTER TABLE cadix.prof_user ADD CONSTRAINT prof_user_pk PRIMARY KEY (id_user);

-- Création de la contrainte prp_group_pk de la table prp_group
ALTER TABLE cadix.prp_group ADD CONSTRAINT prp_group_pk PRIMARY KEY (tb_group__id_group,prof_user__id_user,name);

-- Création de la contrainte prof_role_pk de la table prof_role
ALTER TABLE cadix.prof_role ADD CONSTRAINT prof_role_pk PRIMARY KEY (name);

-- Création de la contrainte prp_system_pk de la table prp_system
ALTER TABLE cadix.prp_system ADD CONSTRAINT prp_system_pk PRIMARY KEY (code_table,code_colonne,code_prp);

-- Création de la contrainte prp_client_pk de la table prp_client
ALTER TABLE cadix.prp_client ADD CONSTRAINT prp_client_pk PRIMARY KEY (city);

-- Création de la contrainte deg_app_pk de la table deg_app
ALTER TABLE cadix.deg_app ADD CONSTRAINT deg_app_pk PRIMARY KEY (name);

-- Création de la contrainte deg_indic_pk de la table deg_indic
ALTER TABLE cadix.deg_indic ADD CONSTRAINT deg_indic_pk PRIMARY KEY (deg_app__name,name);

-- Création de la contrainte sis_param_pk de la table sis_param
ALTER TABLE cadix.sis_param ADD CONSTRAINT sis_param_pk PRIMARY KEY (id_paramsis);

-- Création de la contrainte sis_valeur_pk de la table sis_valeur
ALTER TABLE cadix.sis_valeur ADD CONSTRAINT sis_valeur_pk PRIMARY KEY (id_valeur);

-- Création de la contrainte prof_role_table_pk de la table prof_role_table
ALTER TABLE cadix.prof_role_table ADD CONSTRAINT prof_role_table_pk PRIMARY KEY (prof_role__name,tablename,property);

-- Création de la contrainte devis_technique_pk de la table devis_technique
ALTER TABLE cadix.devis_technique ADD CONSTRAINT devis_technique_pk PRIMARY KEY (id_technique);

-- Création de la contrainte devis_prevision_pk de la table devis_prevision
ALTER TABLE cadix.devis_prevision ADD CONSTRAINT devis_prevision_pk PRIMARY KEY (id_prevision);

-- Création de la contrainte devis_bordereau_pk de la table devis_bordereau
ALTER TABLE cadix.devis_bordereau ADD CONSTRAINT devis_bordereau_pk PRIMARY KEY (id_bordereau);

-- Création de la contrainte devis_partie_pk de la table devis_partie
ALTER TABLE cadix.devis_partie ADD CONSTRAINT devis_partie_pk PRIMARY KEY (tablename);

-- Création de la contrainte ana_thema_pk de la table ana_thema
ALTER TABLE cadix.ana_thema ADD CONSTRAINT ana_thema_pk PRIMARY KEY (id_thema);

-- Création de la contrainte ana_prp_pk de la table ana_prp
ALTER TABLE cadix.ana_prp ADD CONSTRAINT ana_prp_pk PRIMARY KEY (ana_thema__id_thema,legende);

-- Création de la contrainte deg_mesure_pk de la table deg_mesure
ALTER TABLE cadix.deg_mesure ADD CONSTRAINT deg_mesure_pk PRIMARY KEY (deg_indic__deg_app__name,deg_indic__name,absdeb,datereleve,numroute);

-- Création de la contrainte deg_mesure_agregee_pk de la table deg_mesure_agregee
ALTER TABLE cadix.deg_mesure_agregee ADD CONSTRAINT deg_mesure_agregee_pk PRIMARY KEY (deg_indic__deg_app__name,deg_indic__name,numtroncon,numroute);

-- Création de la contrainte deg_mesure_agregee_pourcent_pk de la table deg_mesure_agregee_pourcent
ALTER TABLE cadix.deg_mesure_agregee_pourcent ADD CONSTRAINT deg_mesure_agregee_pourcent_pk PRIMARY KEY (deg_indic__deg_app__name,deg_indic__name,numtroncon,numroute,valeur);

-- Création de la contrainte tb_label_pk de la table tb_label
ALTER TABLE cadix.tb_label ADD CONSTRAINT tb_label_pk PRIMARY KEY (tb_map__id_map);

-- Création de la contrainte prp_importexport_pk de la table prp_importexport
ALTER TABLE cadix.prp_importexport ADD CONSTRAINT prp_importexport_pk PRIMARY KEY (tablename,columnshape);

-- Création de la contrainte tb_doc_pk de la table tb_doc
ALTER TABLE cadix.tb_doc ADD CONSTRAINT tb_doc_pk PRIMARY KEY (id_doc);

-- Création de la contrainte voirie_tab_pk de la table voirie_tab
ALTER TABLE cadix.voirie_tab ADD CONSTRAINT voirie_tab_pk PRIMARY KEY (tab);

-- Création de la contrainte voirie_tabcolumns_pk de la table voirie_tabcolumns
ALTER TABLE cadix.voirie_tabcolumns ADD CONSTRAINT voirie_tabcolumns_pk PRIMARY KEY (voirie_tab__tab,prof_user__id_user,columnname);

-- Création de la contrainte devis_previsiondetail_pk de la table devis_previsiondetail
ALTER TABLE cadix.devis_previsiondetail ADD CONSTRAINT devis_previsiondetail_pk PRIMARY KEY (devis_prevision__id_prevision,devis_technique__id_technique,devis_bordereau__id_bordereau);

-- Création de la contrainte deg_seuil_pk de la table deg_seuil
ALTER TABLE cadix.deg_seuil ADD CONSTRAINT deg_seuil_pk PRIMARY KEY (seuil,nbseuil);

-- Création de la contrainte deg_matrix_pk de la table deg_matrix
ALTER TABLE cadix.deg_matrix ADD CONSTRAINT deg_matrix_pk PRIMARY KEY (deg_model__model,key,currow,maxrow,curcol,maxcol,nbseuil);

-- Création de la contrainte image_valeur_pk de la table image_valeur
ALTER TABLE cadix.image_valeur ADD CONSTRAINT image_valeur_pk PRIMARY KEY (idimage);

-- Création de la contrainte image_camera_pk de la table image_camera
ALTER TABLE cadix.image_camera ADD CONSTRAINT image_camera_pk PRIMARY KEY (idcamera);

-- Création de la contrainte image_prp_pk de la table image_prp
ALTER TABLE cadix.image_prp ADD CONSTRAINT image_prp_pk PRIMARY KEY (name);

-- Création de la contrainte map_voirie_pk de la table map_voirie
ALTER TABLE cadix.map_voirie ADD CONSTRAINT map_voirie_pk PRIMARY KEY (row_id);

-- Création de la contrainte map_dependance_pk de la table map_dependance
ALTER TABLE cadix.map_dependance ADD CONSTRAINT map_dependance_pk PRIMARY KEY (row_id);

-- Création de la contrainte map_stationnement_pk de la table map_stationnement
ALTER TABLE cadix.map_stationnement ADD CONSTRAINT map_stationnement_pk PRIMARY KEY (row_id);

-- Création de la contrainte deg_model_pk de la table deg_model
ALTER TABLE cadix.deg_model ADD CONSTRAINT deg_model_pk PRIMARY KEY (model);

-- Création de la contrainte devis_detailtechnique_pk de la table devis_detailtechnique
ALTER TABLE cadix.devis_detailtechnique ADD CONSTRAINT devis_detailtechnique_pk PRIMARY KEY (devis_technique__id_technique,devis_bordereau__id_bordereau);

-- Création de la contrainte deg_model_indic_pk de la table deg_model_indic
ALTER TABLE cadix.deg_model_indic ADD CONSTRAINT deg_model_indic_pk PRIMARY KEY (deg_model__model,deg_indic__deg_app__name,deg_indic__name);

-- Création de la contrainte group_map de la table tb_map qui référence la table tb_group
ALTER TABLE cadix.tb_map ADD CONSTRAINT group_map FOREIGN KEY   (tb_group__id_group) REFERENCES cadix.tb_group (id_group);

-- Création de la contrainte style_map de la table tb_map qui référence la table tb_style
ALTER TABLE cadix.tb_map ADD CONSTRAINT style_map FOREIGN KEY   (tb_style__id_style) REFERENCES cadix.tb_style (id_style);

-- Création de la contrainte user_postit de la table tb_postit qui référence la table prof_user
ALTER TABLE cadix.tb_postit ADD CONSTRAINT user_postit FOREIGN KEY   (prof_user__id_user) REFERENCES cadix.prof_user (id_user);

-- Création de la contrainte role_user de la table prof_user qui référence la table prof_role
ALTER TABLE cadix.prof_user ADD CONSTRAINT role_user FOREIGN KEY   (prof_role__name) REFERENCES cadix.prof_role (name);

-- Création de la contrainte group_prp de la table prp_group qui référence la table tb_group
ALTER TABLE cadix.prp_group ADD CONSTRAINT group_prp FOREIGN KEY   (tb_group__id_group) REFERENCES cadix.tb_group (id_group);

-- Création de la contrainte map_prp de la table prp_map qui référence la table tb_map
ALTER TABLE cadix.prp_map ADD CONSTRAINT map_prp FOREIGN KEY   (tb_map__id_map) REFERENCES cadix.tb_map (id_map);

-- Création de la contrainte appareil_indicateur de la table deg_indic qui référence la table deg_app
ALTER TABLE cadix.deg_indic ADD CONSTRAINT appareil_indicateur FOREIGN KEY   (deg_app__name) REFERENCES cadix.deg_app (name);

-- Création de la contrainte param_valeur de la table sis_valeur qui référence la table sis_param
ALTER TABLE cadix.sis_valeur ADD CONSTRAINT param_valeur FOREIGN KEY   (sis_param__id_paramsis) REFERENCES cadix.sis_param (id_paramsis);

-- Création de la contrainte role_table_role de la table prof_role_table qui référence la table prof_role
ALTER TABLE cadix.prof_role_table ADD CONSTRAINT role_table_role FOREIGN KEY   (prof_role__name) REFERENCES cadix.prof_role (name);

-- Création de la contrainte user_prp_map de la table prp_map qui référence la table prof_user
ALTER TABLE cadix.prp_map ADD CONSTRAINT user_prp_map FOREIGN KEY   (prof_user__id_user) REFERENCES cadix.prof_user (id_user);

-- Création de la contrainte user_prp_group de la table prp_group qui référence la table prof_user
ALTER TABLE cadix.prp_group ADD CONSTRAINT user_prp_group FOREIGN KEY   (prof_user__id_user) REFERENCES cadix.prof_user (id_user);

-- Création de la contrainte devis_partietechnique de la table devis_technique qui référence la table devis_partie
ALTER TABLE cadix.devis_technique ADD CONSTRAINT devis_partietechnique FOREIGN KEY   (devis_partie__tablename) REFERENCES cadix.devis_partie (tablename);

-- Création de la contrainte thema_prp de la table ana_prp qui référence la table ana_thema
ALTER TABLE cadix.ana_prp ADD CONSTRAINT thema_prp FOREIGN KEY   (ana_thema__id_thema) REFERENCES cadix.ana_thema (id_thema);

-- Création de la contrainte thema_user de la table ana_thema qui référence la table prof_user
ALTER TABLE cadix.ana_thema ADD CONSTRAINT thema_user FOREIGN KEY   (prof_user__id_user) REFERENCES cadix.prof_user (id_user);

-- Création de la contrainte mesure_indicateur de la table deg_mesure qui référence la table deg_indic
ALTER TABLE cadix.deg_mesure ADD CONSTRAINT mesure_indicateur FOREIGN KEY   (deg_indic__deg_app__name,deg_indic__name) REFERENCES cadix.deg_indic (deg_app__name,name);

-- Création de la contrainte mesureagg_indicateur de la table deg_mesure_agregee qui référence la table deg_indic
ALTER TABLE cadix.deg_mesure_agregee ADD CONSTRAINT mesureagg_indicateur FOREIGN KEY   (deg_indic__deg_app__name,deg_indic__name) REFERENCES cadix.deg_indic (deg_app__name,name);

-- Création de la contrainte mesureaggperc_indicateur de la table deg_mesure_agregee_pourcent qui référence la table deg_indic
ALTER TABLE cadix.deg_mesure_agregee_pourcent ADD CONSTRAINT mesureaggperc_indicateur FOREIGN KEY   (deg_indic__deg_app__name,deg_indic__name) REFERENCES cadix.deg_indic (deg_app__name,name);

-- Création de la contrainte voirie_tab__voirie_tab_column de la table voirie_tabcolumns qui référence la table voirie_tab
ALTER TABLE cadix.voirie_tabcolumns ADD CONSTRAINT voirie_tab__voirie_tab_column FOREIGN KEY   (voirie_tab__tab) REFERENCES cadix.voirie_tab (tab);

-- Création de la contrainte map_label de la table tb_label qui référence la table tb_map
ALTER TABLE cadix.tb_label ADD CONSTRAINT map_label FOREIGN KEY   (tb_map__id_map) REFERENCES cadix.tb_map (id_map);

-- Création de la contrainte devis_prev__prevdetailtech de la table devis_previsiondetail qui référence la table devis_prevision
ALTER TABLE cadix.devis_previsiondetail ADD CONSTRAINT devis_prev__prevdetailtech FOREIGN KEY   (devis_prevision__id_prevision) REFERENCES cadix.devis_prevision (id_prevision);

-- Création de la contrainte devis_prevdetail_technique de la table devis_previsiondetail qui référence la table devis_technique
ALTER TABLE cadix.devis_previsiondetail ADD CONSTRAINT devis_prevdetail_technique FOREIGN KEY   (devis_technique__id_technique) REFERENCES cadix.devis_technique (id_technique);

-- Création de la contrainte devis_prevdetail__prix de la table devis_previsiondetail qui référence la table devis_bordereau
ALTER TABLE cadix.devis_previsiondetail ADD CONSTRAINT devis_prevdetail__prix FOREIGN KEY   (devis_bordereau__id_bordereau) REFERENCES cadix.devis_bordereau (id_bordereau);

-- Création de la contrainte image_camera__image_valeur de la table image_valeur qui référence la table image_camera
ALTER TABLE cadix.image_valeur ADD CONSTRAINT image_camera__image_valeur FOREIGN KEY   (image_camera__idcamera) REFERENCES cadix.image_camera (idcamera);

-- Création de la contrainte prof_user__voirie_tabcolumns de la table voirie_tabcolumns qui référence la table prof_user
ALTER TABLE cadix.voirie_tabcolumns ADD CONSTRAINT prof_user__voirie_tabcolumns FOREIGN KEY   (prof_user__id_user) REFERENCES cadix.prof_user (id_user);

-- Création de la contrainte model_matrix de la table deg_matrix qui référence la table deg_model
ALTER TABLE cadix.deg_matrix ADD CONSTRAINT model_matrix FOREIGN KEY   (deg_model__model) REFERENCES cadix.deg_model (model);

-- Création de la contrainte devis_detailtechnique de la table devis_detailtechnique qui référence la table devis_technique
ALTER TABLE cadix.devis_detailtechnique ADD CONSTRAINT devis_detailtechnique FOREIGN KEY   (devis_technique__id_technique) REFERENCES cadix.devis_technique (id_technique);

-- Création de la contrainte devis_detailtechnique2 de la table devis_detailtechnique qui référence la table devis_bordereau
ALTER TABLE cadix.devis_detailtechnique ADD CONSTRAINT devis_detailtechnique2 FOREIGN KEY   (devis_bordereau__id_bordereau) REFERENCES cadix.devis_bordereau (id_bordereau);

-- Création de la contrainte deg_model_indic de la table deg_model_indic qui référence la table deg_model
ALTER TABLE cadix.deg_model_indic ADD CONSTRAINT deg_model_indic FOREIGN KEY   (deg_model__model) REFERENCES cadix.deg_model (model);

-- Création de la contrainte deg_model_indic2 de la table deg_model_indic qui référence la table deg_indic
ALTER TABLE cadix.deg_model_indic ADD CONSTRAINT deg_model_indic2 FOREIGN KEY   (deg_indic__deg_app__name,deg_indic__name) REFERENCES cadix.deg_indic (deg_app__name,name);

-- Droit en lecture des utilisateurs du schéma cadix sur la table ana_prp du schéma cadix
GRANT SELECT ON cadix.ana_prp TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table ana_thema du schéma cadix
GRANT SELECT ON cadix.ana_thema TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table deg_app du schéma cadix
GRANT SELECT ON cadix.deg_app TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table deg_indic du schéma cadix
GRANT SELECT ON cadix.deg_indic TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table deg_matrix du schéma cadix
GRANT SELECT ON cadix.deg_matrix TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table deg_mesure du schéma cadix
GRANT SELECT ON cadix.deg_mesure TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table deg_mesure_agregee du schéma cadix
GRANT SELECT ON cadix.deg_mesure_agregee TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table deg_mesure_agregee_pourcent du schéma cadix
GRANT SELECT ON cadix.deg_mesure_agregee_pourcent TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table deg_model du schéma cadix
GRANT SELECT ON cadix.deg_model TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table deg_model_indic du schéma cadix
GRANT SELECT ON cadix.deg_model_indic TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table deg_seuil du schéma cadix
GRANT SELECT ON cadix.deg_seuil TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table devis_bordereau du schéma cadix
GRANT SELECT ON cadix.devis_bordereau TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table devis_detailtechnique du schéma cadix
GRANT SELECT ON cadix.devis_detailtechnique TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table devis_partie du schéma cadix
GRANT SELECT ON cadix.devis_partie TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table devis_prevision du schéma cadix
GRANT SELECT ON cadix.devis_prevision TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table devis_previsiondetail du schéma cadix
GRANT SELECT ON cadix.devis_previsiondetail TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table devis_technique du schéma cadix
GRANT SELECT ON cadix.devis_technique TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table image_camera du schéma cadix
GRANT SELECT ON cadix.image_camera TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table image_prp du schéma cadix
GRANT SELECT ON cadix.image_prp TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table image_valeur du schéma cadix
GRANT SELECT ON cadix.image_valeur TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table map_dependance du schéma cadix
GRANT SELECT ON cadix.map_dependance TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table map_stationnement du schéma cadix
GRANT SELECT ON cadix.map_stationnement TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table map_voirie du schéma cadix
GRANT SELECT ON cadix.map_voirie TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table prof_role du schéma cadix
GRANT SELECT ON cadix.prof_role TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table prof_role_table du schéma cadix
GRANT SELECT ON cadix.prof_role_table TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table prof_user du schéma cadix
GRANT SELECT ON cadix.prof_user TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table prp_client du schéma cadix
GRANT SELECT ON cadix.prp_client TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table prp_general du schéma cadix
GRANT SELECT ON cadix.prp_general TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table prp_group du schéma cadix
GRANT SELECT ON cadix.prp_group TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table prp_importexport du schéma cadix
GRANT SELECT ON cadix.prp_importexport TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table prp_map du schéma cadix
GRANT SELECT ON cadix.prp_map TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table prp_system du schéma cadix
GRANT SELECT ON cadix.prp_system TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table sis_param du schéma cadix
GRANT SELECT ON cadix.sis_param TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table sis_valeur du schéma cadix
GRANT SELECT ON cadix.sis_valeur TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table tb_doc du schéma cadix
GRANT SELECT ON cadix.tb_doc TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table tb_group du schéma cadix
GRANT SELECT ON cadix.tb_group TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table tb_label du schéma cadix
GRANT SELECT ON cadix.tb_label TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table tb_map du schéma cadix
GRANT SELECT ON cadix.tb_map TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table tb_postit du schéma cadix
GRANT SELECT ON cadix.tb_postit TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table tb_style du schéma cadix
GRANT SELECT ON cadix.tb_style TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table voirie_tab du schéma cadix
GRANT SELECT ON cadix.voirie_tab TO cadix_role_consult;

-- Droit en lecture des utilisateurs du schéma cadix sur la table voirie_tabcolumns du schéma cadix
GRANT SELECT ON cadix.voirie_tabcolumns TO cadix_role_consult;

-- Droit en écriture des utilisateurs du schéma cadix sur la table ana_prp du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.ana_prp TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table ana_thema du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.ana_thema TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table deg_app du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.deg_app TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table deg_indic du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.deg_indic TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table deg_matrix du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.deg_matrix TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table deg_mesure du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.deg_mesure TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table deg_mesure_agregee du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.deg_mesure_agregee TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table deg_mesure_agregee_pourcent du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.deg_mesure_agregee_pourcent TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table deg_model du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.deg_model TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table deg_model_indic du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.deg_model_indic TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table deg_seuil du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.deg_seuil TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table devis_bordereau du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.devis_bordereau TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table devis_detailtechnique du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.devis_detailtechnique TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table devis_partie du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.devis_partie TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table devis_prevision du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.devis_prevision TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table devis_previsiondetail du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.devis_previsiondetail TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table devis_technique du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.devis_technique TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table image_camera du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.image_camera TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table image_prp du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.image_prp TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table image_valeur du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.image_valeur TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table map_dependance du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.map_dependance TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table map_stationnement du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.map_stationnement TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table map_voirie du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.map_voirie TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table prof_role du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.prof_role TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table prof_role_table du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.prof_role_table TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table prof_user du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.prof_user TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table prp_client du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.prp_client TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table prp_general du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.prp_general TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table prp_group du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.prp_group TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table prp_importexport du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.prp_importexport TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table prp_map du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.prp_map TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table prp_system du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.prp_system TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table sis_param du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.sis_param TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table sis_valeur du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.sis_valeur TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table tb_doc du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.tb_doc TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table tb_group du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.tb_group TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table tb_label du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.tb_label TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table tb_map du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.tb_map TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table tb_postit du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.tb_postit TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table tb_style du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.tb_style TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table voirie_tab du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.voirie_tab TO cadix_role_admin;

-- Droit en écriture des utilisateurs du schéma cadix sur la table voirie_tabcolumns du schéma cadix
GRANT INSERT,UPDATE,SELECT ON cadix.voirie_tabcolumns TO cadix_role_admin;

-- Attribution des droits de connexion
GRANT CONNECT,CREATE SESSION TO cadix;
GRANT CONNECT,CREATE SESSION TO cadix_user_consult;
GRANT CONNECT,CREATE SESSION TO cadix_user_admin;

-- Attribution des roles au comptes de connexion
GRANT cadix_role_consult TO cadix_role_admin;
GRANT cadix_role_consult TO cadix_user_consult;
GRANT cadix_role_admin TO cadix_user_admin;

COMMENT ON TABLE cadix.ana_prp IS 'ana prp';
COMMENT ON COLUMN cadix.ana_prp.ana_thema__id_thema IS 'ana thema__id thema';
COMMENT ON COLUMN cadix.ana_prp.legende IS 'legende';
COMMENT ON COLUMN cadix.ana_prp.ordre IS 'ordre';
COMMENT ON COLUMN cadix.ana_prp.couleur IS 'couleur';
COMMENT ON COLUMN cadix.ana_prp.valeur1 IS 'valeur1';
COMMENT ON COLUMN cadix.ana_prp.valeur2 IS 'valeur2';
COMMENT ON COLUMN cadix.ana_prp.operateur IS 'operateur';
COMMENT ON TABLE cadix.ana_thema IS 'ana thema';
COMMENT ON COLUMN cadix.ana_thema.id_thema IS 'id thema';
COMMENT ON COLUMN cadix.ana_thema.prof_user__id_user IS 'prof user__id user';
COMMENT ON COLUMN cadix.ana_thema.tablename IS 'tablename';
COMMENT ON COLUMN cadix.ana_thema.colonne IS 'colonne';
COMMENT ON COLUMN cadix.ana_thema.libelle IS 'libelle';
COMMENT ON COLUMN cadix.ana_thema.isshared IS 'isshared';
COMMENT ON COLUMN cadix.ana_thema.showothervalues IS 'showothervalues';
COMMENT ON COLUMN cadix.ana_thema.countothervalues IS 'countothervalues';
COMMENT ON COLUMN cadix.ana_thema.legendtype IS 'legendtype';
COMMENT ON COLUMN cadix.ana_thema.imagepreview IS 'imagepreview';
COMMENT ON TABLE cadix.deg_app IS 'deg app';
COMMENT ON COLUMN cadix.deg_app.name IS 'name';
COMMENT ON COLUMN cadix.deg_app.libelle IS 'libelle';
COMMENT ON TABLE cadix.deg_indic IS 'deg indic';
COMMENT ON COLUMN cadix.deg_indic.deg_app__name IS 'deg app__name';
COMMENT ON COLUMN cadix.deg_indic.name IS 'name';
COMMENT ON COLUMN cadix.deg_indic.libelle IS 'libelle';
COMMENT ON COLUMN cadix.deg_indic.unite IS 'unite';
COMMENT ON COLUMN cadix.deg_indic.sens IS 'sens';
COMMENT ON COLUMN cadix.deg_indic.s1 IS 's1';
COMMENT ON COLUMN cadix.deg_indic.s2 IS 's2';
COMMENT ON COLUMN cadix.deg_indic.s3 IS 's3';
COMMENT ON COLUMN cadix.deg_indic.max_value IS 'max value';
COMMENT ON COLUMN cadix.deg_indic.type_trace IS 'type trace';
COMMENT ON COLUMN cadix.deg_indic.couleur IS 'couleur';
COMMENT ON TABLE cadix.deg_matrix IS 'deg matrix';
COMMENT ON COLUMN cadix.deg_matrix.deg_model__model IS 'deg model__model';
COMMENT ON COLUMN cadix.deg_matrix.key IS 'key';
COMMENT ON COLUMN cadix.deg_matrix.currow IS 'currow';
COMMENT ON COLUMN cadix.deg_matrix.maxrow IS 'maxrow';
COMMENT ON COLUMN cadix.deg_matrix.curcol IS 'curcol';
COMMENT ON COLUMN cadix.deg_matrix.maxcol IS 'maxcol';
COMMENT ON COLUMN cadix.deg_matrix.nbseuil IS 'nbseuil';
COMMENT ON COLUMN cadix.deg_matrix.valeur IS 'valeur';
COMMENT ON TABLE cadix.deg_mesure IS 'deg mesure';
COMMENT ON COLUMN cadix.deg_mesure.deg_indic__deg_app__name IS 'deg indic__deg app__name';
COMMENT ON COLUMN cadix.deg_mesure.deg_indic__name IS 'deg indic__name';
COMMENT ON COLUMN cadix.deg_mesure.absdeb IS 'absdeb';
COMMENT ON COLUMN cadix.deg_mesure.datereleve IS 'datereleve';
COMMENT ON COLUMN cadix.deg_mesure.numroute IS 'numroute';
COMMENT ON COLUMN cadix.deg_mesure.absfin IS 'absfin';
COMMENT ON COLUMN cadix.deg_mesure.valeur IS 'valeur';
COMMENT ON COLUMN cadix.deg_mesure.repaired IS 'repaired';
COMMENT ON TABLE cadix.deg_mesure_agregee IS 'deg mesure agregee';
COMMENT ON COLUMN cadix.deg_mesure_agregee.deg_indic__deg_app__name IS 'deg indic__deg app__name';
COMMENT ON COLUMN cadix.deg_mesure_agregee.deg_indic__name IS 'deg indic__name';
COMMENT ON COLUMN cadix.deg_mesure_agregee.numtroncon IS 'numtroncon';
COMMENT ON COLUMN cadix.deg_mesure_agregee.numroute IS 'numroute';
COMMENT ON COLUMN cadix.deg_mesure_agregee.valeur IS 'valeur';
COMMENT ON TABLE cadix.deg_mesure_agregee_pourcent IS 'deg mesure agregee pourcent';
COMMENT ON COLUMN cadix.deg_mesure_agregee_pourcent.deg_indic__deg_app__name IS 'deg indic__deg app__name';
COMMENT ON COLUMN cadix.deg_mesure_agregee_pourcent.deg_indic__name IS 'deg indic__name';
COMMENT ON COLUMN cadix.deg_mesure_agregee_pourcent.numtroncon IS 'numtroncon';
COMMENT ON COLUMN cadix.deg_mesure_agregee_pourcent.numroute IS 'numroute';
COMMENT ON COLUMN cadix.deg_mesure_agregee_pourcent.valeur IS 'valeur';
COMMENT ON COLUMN cadix.deg_mesure_agregee_pourcent.pourcent IS 'pourcent';
COMMENT ON TABLE cadix.deg_model IS 'deg model';
COMMENT ON COLUMN cadix.deg_model.model IS 'model';
COMMENT ON TABLE cadix.deg_model_indic IS 'deg model indic';
COMMENT ON COLUMN cadix.deg_model_indic.deg_model__model IS 'deg model__model';
COMMENT ON COLUMN cadix.deg_model_indic.deg_indic__deg_app__name IS 'deg indic__deg app__name';
COMMENT ON COLUMN cadix.deg_model_indic.deg_indic__name IS 'deg indic__name';
COMMENT ON COLUMN cadix.deg_model_indic.poidstruct IS 'poidstruct';
COMMENT ON COLUMN cadix.deg_model_indic.poidsurf IS 'poidsurf';
COMMENT ON TABLE cadix.deg_seuil IS 'deg seuil';
COMMENT ON COLUMN cadix.deg_seuil.seuil IS 'seuil';
COMMENT ON COLUMN cadix.deg_seuil.nbseuil IS 'nbseuil';
COMMENT ON COLUMN cadix.deg_seuil.couleur IS 'couleur';
COMMENT ON COLUMN cadix.deg_seuil.etatvaleur IS 'etatvaleur';
COMMENT ON TABLE cadix.devis_bordereau IS 'devis bordereau';
COMMENT ON COLUMN cadix.devis_bordereau.id_bordereau IS 'id bordereau';
COMMENT ON COLUMN cadix.devis_bordereau.code IS 'code';
COMMENT ON COLUMN cadix.devis_bordereau.nature IS 'nature';
COMMENT ON COLUMN cadix.devis_bordereau.libelle IS 'libelle';
COMMENT ON COLUMN cadix.devis_bordereau.unite IS 'unite';
COMMENT ON COLUMN cadix.devis_bordereau.prixunite IS 'prixunite';
COMMENT ON COLUMN cadix.devis_bordereau.datemaj IS 'datemaj';
COMMENT ON COLUMN cadix.devis_bordereau.archived IS 'archived';
COMMENT ON TABLE cadix.devis_detailtechnique IS 'devis detailtechnique';
COMMENT ON COLUMN cadix.devis_detailtechnique.devis_technique__id_technique IS 'devis technique__id technique';
COMMENT ON COLUMN cadix.devis_detailtechnique.devis_bordereau__id_bordereau IS 'devis bordereau__id bordereau';
COMMENT ON TABLE cadix.devis_partie IS 'devis partie';
COMMENT ON COLUMN cadix.devis_partie.tablename IS 'tablename';
COMMENT ON COLUMN cadix.devis_partie.libelle IS 'libelle';
COMMENT ON TABLE cadix.devis_prevision IS 'devis prevision';
COMMENT ON COLUMN cadix.devis_prevision.id_prevision IS 'id prevision';
COMMENT ON COLUMN cadix.devis_prevision.libelle IS 'libelle';
COMMENT ON COLUMN cadix.devis_prevision.numroute IS 'numroute';
COMMENT ON COLUMN cadix.devis_prevision.absdeb IS 'absdeb';
COMMENT ON COLUMN cadix.devis_prevision.absfin IS 'absfin';
COMMENT ON COLUMN cadix.devis_prevision.datedevis IS 'datedevis';
COMMENT ON COLUMN cadix.devis_prevision.repaired IS 'repaired';
COMMENT ON TABLE cadix.devis_previsiondetail IS 'devis previsiondetail';
COMMENT ON COLUMN cadix.devis_previsiondetail.devis_prevision__id_prevision IS 'devis prevision__id prevision';
COMMENT ON COLUMN cadix.devis_previsiondetail.devis_technique__id_technique IS 'devis technique__id technique';
COMMENT ON COLUMN cadix.devis_previsiondetail.devis_bordereau__id_bordereau IS 'devis bordereau__id bordereau';
COMMENT ON COLUMN cadix.devis_previsiondetail.taux IS 'taux';
COMMENT ON COLUMN cadix.devis_previsiondetail.quantite IS 'quantite';
COMMENT ON TABLE cadix.devis_technique IS 'devis technique';
COMMENT ON COLUMN cadix.devis_technique.id_technique IS 'id technique';
COMMENT ON COLUMN cadix.devis_technique.devis_partie__tablename IS 'devis partie__tablename';
COMMENT ON COLUMN cadix.devis_technique.technique IS 'technique';
COMMENT ON COLUMN cadix.devis_technique.description IS 'description';
COMMENT ON COLUMN cadix.devis_technique.datetech IS 'datetech';
COMMENT ON COLUMN cadix.devis_technique.fixed IS 'fixed';
COMMENT ON TABLE cadix.image_camera IS 'image camera';
COMMENT ON COLUMN cadix.image_camera.idcamera IS 'idcamera';
COMMENT ON COLUMN cadix.image_camera.libelle IS 'libelle';
COMMENT ON COLUMN cadix.image_camera.focal IS 'focal';
COMMENT ON COLUMN cadix.image_camera.deplacement IS 'deplacement';
COMMENT ON COLUMN cadix.image_camera.ordredefilement IS 'ordredefilement';
COMMENT ON COLUMN cadix.image_camera.dossier IS 'dossier';
COMMENT ON TABLE cadix.image_prp IS 'image prp';
COMMENT ON COLUMN cadix.image_prp.name IS 'name';
COMMENT ON COLUMN cadix.image_prp.valeur IS 'valeur';
COMMENT ON TABLE cadix.image_valeur IS 'image valeur';
COMMENT ON COLUMN cadix.image_valeur.idimage IS 'idimage';
COMMENT ON COLUMN cadix.image_valeur.image_camera__idcamera IS 'image camera__idcamera';
COMMENT ON COLUMN cadix.image_valeur.numroute IS 'numroute';
COMMENT ON COLUMN cadix.image_valeur.absdeb IS 'absdeb';
COMMENT ON COLUMN cadix.image_valeur.nomimage IS 'nomimage';
COMMENT ON COLUMN cadix.image_valeur.coord_x IS 'coord_x';
COMMENT ON COLUMN cadix.image_valeur.datereleve IS 'date releve';
COMMENT ON COLUMN cadix.image_valeur.coord_y IS 'coord_y';
COMMENT ON COLUMN cadix.image_valeur.coord_z IS 'coord_z';
COMMENT ON TABLE cadix.map_dependance IS 'map dependance';
COMMENT ON COLUMN cadix.map_dependance.row_id IS 'row id';
COMMENT ON COLUMN cadix.map_dependance.insee IS 'insee';
COMMENT ON COLUMN cadix.map_dependance.numroute IS 'numroute';
COMMENT ON COLUMN cadix.map_dependance.numtroncon IS 'numtroncon';
COMMENT ON COLUMN cadix.map_dependance.absdeb IS 'absdeb';
COMMENT ON COLUMN cadix.map_dependance.absfin IS 'absfin';
COMMENT ON COLUMN cadix.map_dependance.rivoli IS 'rivoli';
COMMENT ON COLUMN cadix.map_dependance.nomroute IS 'nomroute';
COMMENT ON COLUMN cadix.map_dependance.libelle IS 'libelle';
COMMENT ON COLUMN cadix.map_dependance.sens IS 'sens';
COMMENT ON COLUMN cadix.map_dependance.longueur IS 'longueur';
COMMENT ON COLUMN cadix.map_dependance.largeur IS 'largeur';
COMMENT ON COLUMN cadix.map_dependance.surface IS 'surface';
COMMENT ON COLUMN cadix.map_dependance.dependance IS 'dependance';
COMMENT ON COLUMN cadix.map_dependance.materiau IS 'materiau';
COMMENT ON COLUMN cadix.map_dependance.etat IS 'etat';
COMMENT ON COLUMN cadix.map_dependance.degrad_majo IS 'degrad majo';
COMMENT ON COLUMN cadix.map_dependance.bordure IS 'bordure';
COMMENT ON COLUMN cadix.map_dependance.bordure_etat IS 'bordure etat';
COMMENT ON COLUMN cadix.map_dependance.caniveau IS 'caniveau';
COMMENT ON COLUMN cadix.map_dependance.caniveau_etat IS 'caniveau etat';
COMMENT ON COLUMN cadix.map_dependance.commentaire IS 'commentaire';
COMMENT ON TABLE cadix.map_stationnement IS 'map stationnement';
COMMENT ON COLUMN cadix.map_stationnement.row_id IS 'row id';
COMMENT ON COLUMN cadix.map_stationnement.insee IS 'insee';
COMMENT ON COLUMN cadix.map_stationnement.numroute IS 'numroute';
COMMENT ON COLUMN cadix.map_stationnement.numtroncon IS 'numtroncon';
COMMENT ON COLUMN cadix.map_stationnement.absdeb IS 'absdeb';
COMMENT ON COLUMN cadix.map_stationnement.absfin IS 'absfin';
COMMENT ON COLUMN cadix.map_stationnement.rivoli IS 'rivoli';
COMMENT ON COLUMN cadix.map_stationnement.nomroute IS 'nomroute';
COMMENT ON COLUMN cadix.map_stationnement.libelle IS 'libelle';
COMMENT ON COLUMN cadix.map_stationnement.sens IS 'sens';
COMMENT ON COLUMN cadix.map_stationnement.longueur IS 'longueur';
COMMENT ON COLUMN cadix.map_stationnement.largeur IS 'largeur';
COMMENT ON COLUMN cadix.map_stationnement.surface IS 'surface';
COMMENT ON COLUMN cadix.map_stationnement.typeparking IS 'typeparking';
COMMENT ON COLUMN cadix.map_stationnement.typeplace IS 'typeplace';
COMMENT ON COLUMN cadix.map_stationnement.etat IS 'etat';
COMMENT ON COLUMN cadix.map_stationnement.nbrplaces IS 'nbrplaces';
COMMENT ON COLUMN cadix.map_stationnement.handicap IS 'handicap';
COMMENT ON COLUMN cadix.map_stationnement.livraison IS 'livraison';
COMMENT ON COLUMN cadix.map_stationnement.reserve IS 'reserve';
COMMENT ON COLUMN cadix.map_stationnement.illicite IS 'illicite';
COMMENT ON TABLE cadix.map_voirie IS 'map voirie';
COMMENT ON COLUMN cadix.map_voirie.row_id IS 'row id';
COMMENT ON COLUMN cadix.map_voirie.insee IS 'insee';
COMMENT ON COLUMN cadix.map_voirie.numroute IS 'numroute';
COMMENT ON COLUMN cadix.map_voirie.numtroncon IS 'numtroncon';
COMMENT ON COLUMN cadix.map_voirie.absdeb IS 'absdeb';
COMMENT ON COLUMN cadix.map_voirie.absfin IS 'absfin';
COMMENT ON COLUMN cadix.map_voirie.nomroute IS 'nomroute';
COMMENT ON COLUMN cadix.map_voirie.libelle IS 'libelle';
COMMENT ON COLUMN cadix.map_voirie.longueur IS 'longueur';
COMMENT ON COLUMN cadix.map_voirie.largeur IS 'largeur';
COMMENT ON COLUMN cadix.map_voirie.surface IS 'surface';
COMMENT ON COLUMN cadix.map_voirie.aboutissant IS 'aboutissant';
COMMENT ON COLUMN cadix.map_voirie.bus IS 'bus';
COMMENT ON COLUMN cadix.map_voirie.categorie IS 'categorie';
COMMENT ON COLUMN cadix.map_voirie.classeadmin IS 'classeadmin';
COMMENT ON COLUMN cadix.map_voirie.commentaire IS 'commentaire';
COMMENT ON COLUMN cadix.map_voirie.commune IS 'commune';
COMMENT ON COLUMN cadix.map_voirie.decisionmodel IS 'decisionmodel';
COMMENT ON COLUMN cadix.map_voirie.diag_annee IS 'diag annee';
COMMENT ON COLUMN cadix.map_voirie.domaine IS 'domaine';
COMMENT ON COLUMN cadix.map_voirie.etat IS 'etat';
COMMENT ON COLUMN cadix.map_voirie.etat_struct IS 'etat struct';
COMMENT ON COLUMN cadix.map_voirie.etat_surf IS 'etat surf';
COMMENT ON COLUMN cadix.map_voirie.gestionnaire IS 'gestionnaire';
COMMENT ON COLUMN cadix.map_voirie.hierarchie IS 'hierarchie';
COMMENT ON COLUMN cadix.map_voirie.importance IS 'importance';
COMMENT ON COLUMN cadix.map_voirie.indchausse IS 'indchausse';
COMMENT ON COLUMN cadix.map_voirie.indstruct IS 'indstruct';
COMMENT ON COLUMN cadix.map_voirie.indsurf IS 'indsurf';
COMMENT ON COLUMN cadix.map_voirie.ivh IS 'ivh';
COMMENT ON COLUMN cadix.map_voirie.nbrvoie IS 'nbrvoie';
COMMENT ON COLUMN cadix.map_voirie.prev_annee IS 'prev annee';
COMMENT ON COLUMN cadix.map_voirie.prev_cout IS 'prev cout';
COMMENT ON COLUMN cadix.map_voirie.prev_nature IS 'prev nature';
COMMENT ON COLUMN cadix.map_voirie.prev_realise IS 'prev realise';
COMMENT ON COLUMN cadix.map_voirie.prev_regroupement IS 'prev regroupement';
COMMENT ON COLUMN cadix.map_voirie.priorite IS 'priorite';
COMMENT ON COLUMN cadix.map_voirie.quartier IS 'quartier';
COMMENT ON COLUMN cadix.map_voirie.rivoli IS 'rivoli';
COMMENT ON COLUMN cadix.map_voirie.secteur IS 'secteur';
COMMENT ON COLUMN cadix.map_voirie.sens IS 'sens';
COMMENT ON COLUMN cadix.map_voirie.tenant IS 'tenant';
COMMENT ON COLUMN cadix.map_voirie.trafic IS 'trafic';
COMMENT ON COLUMN cadix.map_voirie.trav_date IS 'trav date';
COMMENT ON COLUMN cadix.map_voirie.trav_datefg IS 'trav datefg';
COMMENT ON COLUMN cadix.map_voirie.trav_entreprise IS 'trav entreprise';
COMMENT ON COLUMN cadix.map_voirie.trav_montant IS 'trav montant';
COMMENT ON COLUMN cadix.map_voirie.trav_nature IS 'trav nature';
COMMENT ON COLUMN cadix.map_voirie.type_struct IS 'type struct';
COMMENT ON COLUMN cadix.map_voirie.utilisation IS 'utilisation';
COMMENT ON TABLE cadix.prof_role IS 'prof role';
COMMENT ON COLUMN cadix.prof_role.name IS 'name';
COMMENT ON COLUMN cadix.prof_role.description IS 'description';
COMMENT ON TABLE cadix.prof_role_table IS 'prof role table';
COMMENT ON COLUMN cadix.prof_role_table.prof_role__name IS 'prof role__name';
COMMENT ON COLUMN cadix.prof_role_table.tablename IS 'tablename';
COMMENT ON COLUMN cadix.prof_role_table.property IS 'property';
COMMENT ON COLUMN cadix.prof_role_table.value IS 'value';
COMMENT ON TABLE cadix.prof_user IS 'prof user';
COMMENT ON COLUMN cadix.prof_user.id_user IS 'id user';
COMMENT ON COLUMN cadix.prof_user.prof_role__name IS 'prof role__name';
COMMENT ON COLUMN cadix.prof_user.login IS 'login';
COMMENT ON COLUMN cadix.prof_user.pass IS 'pass';
COMMENT ON COLUMN cadix.prof_user.nom IS 'nom';
COMMENT ON COLUMN cadix.prof_user.prenom IS 'prenom';
COMMENT ON COLUMN cadix.prof_user.email IS 'email';
COMMENT ON TABLE cadix.prp_client IS 'prp client';
COMMENT ON COLUMN cadix.prp_client.city IS 'city';
COMMENT ON COLUMN cadix.prp_client.adress IS 'adress';
COMMENT ON COLUMN cadix.prp_client.zipcode IS 'zipcode';
COMMENT ON COLUMN cadix.prp_client.email IS 'email';
COMMENT ON COLUMN cadix.prp_client.website IS 'website';
COMMENT ON COLUMN cadix.prp_client.logo IS 'logo';
COMMENT ON TABLE cadix.prp_general IS 'prp general';
COMMENT ON COLUMN cadix.prp_general.name IS 'name';
COMMENT ON COLUMN cadix.prp_general.value IS 'value';
COMMENT ON TABLE cadix.prp_group IS 'prp group';
COMMENT ON COLUMN cadix.prp_group.tb_group__id_group IS 'tb group__id group';
COMMENT ON COLUMN cadix.prp_group.prof_user__id_user IS 'prof user__id user';
COMMENT ON COLUMN cadix.prp_group.name IS 'name';
COMMENT ON COLUMN cadix.prp_group.value IS 'value';
COMMENT ON TABLE cadix.prp_importexport IS 'prp importexport';
COMMENT ON COLUMN cadix.prp_importexport.tablename IS 'tablename';
COMMENT ON COLUMN cadix.prp_importexport.columnshape IS 'columnshape';
COMMENT ON COLUMN cadix.prp_importexport.columnbase IS 'columnbase';
COMMENT ON TABLE cadix.prp_map IS 'prp map';
COMMENT ON COLUMN cadix.prp_map.tb_map__id_map IS 'tb map__id map';
COMMENT ON COLUMN cadix.prp_map.prof_user__id_user IS 'prof user__id user';
COMMENT ON COLUMN cadix.prp_map.property IS 'property';
COMMENT ON COLUMN cadix.prp_map.columnname IS 'columnname';
COMMENT ON COLUMN cadix.prp_map.value IS 'value';
COMMENT ON TABLE cadix.prp_system IS 'prp system';
COMMENT ON COLUMN cadix.prp_system.code_table IS 'code table';
COMMENT ON COLUMN cadix.prp_system.code_colonne IS 'code colonne';
COMMENT ON COLUMN cadix.prp_system.code_prp IS 'code prp';
COMMENT ON COLUMN cadix.prp_system.val_prp IS 'val prp';
COMMENT ON TABLE cadix.sis_param IS 'sis param';
COMMENT ON COLUMN cadix.sis_param.id_paramsis IS 'id paramsis';
COMMENT ON COLUMN cadix.sis_param.nommodel IS 'nommodel';
COMMENT ON COLUMN cadix.sis_param.libelle IS 'libelle';
COMMENT ON COLUMN cadix.sis_param.ordre IS 'ordre';
COMMENT ON COLUMN cadix.sis_param.tablename IS 'tablename';
COMMENT ON COLUMN cadix.sis_param.columnname IS 'columnname';
COMMENT ON COLUMN cadix.sis_param.typetrace IS 'typetrace';
COMMENT ON COLUMN cadix.sis_param.hauteurzone IS 'hauteurzone';
COMMENT ON COLUMN cadix.sis_param.filtre IS 'filtre';
COMMENT ON COLUMN cadix.sis_param.filtresub IS 'filtresub';
COMMENT ON TABLE cadix.sis_valeur IS 'sis valeur';
COMMENT ON COLUMN cadix.sis_valeur.id_valeur IS 'id valeur';
COMMENT ON COLUMN cadix.sis_valeur.sis_param__id_paramsis IS 'sis param__id paramsis';
COMMENT ON COLUMN cadix.sis_valeur.requete IS 'requete';
COMMENT ON COLUMN cadix.sis_valeur.libelle IS 'libelle';
COMMENT ON COLUMN cadix.sis_valeur.couleur IS 'couleur';
COMMENT ON COLUMN cadix.sis_valeur.hasborder IS 'hasborder';
COMMENT ON COLUMN cadix.sis_valeur.taille IS 'taille';
COMMENT ON COLUMN cadix.sis_valeur.symbtype IS 'symbtype';
COMMENT ON COLUMN cadix.sis_valeur.font_name IS 'font name';
COMMENT ON COLUMN cadix.sis_valeur.font_char IS 'font char';
COMMENT ON COLUMN cadix.sis_valeur.opacity IS 'opacity';
COMMENT ON TABLE cadix.tb_doc IS 'tb doc';
COMMENT ON COLUMN cadix.tb_doc.id_doc IS 'id doc';
COMMENT ON COLUMN cadix.tb_doc.title IS 'title';
COMMENT ON COLUMN cadix.tb_doc.pathdoc IS 'pathdoc';
COMMENT ON COLUMN cadix.tb_doc.isdefault IS 'isdefault';
COMMENT ON COLUMN cadix.tb_doc.layername IS 'layername';
COMMENT ON COLUMN cadix.tb_doc.numroute IS 'numroute';
COMMENT ON COLUMN cadix.tb_doc.numtroncon IS 'numtroncon';
COMMENT ON COLUMN cadix.tb_doc.coord_x IS 'coord_x';
COMMENT ON COLUMN cadix.tb_doc.coord_y IS 'coord_y';
COMMENT ON COLUMN cadix.tb_doc.dateheure IS 'dateheure';
COMMENT ON TABLE cadix.tb_group IS 'tb group';
COMMENT ON COLUMN cadix.tb_group.id_group IS 'id group';
COMMENT ON COLUMN cadix.tb_group.groupe IS 'groupe';
COMMENT ON COLUMN cadix.tb_group.libelle IS 'libelle';
COMMENT ON COLUMN cadix.tb_group.ordre IS 'ordre';
COMMENT ON TABLE cadix.tb_label IS 'tb label';
COMMENT ON COLUMN cadix.tb_label.tb_map__id_map IS 'tb map__id map';
COMMENT ON COLUMN cadix.tb_label.columnname IS 'columnname';
COMMENT ON COLUMN cadix.tb_label.textfont IS 'textfont';
COMMENT ON COLUMN cadix.tb_label.textcolor IS 'textcolor';
COMMENT ON COLUMN cadix.tb_label.textsize IS 'textsize';
COMMENT ON COLUMN cadix.tb_label.backgroundcolor IS 'backgroundcolor';
COMMENT ON COLUMN cadix.tb_label.bordercolor IS 'bordercolor';
COMMENT ON COLUMN cadix.tb_label.labelposition IS 'labelposition';
COMMENT ON TABLE cadix.tb_map IS 'tb map';
COMMENT ON COLUMN cadix.tb_map.id_map IS 'id map';
COMMENT ON COLUMN cadix.tb_map.tb_style__id_style IS 'tb style__id style';
COMMENT ON COLUMN cadix.tb_map.tb_group__id_group IS 'tb group__id group';
COMMENT ON COLUMN cadix.tb_map.map IS 'map';
COMMENT ON COLUMN cadix.tb_map.libelle IS 'libelle';
COMMENT ON COLUMN cadix.tb_map.ordre_group IS 'ordre group';
COMMENT ON COLUMN cadix.tb_map.ordre_map IS 'ordre map';
COMMENT ON COLUMN cadix.tb_map.typemap IS 'typemap';
COMMENT ON COLUMN cadix.tb_map.path IS 'path';
COMMENT ON COLUMN cadix.tb_map.iszoomthreshold IS 'iszoomthreshold';
COMMENT ON COLUMN cadix.tb_map.zoomthresholdmin IS 'zoomthresholdmin';
COMMENT ON COLUMN cadix.tb_map.zoomthresholdmax IS 'zoomthresholdmax';
COMMENT ON TABLE cadix.tb_postit IS 'tb postit';
COMMENT ON COLUMN cadix.tb_postit.id_postit IS 'id postit';
COMMENT ON COLUMN cadix.tb_postit.prof_user__id_user IS 'prof user__id user';
COMMENT ON COLUMN cadix.tb_postit.layername IS 'layername';
COMMENT ON COLUMN cadix.tb_postit.texte IS 'texte';
COMMENT ON COLUMN cadix.tb_postit.pos_x IS 'pos_x';
COMMENT ON COLUMN cadix.tb_postit.pos_y IS 'pos_y';
COMMENT ON COLUMN cadix.tb_postit.largeur IS 'largeur';
COMMENT ON COLUMN cadix.tb_postit.hauteur IS 'hauteur';
COMMENT ON COLUMN cadix.tb_postit.couleur IS 'couleur';
COMMENT ON COLUMN cadix.tb_postit.dateheure IS 'dateheure';
COMMENT ON COLUMN cadix.tb_postit.coord_x IS 'coord_x';
COMMENT ON COLUMN cadix.tb_postit.coord_y IS 'coord_y';
COMMENT ON COLUMN cadix.tb_postit.numroute IS 'numroute';
COMMENT ON COLUMN cadix.tb_postit.numtroncon IS 'numtroncon';
COMMENT ON TABLE cadix.tb_style IS 'tb style';
COMMENT ON COLUMN cadix.tb_style.id_style IS 'id style';
COMMENT ON COLUMN cadix.tb_style.libelle IS 'libelle';
COMMENT ON COLUMN cadix.tb_style.color1 IS 'color1';
COMMENT ON COLUMN cadix.tb_style.color2 IS 'color2';
COMMENT ON COLUMN cadix.tb_style.color_selected1 IS 'color selected1';
COMMENT ON COLUMN cadix.tb_style.color_selected2 IS 'color selected2';
COMMENT ON COLUMN cadix.tb_style.color_border IS 'color border';
COMMENT ON COLUMN cadix.tb_style.color_border_selected IS 'color border selected';
COMMENT ON COLUMN cadix.tb_style.size_normal IS 'size normal';
COMMENT ON COLUMN cadix.tb_style.size_selected IS 'size selected';
COMMENT ON COLUMN cadix.tb_style.size_border IS 'size border';
COMMENT ON COLUMN cadix.tb_style.type_style IS 'type style';
COMMENT ON COLUMN cadix.tb_style.type_symbole IS 'type symbole';
COMMENT ON COLUMN cadix.tb_style.type_line IS 'type line';
COMMENT ON COLUMN cadix.tb_style.type_polygone IS 'type polygone';
COMMENT ON TABLE cadix.voirie_tab IS 'voirie tab';
COMMENT ON COLUMN cadix.voirie_tab.tab IS 'tab';
COMMENT ON COLUMN cadix.voirie_tab.libelle IS 'libelle';
COMMENT ON COLUMN cadix.voirie_tab.ordre IS 'ordre';
COMMENT ON TABLE cadix.voirie_tabcolumns IS 'voirie tabcolumns';
COMMENT ON COLUMN cadix.voirie_tabcolumns.voirie_tab__tab IS 'voirie tab__tab';
COMMENT ON COLUMN cadix.voirie_tabcolumns.prof_user__id_user IS 'prof user__id user';
COMMENT ON COLUMN cadix.voirie_tabcolumns.columnname IS 'columnname';
COMMENT ON COLUMN cadix.voirie_tabcolumns.position IS 'position';
COMMENT ON COLUMN cadix.voirie_tabcolumns.taille IS 'taille';
