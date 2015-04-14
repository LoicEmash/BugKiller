
INSERT INTO bk.bk_client (nom) VALUES
('ADM'),
('AERA'),
('alj'),
('APRR'),
('ASF'),
('ASP'),
('ASP Maisons-Laffitte'),
('CG Gard'),
('EEA'),
('EGIS'),
('EGIS 71'),
('Egis International'),
('emash'),
('EMASH_ASK'),
('ERO'),
('Metz'),
('sylvain_test'),
('TEST'),
('Treillières');
insert into bk.bk_user (mail,name,password,bk_client__id) values ('loic.lecuyer@egis.fr','Loïc Lecuyer','70e92d4fbe843ce266bc6f1f2d643526',null);
insert into bk.bk_user (mail,name,password,bk_client__id) values ('Administrateur@adm.co.ma','Administrateur Administrateur','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('aitsiahmed.anas@adm.co.ma','Anas Ait Si Ahmad','b58580ccdcb180a625e247c1e938d1db',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('alimam.karim@adm.co.ma','alimam karim','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('alj.mohammed@adm.co.ma','ALJ Mohammed','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('aniss.aziz@adm.co.ma','aniss aziz','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('benjrad.othmane@adm.co.ma','benjrad othmane','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('benrebea.hamid@adm.co.ma','benrebea hamid','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('chafii.mohamed@adm.CO.MA','Chafii Mohamed','e10adc3949ba59abbe56e057f20f883e',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('daimin.abdelkrim@adm.co.ma','daimin abdelkrim','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('debbarh.abdeslam@adm.co.ma','debbarh abdeslam','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('drief.hicham@adm.co.ma','DRIEF Hicham','547bbfb2dbd3b6ceb5de80c5181ccd02',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('elachhab.aziz@adm.co.ma','elachhab aziz','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('elansari.ismail@adm.co.ma','EL ANSARI ISMAIL','0102c86aa99b68708baf20cb2c37565c',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('elmouden.oussama@adm.co.ma','elmouden oussama','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('eloualidi.aziz@adm.co.ma','eloualidi aziz','881d3321d940052eca640e42a9dcde9c',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('gourgue.noureddine@adm.co.ma','gourgue noureddine','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('ksabi.brahim@adm.co.ma','ksabi brahim','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('laghrida.sofiane@adm.co.ma','laghrida Sofiane Nabil','2b047e7e9cfa0d7fa58de09193e327d9',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('louridi.mohamed@adm.co.ma','louridi mohamed','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('mellouki.kamal@adm.co.ma','MELLOUKI  Kamal kamal','8e114e402aa7bbf2571448ee7d551120',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('mequedade.nabil@adm.co.ma','mequedade nabil','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('mouhoub.noureddine@adm.co.ma','mouhoub noureddine','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('naoura.saber@adm.co.ma','naoura saber','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('rmili.mahammed@adm.co.ma','rmili mahammed','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('salmi.slimane@adm.co.ma','salmi slimane','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('sarhane.samir@adm.co.ma','sarhane samir','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('souissi.haitam@adm.co.ma','SOUISSI HAITAM','a54cc3ecb0ceecfecd9d2dc564003ee4',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('zahaf.toufik@adm.co.ma','zahaf toufik','6fb4f22992a0d164b77267fde5477248',(select id from bk.bk_client where nom='ADM'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('Absamad.ELABD@aprr.fr','ELABD Absamad','f164e13ae6c248d205746e16b116a65a',(select id from bk.bk_client where nom='APRR'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('jeanphilippe.marion@aprr.fr','MARION Jean-Philippe','5d9361aed5474398dcb77eee8cc96eb1',(select id from bk.bk_client where nom='APRR'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('joseangel.pachecohernandez@aprr.fr','Pacheco josÃ©','202cb962ac59075b964b07152d234b70',(select id from bk.bk_client where nom='APRR'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('Thierry.meunier@aprr.fr','MEUNIER Thierry','7336f053a3f42e36519d7eb76b8551ce',(select id from bk.bk_client where nom='APRR'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('jeanluc.riva@parcmaisonslaffitte.org','RIVA Jean-Luc','df94939489c288a7822f8b201894e895',(select id from bk.bk_client where nom='ASP'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('fabien.vermogen@gard.fr','vermogen fabien','832f9614d893436cd7770b58310173cd',(select id from bk.bk_client where nom='CG gard'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('gilles.haudiquet@egis-exploitation-aquitaine.fr','Haudiquet Gilles','f26b21ddd01dcebf07818638a612fba1',(select id from bk.bk_client where nom='EEA'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('patricia.maillard-nunes@egis.fr','Maillard-Nunes Patricia','3660188d380995cac91b633fb57bdf39',(select id from bk.bk_client where nom='EEA'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('Celine.GESIPPE@egis.fr','GESIPPE Celine','6e9cf3eef65da697796cf33f27eb0f57',(select id from bk.bk_client where nom='EGIS'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('elise.hennebelle@egis.fr','HENNEBELLE Elise','28c494da87ff99969927ac34ba30adbe',(select id from bk.bk_client where nom='EGIS'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('Pascal.COULON@egis.fr','COULON Pascal','3660188d380995cac91b633fb57bdf39',(select id from bk.bk_client where nom='EGIS'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('Philippe.PETY@egis.fr','PETY Philippe','3660188d380995cac91b633fb57bdf39',(select id from bk.bk_client where nom='EGIS'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('boulicault.mfrance@orange.fr','BOULICAULT Marie','c3acad111541ce6a8c9445e5b9d9d4e1',(select id from bk.bk_client where nom='EGIS 71'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('delyha@gmail.com','Aurel Aurel','fbe6f4ed0bcfd90a93f132ef11973dae',(select id from bk.bk_client where nom='EMASH_ASK'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('Camille.GASPERI@egis.fr','GASPERI Camille','f26b21ddd01dcebf07818638a612fba1',(select id from bk.bk_client where nom='ERO'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('Gaelle.LE-BARS@egis.fr','Gaelle Le Bars','3660188d380995cac91b633fb57bdf39',(select id from bk.bk_client where nom='ERO'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('adoyen@metzmetropole.fr','DOYEN Alexia','b944ef604d8567d96a2a70804c625fa6',(select id from bk.bk_client where nom='Metz'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('alevy@mairie-metz.fr','LEVY Anouk','b944ef604d8567d96a2a70804c625fa6',(select id from bk.bk_client where nom='Metz'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('bweber@mairie-metz.fr','WEBER Bernard','b944ef604d8567d96a2a70804c625fa6',(select id from bk.bk_client where nom='Metz'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('cmuller@mairie-metz.fr','MULLER Claude','b944ef604d8567d96a2a70804c625fa6',(select id from bk.bk_client where nom='Metz'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('dmasiero@mairie-metz.fr','MASIERO Dominique','b944ef604d8567d96a2a70804c625fa6',(select id from bk.bk_client where nom='Metz'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('edelaite@metzmetropole.fr','DELAITE Eric','a0286259168282d393c114d826559d96',(select id from bk.bk_client where nom='Metz'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('jbagnariol@mairie-metz.fr','BAGNARIOL JÃ©rÃ´me','b944ef604d8567d96a2a70804c625fa6',(select id from bk.bk_client where nom='Metz'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('lbernard@mairie-metz.fr','BERNARD LoÃ¯c','b944ef604d8567d96a2a70804c625fa6',(select id from bk.bk_client where nom='Metz'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('lvictorion@mairie-metz.fr','VICTORION Laurent','b944ef604d8567d96a2a70804c625fa6',(select id from bk.bk_client where nom='Metz'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('mbrangbour@metzmetropole.fr','BRANGBOUR MichaÃ«l','b944ef604d8567d96a2a70804c625fa6',(select id from bk.bk_client where nom='Metz'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('pgodart@mairie-metz.fr','GODART Pierre','b944ef604d8567d96a2a70804c625fa6',(select id from bk.bk_client where nom='Metz'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('scolardelle@mairie-metz.fr','COLARDELLE Samuel','b944ef604d8567d96a2a70804c625fa6',(select id from bk.bk_client where nom='Metz'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('sforthoffer@mairie-Metz.fr','FORTHOFFER StÃ©phane','a0286259168282d393c114d826559d96',(select id from bk.bk_client where nom='Metz'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('srothe@mairie-metz.fr','ROTHE Serge','b944ef604d8567d96a2a70804c625fa6',(select id from bk.bk_client where nom='Metz'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('xetienne@mairie-metz.fr','ETIENNE Xavier','b944ef604d8567d96a2a70804c625fa6',(select id from bk.bk_client where nom='Metz'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('arnaud.sobreville@treillieres.fr','Arnaud Sobreville','6521867f37daced2a8ba3b973450bf6a',(select id from bk.bk_client where nom='TreilliÃ¨res'));
insert into bk.bk_user (mail,name,password,bk_client__id) values ('sarah.perraud@treillieres.fr','Sarah Perraud','6521867f37daced2a8ba3b973450bf6a',(select id from bk.bk_client where nom='TreilliÃ¨res'));
