Postgresql;
use guidemarket;

--Extension
create Extension if not EXISTS pgcrypto;

--Tables

create table admin(
	id serial primary key unique,
	email VARCHAR(255) not null unique,
	mdp VARCHAR(255) not null,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp default CURRENT_TIMESTAMP
);

insert into admin values(default, 'tanmelo81@gmail.com', crypt('admin',gen_salt('bf',10)), default, default);

drop table IF EXISTS clients CASCADE;
create table clients(
	id serial primary key unique,
	image VARCHAR(250),
	nom VARCHAR(100) not null,
	prenom VARCHAR(250) not null,
	nomUtilisateur VARCHAR(250) not null unique,
	sexe VARCHAR(2),
	email VARCHAR(250) not null unique,
	tel VARCHAR(100),
	adresse VARCHAR(250),
	email_verification boolean not null default false,
	role VARCHAR(50) not null default 'user',
	is_activated int default 1,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp default CURRENT_TIMESTAMP
);

INSERT into clients values(default,'https://tipastipas-aws-s3.s3.eu-north-1.amazonaws.com/clients/image/2da1a9e1175d6d1aacdac3c8f0e3bbf7276e554293c50e761cecd15495b561fa.jpg',
	'nom1','prenom1','utilisateur1','M','email@mail.com','032xxxxx','45tA',true,default,default,default, default);
INSERT into clients values(default,null,'nom2','prenom2','utilisateur2','F','nom2@mail.com','032xxxxx','45tA',default,default,default, default);

create table tokenpwd(
	id serial primary key unique,
	email VARCHAR(250) not null,
	token VARCHAR(250) not null,
	expire int not null default 24,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp default CURRENT_TIMESTAMP
);

create table password_clients(
	id serial primary key unique,
	id_client int not null unique,
	mdp VARCHAR(250) not null,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp default CURRENT_TIMESTAMP
);


INSERT into password_clients values(default,1,crypt('mdp1',gen_salt('bf',10)),default, default);
-- select * from password_clients where id=1 and crypt('mdp2',mdp)=mdp;

create table contributeurs(
	id serial primary key unique,
	image VARCHAR(250),
	signature VARCHAR(250),
	nom VARCHAR(100) not null,
	prenom VARCHAR(250) not null,
	sexe VARCHAR(2),
	email VARCHAR(250) not null unique,
	tel VARCHAR(100) not null,
	video VARCHAR(250),
	description text not null,
	is_activated int default 1,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp default CURRENT_TIMESTAMP
);

insert into contributeurs values(default, 'https://tipastipas-aws-s3.s3.eu-north-1.amazonaws.com/contributeurs/image/76c65dd13996e473145a6ac10538b275c33046256b11ef4121b7f2075272b9e8.jpg'
	,null,'Jean','Mark','M','jean@gmail.com','032xxxxx',null,'Je suis Jean Paul',default,default,default);
insert into contributeurs values(default, 'https://tipastipas-aws-s3.s3.eu-north-1.amazonaws.com/contributeurs/image/be1eec9bfeb1d1f310bf70e2294746f0c606cac3393b5807d8d0f0a84c1faadf.jpg'
	,null,'Mod','Bell','F','mod@gmail.com','032xxxxx',null,'Je suis Mod Bell',default,default,default);

create table categorie_guides(
	id serial primary key unique,
	nom VARCHAR(100) not null unique,
	is_activated int default 1,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp default CURRENT_TIMESTAMP
);

insert into categorie_guides values(default, 'Développement personnelle',1, default, default);
insert into categorie_guides values(default, 'Bonheur et santé',1, default, default);
insert into categorie_guides values(default, 'Développement professionnelle',1, default, default);
insert into categorie_guides values(default, 'Relation et communication aux autres',1, default, default);

create table sous_categorie_guides(
	id serial primary key unique,
	nom VARCHAR(100) not null unique,
	is_activated int default 1,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp default CURRENT_TIMESTAMP
);

insert into sous_categorie_guides values(default, 'Travail sur soi',1, default, default);
insert into sous_categorie_guides values(default, 'Productivité',1, default, default);
insert into sous_categorie_guides values(default, 'Relationnel',1, default, default);
insert into sous_categorie_guides values(default, 'Psychologie',1, default, default);
insert into sous_categorie_guides values(default, 'Communication',1, default, default);
insert into sous_categorie_guides values(default, 'Santé',1, default, default);
insert into sous_categorie_guides values(default, 'Nutrition',1, default, default);
insert into sous_categorie_guides values(default, 'Bonheur',1, default, default);
insert into sous_categorie_guides values(default, 'Méditation',1, default, default);
insert into sous_categorie_guides values(default, 'Management et leadership',1, default, default);
insert into sous_categorie_guides values(default, 'Entreprenariat',1, default, default);
insert into sous_categorie_guides values(default, 'Marketing',1, default, default);
insert into sous_categorie_guides values(default, 'Commerce et ventes',1, default, default);
insert into sous_categorie_guides values(default, 'Parentalité / Famille',1, default, default);

create table guides(
	id serial primary key unique,
	image VARCHAR(255),
	id_categorie int not null,
	id_sous_categorie int not null,
	nom VARCHAR(100) not null,
	is_activated int default 1,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp default CURRENT_TIMESTAMP
);

insert into guides values(default, 'https://tipastipas-aws-s3.s3.eu-north-1.amazonaws.com/contributeurs/image/a78905876c614d9a2dd7d007b4d2d67245a42b451b419caea9c303ac8ff52319.jpg'
	, 1, 1, 'Développement de soi', default, default, default);
insert into guides values(default, 'https://tipastipas-aws-s3.s3.eu-north-1.amazonaws.com/contributeurs/image/45ad7940ad0c3f7aa05fc2786a39c80c65831ad26594b29e8461115866b9e012.jpg'
	, 1, 2, 'Développement de ta productivité', default, default, default);

create table contributeurs_guides(
	id serial primary key unique,
	id_guide int not null,
	id_contributeur int not null,
	nom VARCHAR(200) not null,
	prix double precision not null,
	image VARCHAR(200),
	pdf VARCHAR(250) not null,
	audio VARCHAR(250),
	video VARCHAR(250),
	presentation text,
	description text,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp default CURRENT_TIMESTAMP
);

insert into contributeurs_guides values(default, 1, 1, 'Ma formation en ligne', 1000, 
	'https://tipastipas-aws-s3.s3.eu-north-1.amazonaws.com/formations/image/6277c8107aee15c1bc9019570bd4ad145fd421373581c4f9846dab53b9aa8e41.jpg', 
	'https://tipastipas-aws-s3.s3.eu-north-1.amazonaws.com/formations/pdf/97a06a5f0e4e611a45fc60d529325a95c1598750df578e4c18c3f389b61fa870.pdf', 
	'https://tipastipas-aws-s3.s3.eu-north-1.amazonaws.com/formations/audio/4087e583c53ccf23a31baeb33e5a644159f9db9b83802b0e9d1769b9683285f6.mp3',
 	'https://www.youtube.com/watch?v=wf3XPionPXE',
 	'<p>presentation</p>', '<p>Cette formation est...</p>', default, default);

create table page_medias(
	id serial primary key unique,
	id_contributeurs_guides int not null,
	audio VARCHAR(250),
	video VARCHAR(250),
	page int not null,
	is_activated int default 1,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp default CURRENT_TIMESTAMP
);

insert into page_medias values(default, 1, 'https://tipastipas-aws-s3.s3.eu-north-1.amazonaws.com/formations/audio/4087e583c53ccf23a31baeb33e5a644159f9db9b83802b0e9d1769b9683285f6.mp3',
'https://www.youtube.com/watch?v=wf3XPionPXE', 1, default, default, default);
insert into page_medias values(default, 1, 'https://tipastipas-aws-s3.s3.eu-north-1.amazonaws.com/formations/audio/a78b94f5b102bc36938df8c1baddc251f5d52a36cacc41f1a2584b335e5df587.mp3',
null, 3, default, default, default);
insert into page_medias values(default, 1, 'https://tipastipas-aws-s3.s3.eu-north-1.amazonaws.com/formations/audio/4f806ff54239e0bb976d840a30f28afa7070d9c5e1a2685d2a98bccd3187bf34.mp3',
'https://www.youtube.com/watch?v=wf3XPionPXE', 7, default, default, default);

create table type_exercices(
	id serial primary key unique,
	type VARCHAR(100) not null unique,
	is_activated int default 1,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp default CURRENT_TIMESTAMP
);

insert into type_exercices values(default, 'word', default, default, default);

create table exercice_guides(
	id serial primary key unique,
	id_contributeurs_guides int not null,
	id_type int not null,
	page_begin int not null,
	question text not null,
	is_activated int default 1,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp default CURRENT_TIMESTAMP
);

insert into exercice_guides values(default, 1, 1, 3, '<p>Why?</p><p><br></p><p><br></p><p><br></p><p>How?</p><p><br></p><p><br></p><p>What?</p>', default, default, default);
	
create table exercice_responses(
	id serial primary key unique,
	id_exercice_guides int not null,
	id_client int,
	response text,
	response_html text,
	is_activated int default 1,
	created_at timestamp default CURRENT_TIMESTAMP,	
	updated_at timestamp default CURRENT_TIMESTAMP
);

insert into exercice_responses values(default, 1, 1, null, default, default, default);

create table type_somaires(
	id serial primary key,
	type VARCHAR(100) not null unique,
	is_activated int default 1,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp default CURRENT_TIMESTAMP
);

insert into type_somaires values(default, 'chapitre', default, default, default);
insert into type_somaires values(default, 'module', default, default, default);
insert into type_somaires values(default, 'exercice', default, default, default);

create table somaire_guides(
	id serial primary key unique,
	id_contributeurs_guides int not null,
	id_type int not null,
	somaire VARCHAR(250) not null,
	page_begin int not null,
	page_end int not null,
	is_activated int default 1,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp default CURRENT_TIMESTAMP
);

insert into somaire_guides values(default, 1, 1, 'Debut', 1, 2, default, default, default);
insert into somaire_guides values(default, 1, 2, 'Debut module 1', 1, 1, default, default, default);
insert into somaire_guides values(default, 1, 2, 'Debut module 2', 2, 2, default, default, default);
insert into somaire_guides values(default, 1, 3, 'Exercice 1', 3, 3, default, default, default);
insert into somaire_guides values(default, 1, 1, 'Fin', 4, 7, default, default, default);
insert into somaire_guides values(default, 1, 2, 'Fin module 1', 4, 5, default, default, default);
insert into somaire_guides values(default, 1, 2, 'Fin module 2', 6, 7, default, default, default);

create table avancement_guides(
	id serial primary key unique,
	id_client int not null,
	id_contributeurs_guides int not null,
	page int not null,
	maxPage int,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp default CURRENT_TIMESTAMP
);

-- update avancement_guides set id_client=1, id_contributeurs_guides=1, page=2, created_at='2024-03-13 06:49:12.523414', 
--             updated_at='2024-03-13 06:49:12.523414' where id_client=1 and id_contributeurs_guides=1

create table clients_contributeurs_guides(
	id serial primary key unique,
	id_client int not null,
	id_contributeurs_guides int not null,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp default CURRENT_TIMESTAMP
);

insert into clients_contributeurs_guides values(default, 1, 1, default, default);

create table payment_history(
	id serial primary key unique,
	id_client int,
	id_contributeurs_guides int,
	prix double precision not null,
	payments_intent_id VARCHAR(250) not null,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp default CURRENT_TIMESTAMP
);

--VIEWS

-- create view v_clients_mdp as
-- 	select * from clients join clients_mdp on clients.id = clients_mdp.id_client;

-- create view v_contributeurs_somaires_guide as
-- 	select * from contributeurs_guides 
-- 		join contributeurs on contributeurs_guides.id_contributeur = contributeurs.id
-- 		join somaire on contributeurs_guides.id = somaire.id_contributeurs_guides

-- create view v_clients_guides as
-- 	select contributeurs_guides.*, contributeurs.nom as c_nom, contributeurs.prenom as c_prenom from clients_contributeurs_guides
-- 		join contributeurs_guides on clients_contributeurs_guides.id_contributeurs_guides = contributeurs_guides.id
-- 		join contributeurs on contributeurs_guides.id_contributeur = contributeurs.id

create view ExerciceLastDate as
	select id_client, id_exercice_guides, max(created_at) as maxdate
		from exercice_responses 
		group by id_client, id_exercice_guides;

-- select exercice_responses.id_client, exercice_responses.id_exercice_guides, response, question, page_begin, maxdate, contributeurs_guides.nom
-- 	from exercice_responses 
-- 	right join exercice_guides on exercice_guides.id = exercice_responses.id_exercice_guides
-- 	join contributeurs_guides on exercice_guides.id_contributeurs_guides = contributeurs_guides.id
-- 	left join ExerciceLastDate on exercice_responses.id_client=ExerciceLastDate.id_client 
-- 	and exercice_responses.id_exercice_guides=ExerciceLastDate.id_exercice_guides
-- 	and exercice_responses.created_at = maxdate
-- 	where (exercice_responses.id_client=1 or exercice_responses.id_client isnull)
-- 	and id_contributeurs_guides=1
-- 	and (exercice_responses.created_at = maxdate or exercice_responses.created_at isnull)
-- 	order by page_begin,exercice_guides.created_at ASC

-- CONSTRAINTS

	-- INDEXES

CREATE INDEX idx_admin_mdp ON admin(mdp);
CREATE INDEX idx_admin_email ON admin(email);

CREATE INDEX idx_clients_nomUtilisateur ON clients(nomUtilisateur);
CREATE INDEX idx_clients_email ON clients(email);

CREATE INDEX idx_password_clients_mdp ON password_clients(mdp);

CREATE INDEX idx_contributeurs_email ON contributeurs(email);
CREATE INDEX idx_contributeurs_is_activated ON contributeurs(is_activated);

CREATE INDEX idx_categorie_guides_is_activated ON categorie_guides(is_activated);

CREATE INDEX idx_sous_categorie_guides_is_activated ON sous_categorie_guides(is_activated);

CREATE INDEX idx_guides_created_at ON guides(created_at);
CREATE INDEX idx_guides_is_activated ON guides(is_activated);

CREATE INDEX idx_exercice_guides_is_activated ON exercice_guides(is_activated);
CREATE INDEX idx_exercice_guides_page_begin ON exercice_guides(page_begin);

CREATE INDEX idx_type_somaires_type ON type_somaires(type);

CREATE INDEX idx_somaire_guides_is_activated ON somaire_guides(is_activated);
CREATE INDEX idx_somaire_guides_page_begin ON somaire_guides(page_begin);
CREATE INDEX idx_somaire_guides_page_end ON somaire_guides(page_end);

CREATE INDEX idx_payment_history_prix ON payment_history(prix);

CREATE INDEX idx_page_medias_page ON page_medias(page);
CREATE INDEX idx_page_medias_is_activated ON page_medias(is_activated);

	-- FOREIGN KEY


ALTER TABLE password_clients
ADD CONSTRAINT fk_password_clients_id_client
FOREIGN KEY (id_client) REFERENCES clients(id)
ON DELETE CASCADE;

ALTER TABLE guides
ADD CONSTRAINT fk_guides_id_categorie
FOREIGN KEY (id_categorie) REFERENCES categorie_guides(id)
ON DELETE SET NULL;

ALTER TABLE guides
ADD CONSTRAINT fk_guides_id_sous_categorie
FOREIGN KEY (id_sous_categorie) REFERENCES sous_categorie_guides(id)
ON DELETE SET NULL;

ALTER TABLE contributeurs_guides
ADD CONSTRAINT fk_guides_id_guide
FOREIGN KEY (id_guide) REFERENCES guides(id)
ON DELETE SET NULL;

ALTER TABLE contributeurs_guides
ADD CONSTRAINT fk_guides_id_contributeur
FOREIGN KEY (id_contributeur) REFERENCES contributeurs(id)
ON DELETE SET NULL;

ALTER TABLE exercice_guides
ADD CONSTRAINT fk_exercice_guides_id_contributeurs_guides
FOREIGN KEY (id_contributeurs_guides) REFERENCES contributeurs_guides(id)
ON DELETE CASCADE;

ALTER TABLE exercice_guides
ADD CONSTRAINT fk_exercice_guides_id_type
FOREIGN KEY (id_type) REFERENCES type_exercices(id)
ON DELETE SET NULL;

ALTER TABLE exercice_responses
ADD CONSTRAINT fk_exercice_responses_id_exercice_guides
FOREIGN KEY (id_exercice_guides) REFERENCES exercice_guides(id)
ON DELETE CASCADE;

ALTER TABLE exercice_responses
ADD CONSTRAINT fk_exercice_responses_id_client
FOREIGN KEY (id_client) REFERENCES clients(id)
ON DELETE CASCADE;

ALTER TABLE somaire_guides
ADD CONSTRAINT fk_somaire_guides_id_contributeurs_guides
FOREIGN KEY (id_contributeurs_guides) REFERENCES contributeurs_guides(id)
ON DELETE CASCADE;

ALTER TABLE somaire_guides
ADD CONSTRAINT fk_somaire_guides_id_type
FOREIGN KEY (id_type) REFERENCES type_somaires(id)
ON DELETE SET NULL;

ALTER TABLE avancement_guides
ADD CONSTRAINT fk_avancement_guides_id_client
FOREIGN KEY (id_client) REFERENCES clients(id)
ON DELETE CASCADE;

ALTER TABLE avancement_guides
ADD CONSTRAINT fk_avancement_guides_id_contributeurs_guides
FOREIGN KEY (id_contributeurs_guides) REFERENCES contributeurs_guides(id)
ON DELETE CASCADE;

ALTER TABLE clients_contributeurs_guides
ADD CONSTRAINT fk_clients_contributeurs_guides_id_client
FOREIGN KEY (id_client) REFERENCES clients(id)
ON DELETE CASCADE;

ALTER TABLE clients_contributeurs_guides
ADD CONSTRAINT fk_clients_contributeurs_guides_id_contributeurs_guides
FOREIGN KEY (id_contributeurs_guides) REFERENCES contributeurs_guides(id)
ON DELETE CASCADE;

ALTER TABLE payment_history
ADD CONSTRAINT fk_payment_history_id_client
FOREIGN KEY (id_client) REFERENCES clients(id)
ON DELETE SET NULL;

ALTER TABLE payment_history
ADD CONSTRAINT fk_payment_history_id_contributeurs_guides
FOREIGN KEY (id_contributeurs_guides) REFERENCES contributeurs_guides(id)
ON DELETE SET NULL;

ALTER TABLE page_medias
ADD CONSTRAINT fk_page_medias_id_contributeurs_guides
FOREIGN KEY (id_contributeurs_guides) REFERENCES contributeurs_guides(id)
ON DELETE CASCADE;

	-- alter drop null

ALTER TABLE guides
ALTER COLUMN id_categorie DROP NOT NULL;

ALTER TABLE guides
ALTER COLUMN id_sous_categorie DROP NOT NULL;

ALTER TABLE contributeurs_guides
ALTER COLUMN id_guide DROP NOT NULL;

ALTER TABLE contributeurs_guides
ALTER COLUMN id_contributeur DROP NOT NULL;

ALTER TABLE exercice_guides
ALTER COLUMN id_type DROP NOT NULL;

ALTER TABLE somaire_guides
ALTER COLUMN id_type DROP NOT NULL;

	-- Alter add column

ALTER TABLE contributeurs_guides
ADD COLUMN intro text;

ALTER TABLE clients_contributeurs_guides
ADD COLUMN archived boolean not null default false;