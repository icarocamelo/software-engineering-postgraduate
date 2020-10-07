SET DB_CLOSE_DELAY -1;        
;             
CREATE USER IF NOT EXISTS "SAUDEPLUPLUS" SALT '4b53b6f17ed71af8' HASH '9beacf1c5e44fbdd15b20d24f228b0c1ea542f8f15e6f13ab113baaaf0081a07' ADMIN;               
CREATE SEQUENCE "PUBLIC"."SEQUENCE_GENERATOR" START WITH 1050 INCREMENT BY 50;
CREATE MEMORY TABLE "PUBLIC"."DATABASECHANGELOGLOCK"(
    "ID" INT NOT NULL,
    "LOCKED" BOOLEAN NOT NULL,
    "LOCKGRANTED" TIMESTAMP,
    "LOCKEDBY" VARCHAR(255)
);  
ALTER TABLE "PUBLIC"."DATABASECHANGELOGLOCK" ADD CONSTRAINT "PUBLIC"."PK_DATABASECHANGELOGLOCK" PRIMARY KEY("ID");            
-- 1 +/- SELECT COUNT(*) FROM PUBLIC.DATABASECHANGELOGLOCK;   
INSERT INTO "PUBLIC"."DATABASECHANGELOGLOCK" VALUES
(1, FALSE, NULL, NULL);  
CREATE MEMORY TABLE "PUBLIC"."DATABASECHANGELOG"(
    "ID" VARCHAR(255) NOT NULL,
    "AUTHOR" VARCHAR(255) NOT NULL,
    "FILENAME" VARCHAR(255) NOT NULL,
    "DATEEXECUTED" TIMESTAMP NOT NULL,
    "ORDEREXECUTED" INT NOT NULL,
    "EXECTYPE" VARCHAR(10) NOT NULL,
    "MD5SUM" VARCHAR(35),
    "DESCRIPTION" VARCHAR(255),
    "COMMENTS" VARCHAR(255),
    "TAG" VARCHAR(255),
    "LIQUIBASE" VARCHAR(20),
    "CONTEXTS" VARCHAR(255),
    "LABELS" VARCHAR(255),
    "DEPLOYMENT_ID" VARCHAR(10)
);               
-- 90 +/- SELECT COUNT(*) FROM PUBLIC.DATABASECHANGELOG;      
INSERT INTO "PUBLIC"."DATABASECHANGELOG" VALUES
('00000000000000', 'jhipster', 'config/liquibase/changelog/00000000000000_initial_schema.xml', TIMESTAMP '2020-09-29 00:58:28.621328', 1, 'EXECUTED', '8:b8c27d9dc8db18b5de87cdb8c38a416b', 'createSequence sequenceName=sequence_generator', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('00000000000001', 'jhipster', 'config/liquibase/changelog/00000000000000_initial_schema.xml', TIMESTAMP '2020-09-29 00:58:28.698284', 2, 'EXECUTED', '8:6c9e359d3f0ee00da658f53757b8a18f', 'createTable tableName=jhi_user; createTable tableName=jhi_authority; createTable tableName=jhi_user_authority; addPrimaryKey tableName=jhi_user_authority; createTable tableName=jhi_persistent_token; addForeignKeyConstraint baseTableName=jhi_user_a...', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916023755-1', 'jhipster', 'config/liquibase/changelog/20200916023755_added_entity_Paciente.xml', TIMESTAMP '2020-09-29 00:58:28.704281', 3, 'EXECUTED', '8:13de18ec0ec60e0f70147dbc1008e344', 'createTable tableName=paciente', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916023755-1-relations', 'jhipster', 'config/liquibase/changelog/20200916023755_added_entity_Paciente.xml', TIMESTAMP '2020-09-29 00:58:28.70528', 4, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916023755-1-data', 'jhipster', 'config/liquibase/changelog/20200916023755_added_entity_Paciente.xml', TIMESTAMP '2020-09-29 00:58:28.718273', 5, 'EXECUTED', '8:fe2f52fac860c8931e22b68c5b25c008', 'loadData tableName=paciente', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916023855-1', 'jhipster', 'config/liquibase/changelog/20200916023855_added_entity_Endereco.xml', TIMESTAMP '2020-09-29 00:58:28.723268', 6, 'EXECUTED', '8:51e32fe47c57d9b104cadca47ebc1859', 'createTable tableName=endereco', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916023855-1-relations', 'jhipster', 'config/liquibase/changelog/20200916023855_added_entity_Endereco.xml', TIMESTAMP '2020-09-29 00:58:28.725271', 7, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916023855-1-data', 'jhipster', 'config/liquibase/changelog/20200916023855_added_entity_Endereco.xml', TIMESTAMP '2020-09-29 00:58:28.732265', 8, 'EXECUTED', '8:97889548d4afc64d40ca2f449a17519d', 'loadData tableName=endereco', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916023955-1', 'jhipster', 'config/liquibase/changelog/20200916023955_added_entity_Profissional.xml', TIMESTAMP '2020-09-29 00:58:28.73626', 9, 'EXECUTED', '8:59e5d5619c4810f2c8b3169a5a9aefb8', 'createTable tableName=profissional', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916023955-1-relations', 'jhipster', 'config/liquibase/changelog/20200916023955_added_entity_Profissional.xml', TIMESTAMP '2020-09-29 00:58:28.73726', 10, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916023955-1-data', 'jhipster', 'config/liquibase/changelog/20200916023955_added_entity_Profissional.xml', TIMESTAMP '2020-09-29 00:58:28.742259', 11, 'EXECUTED', '8:b093924cb93386e79fdd7601e2d5881c', 'loadData tableName=profissional', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916024055-1', 'jhipster', 'config/liquibase/changelog/20200916024055_added_entity_ProfissionalDeSaude.xml', TIMESTAMP '2020-09-29 00:58:28.745256', 12, 'EXECUTED', '8:0841122ffbc04be2682d7342d24b5190', 'createTable tableName=profissional_de_saude', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024055-1-relations', 'jhipster', 'config/liquibase/changelog/20200916024055_added_entity_ProfissionalDeSaude.xml', TIMESTAMP '2020-09-29 00:58:28.747256', 13, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024055-1-data', 'jhipster', 'config/liquibase/changelog/20200916024055_added_entity_ProfissionalDeSaude.xml', TIMESTAMP '2020-09-29 00:58:28.751258', 14, 'EXECUTED', '8:62b7dbba65ee241a48272836e78f57ba', 'loadData tableName=profissional_de_saude', '', NULL, '3.9.0', 'faker', NULL, '1355508389');        
INSERT INTO "PUBLIC"."DATABASECHANGELOG" VALUES
('20200916024155-1', 'jhipster', 'config/liquibase/changelog/20200916024155_added_entity_Medico.xml', TIMESTAMP '2020-09-29 00:58:28.754253', 15, 'EXECUTED', '8:694043e1583cfb7468fcd185e86e16e8', 'createTable tableName=medico', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024155-1-relations', 'jhipster', 'config/liquibase/changelog/20200916024155_added_entity_Medico.xml', TIMESTAMP '2020-09-29 00:58:28.756253', 16, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024155-1-data', 'jhipster', 'config/liquibase/changelog/20200916024155_added_entity_Medico.xml', TIMESTAMP '2020-09-29 00:58:28.76125', 17, 'EXECUTED', '8:eed31f5121d21b223d695d8a7ff39c2a', 'loadData tableName=medico', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916024255-1', 'jhipster', 'config/liquibase/changelog/20200916024255_added_entity_Fisioterapeuta.xml', TIMESTAMP '2020-09-29 00:58:28.765247', 18, 'EXECUTED', '8:5d03682297bcdf5d3a7933edb856b969', 'createTable tableName=fisioterapeuta', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024255-1-relations', 'jhipster', 'config/liquibase/changelog/20200916024255_added_entity_Fisioterapeuta.xml', TIMESTAMP '2020-09-29 00:58:28.767245', 19, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024255-1-data', 'jhipster', 'config/liquibase/changelog/20200916024255_added_entity_Fisioterapeuta.xml', TIMESTAMP '2020-09-29 00:58:28.773242', 20, 'EXECUTED', '8:e62edbc4c64ff0d9015009d289b7c45c', 'loadData tableName=fisioterapeuta', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916024355-1', 'jhipster', 'config/liquibase/changelog/20200916024355_added_entity_Psicologo.xml', TIMESTAMP '2020-09-29 00:58:28.776242', 21, 'EXECUTED', '8:f7eeb3bf69a239cc6bc8867c618ec121', 'createTable tableName=psicologo', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024355-1-relations', 'jhipster', 'config/liquibase/changelog/20200916024355_added_entity_Psicologo.xml', TIMESTAMP '2020-09-29 00:58:28.779238', 22, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024355-1-data', 'jhipster', 'config/liquibase/changelog/20200916024355_added_entity_Psicologo.xml', TIMESTAMP '2020-09-29 00:58:28.786234', 23, 'EXECUTED', '8:30c4fa97c2f4e7e039da97b240e3d3ba', 'loadData tableName=psicologo', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916024455-1', 'jhipster', 'config/liquibase/changelog/20200916024455_added_entity_Enfermeiro.xml', TIMESTAMP '2020-09-29 00:58:28.790229', 24, 'EXECUTED', '8:8cefca59207c5ac1cd344f4433d3faa6', 'createTable tableName=enfermeiro', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024455-1-relations', 'jhipster', 'config/liquibase/changelog/20200916024455_added_entity_Enfermeiro.xml', TIMESTAMP '2020-09-29 00:58:28.792228', 25, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024455-1-data', 'jhipster', 'config/liquibase/changelog/20200916024455_added_entity_Enfermeiro.xml', TIMESTAMP '2020-09-29 00:58:28.798226', 26, 'EXECUTED', '8:6fd28e9fd9d886436df5ab38b1af6174', 'loadData tableName=enfermeiro', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916024555-1', 'jhipster', 'config/liquibase/changelog/20200916024555_added_entity_Exame.xml', TIMESTAMP '2020-09-29 00:58:28.802224', 27, 'EXECUTED', '8:ea830c4adcffdb6f06c698a0f9447ff0', 'createTable tableName=exame', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024555-1-relations', 'jhipster', 'config/liquibase/changelog/20200916024555_added_entity_Exame.xml', TIMESTAMP '2020-09-29 00:58:28.804225', 28, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024555-1-data', 'jhipster', 'config/liquibase/changelog/20200916024555_added_entity_Exame.xml', TIMESTAMP '2020-09-29 00:58:28.809224', 29, 'EXECUTED', '8:7f5937741d6bc4d9f34e2344be0c1fb3', 'loadData tableName=exame', '', NULL, '3.9.0', 'faker', NULL, '1355508389');     
INSERT INTO "PUBLIC"."DATABASECHANGELOG" VALUES
('20200916024655-1', 'jhipster', 'config/liquibase/changelog/20200916024655_added_entity_Consulta.xml', TIMESTAMP '2020-09-29 00:58:28.81322', 30, 'EXECUTED', '8:81d85d1d8d49b1534d23786b6cffecfc', 'createTable tableName=consulta', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024655-1-relations', 'jhipster', 'config/liquibase/changelog/20200916024655_added_entity_Consulta.xml', TIMESTAMP '2020-09-29 00:58:28.814221', 31, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024655-1-data', 'jhipster', 'config/liquibase/changelog/20200916024655_added_entity_Consulta.xml', TIMESTAMP '2020-09-29 00:58:28.819216', 32, 'EXECUTED', '8:a3a5d65a360b3b66706162a578edecd3', 'loadData tableName=consulta', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916024755-1', 'jhipster', 'config/liquibase/changelog/20200916024755_added_entity_Procedimento.xml', TIMESTAMP '2020-09-29 00:58:28.823212', 33, 'EXECUTED', '8:0275905d0566a1147daa0b90d55dcc35', 'createTable tableName=procedimento', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024755-1-relations', 'jhipster', 'config/liquibase/changelog/20200916024755_added_entity_Procedimento.xml', TIMESTAMP '2020-09-29 00:58:28.824214', 34, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024755-1-data', 'jhipster', 'config/liquibase/changelog/20200916024755_added_entity_Procedimento.xml', TIMESTAMP '2020-09-29 00:58:28.82921', 35, 'EXECUTED', '8:95a650ebfdd0c40652f30e7608a4f38d', 'loadData tableName=procedimento', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916024855-1', 'jhipster', 'config/liquibase/changelog/20200916024855_added_entity_Atendimento.xml', TIMESTAMP '2020-09-29 00:58:28.833207', 36, 'EXECUTED', '8:69edc5d99cd6a478cdd24b19a3910129', 'createTable tableName=atendimento', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024855-1-relations', 'jhipster', 'config/liquibase/changelog/20200916024855_added_entity_Atendimento.xml', TIMESTAMP '2020-09-29 00:58:28.834209', 37, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024855-1-data', 'jhipster', 'config/liquibase/changelog/20200916024855_added_entity_Atendimento.xml', TIMESTAMP '2020-09-29 00:58:28.840204', 38, 'EXECUTED', '8:78aa473777e2f93b4bbf597bfa9be811', 'loadData tableName=atendimento', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916024955-1', 'jhipster', 'config/liquibase/changelog/20200916024955_added_entity_CartaoVacina.xml', TIMESTAMP '2020-09-29 00:58:28.842203', 39, 'EXECUTED', '8:b3cfdaa6fac4a21037da246907a50b17', 'createTable tableName=cartao_vacina', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024955-1-relations', 'jhipster', 'config/liquibase/changelog/20200916024955_added_entity_CartaoVacina.xml', TIMESTAMP '2020-09-29 00:58:28.8442', 40, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916024955-1-data', 'jhipster', 'config/liquibase/changelog/20200916024955_added_entity_CartaoVacina.xml', TIMESTAMP '2020-09-29 00:58:28.849201', 41, 'EXECUTED', '8:b5abefad65a992976038312bcef2fa6e', 'loadData tableName=cartao_vacina', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916025055-1', 'jhipster', 'config/liquibase/changelog/20200916025055_added_entity_Vacina.xml', TIMESTAMP '2020-09-29 00:58:28.853193', 42, 'EXECUTED', '8:560e1a499fb2467028173173a0432c53', 'createTable tableName=vacina', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025055-1-relations', 'jhipster', 'config/liquibase/changelog/20200916025055_added_entity_Vacina.xml', TIMESTAMP '2020-09-29 00:58:28.855194', 43, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025055-1-data', 'jhipster', 'config/liquibase/changelog/20200916025055_added_entity_Vacina.xml', TIMESTAMP '2020-09-29 00:58:28.862194', 44, 'EXECUTED', '8:1afda6cfe908d40d29e4c62c4578046d', 'loadData tableName=vacina', '', NULL, '3.9.0', 'faker', NULL, '1355508389');             
INSERT INTO "PUBLIC"."DATABASECHANGELOG" VALUES
('20200916025155-1', 'jhipster', 'config/liquibase/changelog/20200916025155_added_entity_UnidadeSaude.xml', TIMESTAMP '2020-09-29 00:58:28.866187', 45, 'EXECUTED', '8:bf9fe063877a84b08d9724f1f00beaba', 'createTable tableName=unidade_saude', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025155-1-relations', 'jhipster', 'config/liquibase/changelog/20200916025155_added_entity_UnidadeSaude.xml', TIMESTAMP '2020-09-29 00:58:28.867186', 46, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025155-1-data', 'jhipster', 'config/liquibase/changelog/20200916025155_added_entity_UnidadeSaude.xml', TIMESTAMP '2020-09-29 00:58:28.871185', 47, 'EXECUTED', '8:a44ff61a047971e20f59d2cfafad9493', 'loadData tableName=unidade_saude', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916025255-1', 'jhipster', 'config/liquibase/changelog/20200916025255_added_entity_Laboratorio.xml', TIMESTAMP '2020-09-29 00:58:28.874182', 48, 'EXECUTED', '8:6d50aa2a4c6128e5766a963bf7a88dfa', 'createTable tableName=laboratorio', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025255-1-relations', 'jhipster', 'config/liquibase/changelog/20200916025255_added_entity_Laboratorio.xml', TIMESTAMP '2020-09-29 00:58:28.876183', 49, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025255-1-data', 'jhipster', 'config/liquibase/changelog/20200916025255_added_entity_Laboratorio.xml', TIMESTAMP '2020-09-29 00:58:28.880183', 50, 'EXECUTED', '8:8f394dfa8fd643fc51fb310ea4a8c05f', 'loadData tableName=laboratorio', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916025355-1', 'jhipster', 'config/liquibase/changelog/20200916025355_added_entity_ClinicaMedica.xml', TIMESTAMP '2020-09-29 00:58:28.884177', 51, 'EXECUTED', '8:3eb0d7fad24bae41bd02ddd17c94f63d', 'createTable tableName=clinica_medica', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025355-1-relations', 'jhipster', 'config/liquibase/changelog/20200916025355_added_entity_ClinicaMedica.xml', TIMESTAMP '2020-09-29 00:58:28.885177', 52, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025355-1-data', 'jhipster', 'config/liquibase/changelog/20200916025355_added_entity_ClinicaMedica.xml', TIMESTAMP '2020-09-29 00:58:28.889176', 53, 'EXECUTED', '8:10b746b3d9d9bb8e29c33c5a7a67a074', 'loadData tableName=clinica_medica', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916025455-1', 'jhipster', 'config/liquibase/changelog/20200916025455_added_entity_Hospital.xml', TIMESTAMP '2020-09-29 00:58:28.892175', 54, 'EXECUTED', '8:8453c60c4336e50c465932490dacd564', 'createTable tableName=hospital', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025455-1-relations', 'jhipster', 'config/liquibase/changelog/20200916025455_added_entity_Hospital.xml', TIMESTAMP '2020-09-29 00:58:28.894174', 55, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025455-1-data', 'jhipster', 'config/liquibase/changelog/20200916025455_added_entity_Hospital.xml', TIMESTAMP '2020-09-29 00:58:28.898171', 56, 'EXECUTED', '8:ab765e3e27052eddcfe88fda7259dcc3', 'loadData tableName=hospital', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916025555-1', 'jhipster', 'config/liquibase/changelog/20200916025555_added_entity_PostoDeSaude.xml', TIMESTAMP '2020-09-29 00:58:28.901168', 57, 'EXECUTED', '8:102ac0644873db8958b5467c12051a02', 'createTable tableName=posto_de_saude', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025555-1-relations', 'jhipster', 'config/liquibase/changelog/20200916025555_added_entity_PostoDeSaude.xml', TIMESTAMP '2020-09-29 00:58:28.902168', 58, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025555-1-data', 'jhipster', 'config/liquibase/changelog/20200916025555_added_entity_PostoDeSaude.xml', TIMESTAMP '2020-09-29 00:58:28.906165', 59, 'EXECUTED', '8:dc2ad4c8915dadeb78bce827c41fc774', 'loadData tableName=posto_de_saude', '', NULL, '3.9.0', 'faker', NULL, '1355508389');
INSERT INTO "PUBLIC"."DATABASECHANGELOG" VALUES
('20200916025655-1', 'jhipster', 'config/liquibase/changelog/20200916025655_added_entity_Leito.xml', TIMESTAMP '2020-09-29 00:58:28.910163', 60, 'EXECUTED', '8:7b72cf714e853f85d6fca94ab3d05863', 'createTable tableName=leito', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025655-1-relations', 'jhipster', 'config/liquibase/changelog/20200916025655_added_entity_Leito.xml', TIMESTAMP '2020-09-29 00:58:28.911163', 61, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025655-1-data', 'jhipster', 'config/liquibase/changelog/20200916025655_added_entity_Leito.xml', TIMESTAMP '2020-09-29 00:58:28.916159', 62, 'EXECUTED', '8:0addf363cb07f2861e826c9f9de133ce', 'loadData tableName=leito', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916025755-1', 'jhipster', 'config/liquibase/changelog/20200916025755_added_entity_Farmacia.xml', TIMESTAMP '2020-09-29 00:58:28.920156', 63, 'EXECUTED', '8:9184874298eda6b3823217c48a433d2d', 'createTable tableName=farmacia', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025755-1-relations', 'jhipster', 'config/liquibase/changelog/20200916025755_added_entity_Farmacia.xml', TIMESTAMP '2020-09-29 00:58:28.922155', 64, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025755-1-data', 'jhipster', 'config/liquibase/changelog/20200916025755_added_entity_Farmacia.xml', TIMESTAMP '2020-09-29 00:58:28.927152', 65, 'EXECUTED', '8:449be9b5a6cb24a88b0ba6d2ac072894', 'loadData tableName=farmacia', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916025855-1', 'jhipster', 'config/liquibase/changelog/20200916025855_added_entity_Medicamento.xml', TIMESTAMP '2020-09-29 00:58:28.931151', 66, 'EXECUTED', '8:1a218d4e4ed1709b8bf9da9742419ee1', 'createTable tableName=medicamento', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025855-1-relations', 'jhipster', 'config/liquibase/changelog/20200916025855_added_entity_Medicamento.xml', TIMESTAMP '2020-09-29 00:58:28.93315', 67, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025855-1-data', 'jhipster', 'config/liquibase/changelog/20200916025855_added_entity_Medicamento.xml', TIMESTAMP '2020-09-29 00:58:28.937147', 68, 'EXECUTED', '8:92982118d4cdd793644ac908c48a6c49', 'loadData tableName=medicamento', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916025955-1', 'jhipster', 'config/liquibase/changelog/20200916025955_added_entity_Agenda.xml', TIMESTAMP '2020-09-29 00:58:28.941145', 69, 'EXECUTED', '8:cf99189c6e8effe8fbdcc1eb9ea502c2', 'createTable tableName=agenda', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025955-1-relations', 'jhipster', 'config/liquibase/changelog/20200916025955_added_entity_Agenda.xml', TIMESTAMP '2020-09-29 00:58:28.943143', 70, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025955-1-data', 'jhipster', 'config/liquibase/changelog/20200916025955_added_entity_Agenda.xml', TIMESTAMP '2020-09-29 00:58:28.94814', 71, 'EXECUTED', '8:bbcb239cade805b143f21ec07f31eeaf', 'loadData tableName=agenda', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916030055-1', 'jhipster', 'config/liquibase/changelog/20200916030055_added_entity_AgendaConsulta.xml', TIMESTAMP '2020-09-29 00:58:28.951139', 72, 'EXECUTED', '8:c90f4c66590ad5be9f8d5978d2efad42', 'createTable tableName=agenda_consulta', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916030055-1-relations', 'jhipster', 'config/liquibase/changelog/20200916030055_added_entity_AgendaConsulta.xml', TIMESTAMP '2020-09-29 00:58:28.952138', 73, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916030055-1-data', 'jhipster', 'config/liquibase/changelog/20200916030055_added_entity_AgendaConsulta.xml', TIMESTAMP '2020-09-29 00:58:28.957134', 74, 'EXECUTED', '8:1c2ad06416b17c314579b0439fc36e35', 'loadData tableName=agenda_consulta', '', NULL, '3.9.0', 'faker', NULL, '1355508389');    
INSERT INTO "PUBLIC"."DATABASECHANGELOG" VALUES
('20200916030155-1', 'jhipster', 'config/liquibase/changelog/20200916030155_added_entity_AgendaExame.xml', TIMESTAMP '2020-09-29 00:58:28.960133', 75, 'EXECUTED', '8:f0b9530da1db110830a4cf97249be79d', 'createTable tableName=agenda_exame', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916030155-1-relations', 'jhipster', 'config/liquibase/changelog/20200916030155_added_entity_AgendaExame.xml', TIMESTAMP '2020-09-29 00:58:28.961133', 76, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916030155-1-data', 'jhipster', 'config/liquibase/changelog/20200916030155_added_entity_AgendaExame.xml', TIMESTAMP '2020-09-29 00:58:28.965131', 77, 'EXECUTED', '8:95c3c9c7ad18749a175a29ab4b2dd05b', 'loadData tableName=agenda_exame', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916030255-1', 'jhipster', 'config/liquibase/changelog/20200916030255_added_entity_PerfilAcesso.xml', TIMESTAMP '2020-09-29 00:58:28.96813', 78, 'EXECUTED', '8:21aa009821cd3172fcaf03af6703e4bf', 'createTable tableName=perfil_acesso', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916030255-1-relations', 'jhipster', 'config/liquibase/changelog/20200916030255_added_entity_PerfilAcesso.xml', TIMESTAMP '2020-09-29 00:58:28.96913', 79, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916030255-1-data', 'jhipster', 'config/liquibase/changelog/20200916030255_added_entity_PerfilAcesso.xml', TIMESTAMP '2020-09-29 00:58:28.972129', 80, 'EXECUTED', '8:39ba47f0dc12bce0de2e3015f932b8bd', 'loadData tableName=perfil_acesso', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916030355-1', 'jhipster', 'config/liquibase/changelog/20200916030355_added_entity_Permissao.xml', TIMESTAMP '2020-09-29 00:58:28.975127', 81, 'EXECUTED', '8:6c55f085dc435190bd2368494403b85d', 'createTable tableName=permissao', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916030355-1-relations', 'jhipster', 'config/liquibase/changelog/20200916030355_added_entity_Permissao.xml', TIMESTAMP '2020-09-29 00:58:28.976127', 82, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916030355-1-data', 'jhipster', 'config/liquibase/changelog/20200916030355_added_entity_Permissao.xml', TIMESTAMP '2020-09-29 00:58:28.980123', 83, 'EXECUTED', '8:b25d2ea12bb03a8a90d3fcbf40d65b7a', 'loadData tableName=permissao', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200929051819-1', 'jhipster', 'config/liquibase/changelog/20200929051819_added_entity_Prontuario.xml', TIMESTAMP '2020-09-29 00:58:28.983124', 84, 'EXECUTED', '8:8c2f4a4743ecda5fe39e441aeb9f2d7c', 'createTable tableName=prontuario', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200929051819-1-relations', 'jhipster', 'config/liquibase/changelog/20200929051819_added_entity_Prontuario.xml', TIMESTAMP '2020-09-29 00:58:28.984122', 85, 'EXECUTED', '8:d41d8cd98f00b204e9800998ecf8427e', 'empty', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200929051819-1-data', 'jhipster', 'config/liquibase/changelog/20200929051819_added_entity_Prontuario.xml', TIMESTAMP '2020-09-29 00:58:28.988119', 86, 'EXECUTED', '8:579f77c84fee26e61401b5e620376180', 'loadData tableName=prontuario', '', NULL, '3.9.0', 'faker', NULL, '1355508389'),
('20200916023755-2', 'jhipster', 'config/liquibase/changelog/20200916023755_added_entity_constraints_Paciente.xml', TIMESTAMP '2020-09-29 00:58:28.993119', 87, 'EXECUTED', '8:063fff874f55c523a3e161421cd73c90', 'addForeignKeyConstraint baseTableName=paciente, constraintName=fk_paciente_perfil_acesso_id, referencedTableName=perfil_acesso; addForeignKeyConstraint baseTableName=paciente, constraintName=fk_paciente_endereco_id, referencedTableName=endereco', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916023955-2', 'jhipster', 'config/liquibase/changelog/20200916023955_added_entity_constraints_Profissional.xml', TIMESTAMP '2020-09-29 00:58:28.996115', 88, 'EXECUTED', '8:27bbee7020555d60121e383ed34832c4', 'addForeignKeyConstraint baseTableName=profissional, constraintName=fk_profissional_perfil_acesso_id, referencedTableName=perfil_acesso', '', NULL, '3.9.0', NULL, NULL, '1355508389');       
INSERT INTO "PUBLIC"."DATABASECHANGELOG" VALUES
('20200916025055-2', 'jhipster', 'config/liquibase/changelog/20200916025055_added_entity_constraints_Vacina.xml', TIMESTAMP '2020-09-29 00:58:29.000111', 89, 'EXECUTED', '8:a1667282dc813661c0cfbc55e4854c0e', 'addForeignKeyConstraint baseTableName=vacina, constraintName=fk_vacina_cartao_vacina_id, referencedTableName=cartao_vacina', '', NULL, '3.9.0', NULL, NULL, '1355508389'),
('20200916025855-2', 'jhipster', 'config/liquibase/changelog/20200916025855_added_entity_constraints_Medicamento.xml', TIMESTAMP '2020-09-29 00:58:29.004109', 90, 'EXECUTED', '8:a79204a30e627f06a23962fe874ec17e', 'addForeignKeyConstraint baseTableName=medicamento, constraintName=fk_medicamento_farmacia_id, referencedTableName=farmacia', '', NULL, '3.9.0', NULL, NULL, '1355508389');
CREATE MEMORY TABLE "PUBLIC"."JHI_USER"(
    "ID" BIGINT NOT NULL,
    "LOGIN" VARCHAR(50) NOT NULL,
    "PASSWORD_HASH" VARCHAR(60) NOT NULL,
    "FIRST_NAME" VARCHAR(50),
    "LAST_NAME" VARCHAR(50),
    "EMAIL" VARCHAR(191),
    "IMAGE_URL" VARCHAR(256),
    "ACTIVATED" BOOLEAN NOT NULL,
    "LANG_KEY" VARCHAR(10),
    "ACTIVATION_KEY" VARCHAR(20),
    "RESET_KEY" VARCHAR(20),
    "CREATED_BY" VARCHAR(50) NOT NULL,
    "CREATED_DATE" TIMESTAMP DEFAULT NULL,
    "RESET_DATE" TIMESTAMP,
    "LAST_MODIFIED_BY" VARCHAR(50),
    "LAST_MODIFIED_DATE" TIMESTAMP
);       
ALTER TABLE "PUBLIC"."JHI_USER" ADD CONSTRAINT "PUBLIC"."PK_JHI_USER" PRIMARY KEY("ID");      
-- 4 +/- SELECT COUNT(*) FROM PUBLIC.JHI_USER;
INSERT INTO "PUBLIC"."JHI_USER" VALUES
(1, 'system', '$2a$10$mE.qmcV0mFU5NcKh73TZx.z4ueI/.bDWbj0T1BYyqP481kGGarKLG', 'System', 'System', 'system@localhost', '', TRUE, 'pt-br', NULL, NULL, 'system', NULL, NULL, 'system', NULL),
(2, 'anonymoususer', '$2a$10$j8S5d7Sr7.8VTOYNviDPOeWX8KcYILUVJBsYV83Y5NtECayypx9lO', 'Anonymous', 'User', 'anonymous@localhost', '', TRUE, 'pt-br', NULL, NULL, 'system', NULL, NULL, 'system', NULL),
(3, 'admin', '$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC', 'Administrator', 'Administrator', 'admin@localhost', '', TRUE, 'pt-br', NULL, NULL, 'system', NULL, NULL, 'system', NULL),
(4, 'user', '$2a$10$VEjxo0jq2YG9Rbk2HmX9S.k1uZBGYUHdUcid3g/vfiEl7lwWgOH/K', 'User', 'User', 'user@localhost', '', TRUE, 'pt-br', NULL, NULL, 'system', NULL, NULL, 'system', NULL);     
CREATE MEMORY TABLE "PUBLIC"."JHI_AUTHORITY"(
    "NAME" VARCHAR(50) NOT NULL
);            
ALTER TABLE "PUBLIC"."JHI_AUTHORITY" ADD CONSTRAINT "PUBLIC"."PK_JHI_AUTHORITY" PRIMARY KEY("NAME");          
-- 2 +/- SELECT COUNT(*) FROM PUBLIC.JHI_AUTHORITY;           
INSERT INTO "PUBLIC"."JHI_AUTHORITY" VALUES
('ROLE_ADMIN'),
('ROLE_USER');  
CREATE MEMORY TABLE "PUBLIC"."JHI_USER_AUTHORITY"(
    "USER_ID" BIGINT NOT NULL,
    "AUTHORITY_NAME" VARCHAR(50) NOT NULL
);             
ALTER TABLE "PUBLIC"."JHI_USER_AUTHORITY" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_E" PRIMARY KEY("USER_ID", "AUTHORITY_NAME");    
-- 5 +/- SELECT COUNT(*) FROM PUBLIC.JHI_USER_AUTHORITY;      
INSERT INTO "PUBLIC"."JHI_USER_AUTHORITY" VALUES
(1, 'ROLE_ADMIN'),
(1, 'ROLE_USER'),
(3, 'ROLE_ADMIN'),
(3, 'ROLE_USER'),
(4, 'ROLE_USER');             
CREATE MEMORY TABLE "PUBLIC"."JHI_PERSISTENT_TOKEN"(
    "SERIES" VARCHAR(20) NOT NULL,
    "USER_ID" BIGINT,
    "TOKEN_VALUE" VARCHAR(20) NOT NULL,
    "TOKEN_DATE" DATE,
    "IP_ADDRESS" VARCHAR(39),
    "USER_AGENT" VARCHAR(255)
);            
ALTER TABLE "PUBLIC"."JHI_PERSISTENT_TOKEN" ADD CONSTRAINT "PUBLIC"."PK_JHI_PERSISTENT_TOKEN" PRIMARY KEY("SERIES");          
-- 0 +/- SELECT COUNT(*) FROM PUBLIC.JHI_PERSISTENT_TOKEN;    
CREATE MEMORY TABLE "PUBLIC"."JHI_PERSISTENT_AUDIT_EVENT"(
    "EVENT_ID" BIGINT NOT NULL,
    "PRINCIPAL" VARCHAR(50) NOT NULL,
    "EVENT_DATE" TIMESTAMP,
    "EVENT_TYPE" VARCHAR(255)
);            
ALTER TABLE "PUBLIC"."JHI_PERSISTENT_AUDIT_EVENT" ADD CONSTRAINT "PUBLIC"."PK_JHI_PERSISTENT_AUDIT_EVENT" PRIMARY KEY("EVENT_ID");            
-- 0 +/- SELECT COUNT(*) FROM PUBLIC.JHI_PERSISTENT_AUDIT_EVENT;              
CREATE INDEX "PUBLIC"."IDX_PERSISTENT_AUDIT_EVENT" ON "PUBLIC"."JHI_PERSISTENT_AUDIT_EVENT"("PRINCIPAL", "EVENT_DATE");       
CREATE MEMORY TABLE "PUBLIC"."JHI_PERSISTENT_AUDIT_EVT_DATA"(
    "EVENT_ID" BIGINT NOT NULL,
    "NAME" VARCHAR(150) NOT NULL,
    "VALUE" VARCHAR(255)
);               
ALTER TABLE "PUBLIC"."JHI_PERSISTENT_AUDIT_EVT_DATA" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_F" PRIMARY KEY("EVENT_ID", "NAME");  
-- 0 +/- SELECT COUNT(*) FROM PUBLIC.JHI_PERSISTENT_AUDIT_EVT_DATA;           
CREATE INDEX "PUBLIC"."IDX_PERSISTENT_AUDIT_EVT_DATA" ON "PUBLIC"."JHI_PERSISTENT_AUDIT_EVT_DATA"("EVENT_ID");
CREATE MEMORY TABLE "PUBLIC"."PACIENTE"(
    "ID" BIGINT NOT NULL,
    "NOME" VARCHAR(255),
    "R_G" VARCHAR(255),
    "C_PF" VARCHAR(255),
    "DATA_NASCIMENTO" DATE,
    "TELEFONE" VARCHAR(255),
    "PESO" DOUBLE,
    "ALTURA" DOUBLE,
    "RESPONSAVEL" VARCHAR(255),
    "R_NE" VARCHAR(255),
    "PERFIL_ACESSO_ID" BIGINT,
    "ENDERECO_ID" BIGINT
);
ALTER TABLE "PUBLIC"."PACIENTE" ADD CONSTRAINT "PUBLIC"."PK_PACIENTE" PRIMARY KEY("ID");      
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.PACIENTE;               
INSERT INTO "PUBLIC"."PACIENTE" VALUES
(1, 'payment', 'Cotton', 'Afghani Executive', DATE '2020-09-15', 'Minnesota Legacy Spurs', 6797.0, 51307.0, 'THX methodologies', 'human-resource Maryland', NULL, NULL),
(2, 'channels', 'clear-thinking generate', 'THX Home Cote d''Ivoire', DATE '2020-09-16', 'cross-media', 19334.0, 12700.0, 'model Cambridgeshire THX', 'Stand-alone', NULL, NULL),
(3, 'calculate', 'Identity deliverables', 'Refined Metal Towels Enterprise-wide', DATE '2020-09-15', 'Underpass Frozen', 76583.0, 1001.0, 'plug-and-play FTP salmon', 'Fantastic Bolivar Fuerte copying', NULL, NULL),
(4, 'Cotton Bedfordshire optimizing', 'transmit', 'SQL deposit North Korean Won', DATE '2020-09-15', 'plum bypass cultivate', 55434.0, 70798.0, 'GB Facilitator web-readiness', 'Versatile', NULL, NULL),
(5, 'Pre-emptive optical Computer', 'cross-platform Granite transmitting', 'Awesome Cotton Chips connect', DATE '2020-09-15', 'parsing bandwidth Hat', 61510.0, 22566.0, 'Generic Plastic Bacon primary Operations', 'Secured Burundi Franc Strategist', NULL, NULL),
(6, 'Buckinghamshire', 'frame', 'navigating', DATE '2020-09-15', 'Music microchip', 65424.0, 97539.0, 'Generic', 'Burundi Franc', NULL, NULL),
(7, 'Alaska', 'European Unit of Account 9(E.U.A.-9) Bhutan', 'Minnesota navigating', DATE '2020-09-15', 'Officer', 9835.0, 34769.0, 'XSS Savings Account', 'Colorado Savings Account', NULL, NULL),
(8, 'card', 'pink Metal', 'EXE', DATE '2020-09-15', 'white quantify', 44289.0, 19926.0, 'COM', 'panel grid-enabled', NULL, NULL),
(9, 'Checking Account', 'copy dedicated Intelligent', 'scale Borders', DATE '2020-09-15', 'Data Buckinghamshire Devolved', 5197.0, 59364.0, 'Chicken interactive', 'Bedfordshire', NULL, NULL),
(10, 'AGP overriding synthesizing', 'Keys Maldives Ergonomic', 'Re-engineered multi-byte', DATE '2020-09-15', 'firmware benchmark', 4551.0, 58301.0, 'sky blue Rand Bedfordshire', 'Nevada', NULL, NULL);             
CREATE MEMORY TABLE "PUBLIC"."ENDERECO"(
    "ID" BIGINT NOT NULL,
    "TIPO" VARCHAR(255),
    "NUMERO" VARCHAR(255),
    "PAIS" VARCHAR(255),
    "ESTADO" VARCHAR(255),
    "CIDADE" VARCHAR(255),
    "BAIRRO" VARCHAR(255),
    "C_EP" VARCHAR(255),
    "COORDENADAS_GEOGRAFICAS" VARCHAR(255)
);             
ALTER TABLE "PUBLIC"."ENDERECO" ADD CONSTRAINT "PUBLIC"."PK_ENDERECO" PRIMARY KEY("ID");      
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.ENDERECO;               
INSERT INTO "PUBLIC"."ENDERECO" VALUES
(1, 'customized Small Practical', 'Officer Personal Loan Account online', 'Applications Canyon', 'USB', 'interfaces Beauty back-end', 'Forward', 'Chair', 'motivating'),
(2, 'Bacon Integration', 'Fall circuit bandwidth-monitored', 'dot-com synthesizing', 'ivory Checking Account', 'next-generation', 'Personal Loan Account motivating', 'Belize', 'cross-platform methodology repurpose'),
(3, 'circuit', 'Corporate copying', 'calculate', 'Belgium', 'Belize magenta Intelligent', 'markets bypass', 'transmit', 'Manager Bacon North Dakota'),
(4, 'Concrete', 'Auto Loan Account', 'withdrawal', 'GB copy product', 'reinvent backing up', 'Small', 'copying', 'Table indexing'),
(5, 'Practical Steel Chips', 'Lempira Credit Card Account synthesizing', 'Principal RSS XML', 'magenta mobile Gibraltar Pound', 'Maryland', 'Personal Loan Account', 'back up Lock', 'pink Front-line'),
(6, 'embrace Mall', 'Director Rustic Frozen Sausages', 'connecting Rand Loti Gardens', 'bandwidth Chair Savings Account', 'Mali', 'Chair mint green', 'Texas Secured', 'Avon'),
(7, 'orange Florida', 'Philippine Peso Garden', 'Wooden program', 'Fords Intelligent Fresh', 'Principal', 'Maryland navigate bypassing', 'Florida Cambridgeshire JSON', 'deposit transmitting'),
(8, 'calculating Fresh', 'Central Mobility Checking Account', 'Buckinghamshire Versatile', 'interface transmitting', 'expedite', 'hacking', 'deposit', 'deposit'),
(9, 'synergize intermediate Route', 'Usability bandwidth Handmade Soft Soap', 'Divide monitor reboot', 'Buckinghamshire reboot', 'solid state Mouse Internal', 'Missouri deliverables neural', 'Agent proactive', 'Frozen Ameliorated'),
(10, 'Robust salmon', 'Buckinghamshire Handmade', 'Gorgeous Savings Account Wooden', 'Intelligent', 'payment', 'Incredible Fully-configurable', 'bypassing software', 'array');           
CREATE MEMORY TABLE "PUBLIC"."PROFISSIONAL"(
    "ID" BIGINT NOT NULL,
    "PERFIL_ACESSO_ID" BIGINT
);    
ALTER TABLE "PUBLIC"."PROFISSIONAL" ADD CONSTRAINT "PUBLIC"."PK_PROFISSIONAL" PRIMARY KEY("ID");              
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.PROFISSIONAL;           
INSERT INTO "PUBLIC"."PROFISSIONAL" VALUES
(1, NULL),
(2, NULL),
(3, NULL),
(4, NULL),
(5, NULL),
(6, NULL),
(7, NULL),
(8, NULL),
(9, NULL),
(10, NULL);           
CREATE MEMORY TABLE "PUBLIC"."PROFISSIONAL_DE_SAUDE"(
    "ID" BIGINT NOT NULL,
    "PRONTUARIO_ID" BIGINT
);              
ALTER TABLE "PUBLIC"."PROFISSIONAL_DE_SAUDE" ADD CONSTRAINT "PUBLIC"."PK_PROFISSIONAL_DE_SAUDE" PRIMARY KEY("ID");            
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.PROFISSIONAL_DE_SAUDE;  
INSERT INTO "PUBLIC"."PROFISSIONAL_DE_SAUDE" VALUES
(1, NULL),
(2, NULL),
(3, NULL),
(4, NULL),
(5, NULL),
(6, NULL),
(7, NULL),
(8, NULL),
(9, NULL),
(10, NULL);  
CREATE MEMORY TABLE "PUBLIC"."MEDICO"(
    "ID" BIGINT NOT NULL,
    "NOME" VARCHAR(255),
    "R_G" VARCHAR(255),
    "C_PF" VARCHAR(255),
    "NUMERO_REGISTRO" VARCHAR(255)
);        
ALTER TABLE "PUBLIC"."MEDICO" ADD CONSTRAINT "PUBLIC"."PK_MEDICO" PRIMARY KEY("ID");          
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.MEDICO; 
INSERT INTO "PUBLIC"."MEDICO" VALUES
(1, 'Outdoors', 'Borders', 'object-oriented', 'unleash Aruban Guilder'),
(2, 'best-of-breed Borders driver', 'web-readiness', 'Personal Loan Account Cotton', 'Dynamic'),
(3, 'compressing', 'Automotive 24/365', 'Automotive Supervisor', 'redefine actuating'),
(4, 'Industrial index PNG', 'pink Kentucky Overpass', 'Metal Health communities', 'deposit Dynamic Row'),
(5, 'artificial intelligence didactic impactful', 'bypass', 'Interactions', 'Rustic generating'),
(6, 'Malaysia Factors Ranch', 'Unbranded generate override', 'Fresh viral', 'help-desk'),
(7, 'circuit programming reinvent', 'olive Steel Baht', 'customized Cambridgeshire', 'bluetooth'),
(8, 'purple partnerships', 'Drive port', 'Bike incubate South Dakota', 'payment Ball Zimbabwe'),
(9, 'convergence evolve', 'Open-architected Avon', 'Borders', 'vortals input'),
(10, 'Progressive Universal', 'Dong', 'Cape Verde Escudo Unbranded Concrete Towels Regional', 'one-to-one Netherlands');           
CREATE MEMORY TABLE "PUBLIC"."FISIOTERAPEUTA"(
    "ID" BIGINT NOT NULL,
    "NOME" VARCHAR(255),
    "R_G" VARCHAR(255),
    "C_PF" VARCHAR(255),
    "NUMERO_REGISTRO" VARCHAR(255)
);
ALTER TABLE "PUBLIC"."FISIOTERAPEUTA" ADD CONSTRAINT "PUBLIC"."PK_FISIOTERAPEUTA" PRIMARY KEY("ID");          
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.FISIOTERAPEUTA;         
INSERT INTO "PUBLIC"."FISIOTERAPEUTA" VALUES
(1, 'superstructure Division', 'back up withdrawal', 'Representative', 'Operative Human Industrial'),
(2, 'Planner Chad', 'Investment Account', 'mesh', 'TCP Interactions'),
(3, 'strategic Principal', 'portals Tools deliver', 'architectures ADP Handcrafted', 'mint green lime'),
(4, 'matrix turn-key', 'Ergonomic Ports', 'Peso Uruguayo Uruguay Peso en Unidades Indexadas Public-key Highway', 'Towels strategize'),
(5, 'National Alabama', 'Health deposit navigate', 'Designer Handmade Steel Fish engage', 'Wooden orange'),
(6, 'panel', 'ADP Utah multi-byte', 'Andorra Bermudian Dollar (customarily known as Bermuda Dollar) Infrastructure', 'even-keeled Brand empowering'),
(7, 'User-centric azure firewall', 'New Zealand Dollar', 'Chair', 'Liaison capacity CSS'),
(8, 'backing up Liberia Gorgeous Frozen Pants', 'International North Carolina connecting', 'connect', 'invoice'),
(9, 'Squares', 'Guinea-Bissau', 'infomediaries', 'Associate back-end'),
(10, 'Yuan Renminbi workforce tan', 'Customer payment Soft', 'Representative', 'Sri Lanka Rupee'); 
CREATE MEMORY TABLE "PUBLIC"."PSICOLOGO"(
    "ID" BIGINT NOT NULL,
    "NOME" VARCHAR(255),
    "R_G" VARCHAR(255),
    "C_PF" VARCHAR(255),
    "NUMERO_REGISTRO" VARCHAR(255)
);     
ALTER TABLE "PUBLIC"."PSICOLOGO" ADD CONSTRAINT "PUBLIC"."PK_PSICOLOGO" PRIMARY KEY("ID");    
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.PSICOLOGO;              
INSERT INTO "PUBLIC"."PSICOLOGO" VALUES
(1, 'China', 'Gorgeous Rustic empower', 'withdrawal', 'enterprise Mobility Shoes'),
(2, 'wireless Consultant Practical Plastic Chips', 'Rand target', 'deploy', 'Granite'),
(3, 'e-enable', 'online Creative Handcrafted', 'Cape Verde Generic Fresh Cheese', 'XSS program'),
(4, 'index navigating ROI', 'invoice Union Refined', 'lavender Wooden', 'index Montana'),
(5, 'Paradigm', 'Global', 'CFP Franc', 'lime ADP Garden'),
(6, 'Zimbabwe Dollar Awesome Seychelles', 'leverage Graphic Interface Assistant', 'best-of-breed', 'integrate Fresh Bouvet Island (Bouvetoya)'),
(7, 'Pizza', 'EXE backing up Unbranded Soft Salad', 'Berkshire Coves solid state', 'Group Marketing'),
(8, 'Tasty Wooden Chips synthesizing Rustic Concrete Tuna', 'content Books', 'schemas Finland', 'Electronics Inverse Extended'),
(9, 'Avon AI', 'Internal', 'Concrete logistical Granite', 'Intelligent Cotton Shirt'),
(10, 'client-server frictionless', 'Palau Chicken deliverables', 'Automotive', 'Cuba TCP');              
CREATE MEMORY TABLE "PUBLIC"."ENFERMEIRO"(
    "ID" BIGINT NOT NULL,
    "NOME" VARCHAR(255),
    "R_G" VARCHAR(255),
    "C_PF" VARCHAR(255),
    "NUMERO_REGISTRO" VARCHAR(255)
);    
ALTER TABLE "PUBLIC"."ENFERMEIRO" ADD CONSTRAINT "PUBLIC"."PK_ENFERMEIRO" PRIMARY KEY("ID");  
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.ENFERMEIRO;             
INSERT INTO "PUBLIC"."ENFERMEIRO" VALUES
(1, 'viral local Incredible Frozen Bacon', 'Games Books', 'intuitive function Toys', 'Hills'),
(2, 'orchestration 1080p', 'static solid state', 'alliance withdrawal', 'redundant'),
(3, 'Toys', 'hacking Shores Intelligent', 'Rubber Island Dynamic', 'Digitized Tugrik transmitting'),
(4, 'Corners Shirt Guadeloupe', 'Gorgeous Frozen Pizza generate', 'Cambridgeshire Rubber reboot', 'project'),
(5, 'Group Ergonomic Plastic Hat', 'orange Optional JBOD', 'Buckinghamshire HDD 1080p', 'Hat quantify'),
(6, 'Freeway Assistant', 'Brand Tennessee', 'Agent', 'application'),
(7, 'Congo programming', 'Games', 'users', 'Credit Card Account Corporate Dynamic'),
(8, 'Hat', 'generate Savings Account', 'Chad parse vortals', 'Auto Loan Account'),
(9, 'Philippines Wooden Home Loan Account', 'Manager', 'Investor', 'Yemen iterate Tasty Steel Pants'),
(10, 'AGP', 'Berkshire Sleek', 'drive Berkshire', 'Inlet');           
CREATE MEMORY TABLE "PUBLIC"."EXAME"(
    "ID" BIGINT NOT NULL,
    "DESCRICAO" VARCHAR(255),
    "PRECO" DOUBLE,
    "CODIGO" VARCHAR(255)
);           
ALTER TABLE "PUBLIC"."EXAME" ADD CONSTRAINT "PUBLIC"."PK_EXAME" PRIMARY KEY("ID");            
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.EXAME;  
INSERT INTO "PUBLIC"."EXAME" VALUES
(1, 'Soft cultivate backing up', 6905.0, 'yellow'),
(2, 'mission-critical deposit Practical', 83218.0, 'Intelligent Steel Tuna'),
(3, 'invoice quantifying', 31196.0, 'ubiquitous'),
(4, 'Facilitator', 67079.0, 'Interactions reboot'),
(5, 'systems Personal Loan Account', 64938.0, 'Awesome Cotton Bike Investor whiteboard'),
(6, 'transmitting Networked Health', 83245.0, 'full-range IB Dam'),
(7, 'AI invoice Fantastic Cotton Soap', 1690.0, 'parse Small Soft Pants'),
(8, 'National', 80756.0, 'Mauritania Gloves'),
(9, 'Personal Loan Account Georgia', 38465.0, 'Flats'),
(10, 'asymmetric', 38519.0, 'Facilitator matrix');     
CREATE MEMORY TABLE "PUBLIC"."CONSULTA"(
    "ID" BIGINT NOT NULL,
    "DESCRICAO" VARCHAR(255),
    "PRECO" DOUBLE,
    "CODIGO" VARCHAR(255)
);        
ALTER TABLE "PUBLIC"."CONSULTA" ADD CONSTRAINT "PUBLIC"."PK_CONSULTA" PRIMARY KEY("ID");      
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.CONSULTA;               
INSERT INTO "PUBLIC"."CONSULTA" VALUES
(1, 'Re-contextualized yellow compressing', 25903.0, 'Lead'),
(2, 'Lempira virtual Dalasi', 28936.0, 'Granite Accountability Supervisor'),
(3, 'RAM', 11939.0, 'deliverables Throughway Concrete'),
(4, 'out-of-the-box Ghana', 33050.0, 'Auto Loan Account Manager Concrete'),
(5, 'Administrator open-source', 88674.0, 'expedite Licensed'),
(6, 'Table interface maximized', 15216.0, 'killer maroon'),
(7, 'Licensed deposit transmitting', 58014.0, 'SDD Multi-layered'),
(8, 'Savings Account', 96643.0, 'Integration Money Market Account'),
(9, 'multi-byte', 33852.0, 'Heights B2C Wooden'),
(10, 'parsing repurpose', 73112.0, 'port Borders');   
CREATE MEMORY TABLE "PUBLIC"."PROCEDIMENTO"(
    "ID" BIGINT NOT NULL,
    "DESCRICAO" VARCHAR(255),
    "PRECO" DOUBLE,
    "CODIGO" VARCHAR(255),
    "PACIENTE_ID" BIGINT,
    "PROFISSIONAL_DE_SAUDE_ID" BIGINT,
    "ENDERECO_ID" BIGINT,
    "AGENDA_ID" BIGINT,
    "PRONTUARIO_ID" BIGINT
);
ALTER TABLE "PUBLIC"."PROCEDIMENTO" ADD CONSTRAINT "PUBLIC"."PK_PROCEDIMENTO" PRIMARY KEY("ID");              
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.PROCEDIMENTO;           
INSERT INTO "PUBLIC"."PROCEDIMENTO" VALUES
(1, 'Savings Account transform tangible', 10228.0, 'Fork', NULL, NULL, NULL, NULL, NULL),
(2, 'Total', 73914.0, 'payment', NULL, NULL, NULL, NULL, NULL),
(3, 'SMTP bypass', 14457.0, 'bluetooth Gorgeous payment', NULL, NULL, NULL, NULL, NULL),
(4, 'yellow', 55349.0, 'Berkshire', NULL, NULL, NULL, NULL, NULL),
(5, 'Checking Account Port', 7581.0, 'Money Market Account Beauty programming', NULL, NULL, NULL, NULL, NULL),
(6, 'cultivate Investment Account', 6912.0, 'wireless Fully-configurable', NULL, NULL, NULL, NULL, NULL),
(7, 'technologies Health', 97541.0, 'Usability', NULL, NULL, NULL, NULL, NULL),
(8, 'Polarised Grocery Cambridgeshire', 1418.0, 'Books human-resource', NULL, NULL, NULL, NULL, NULL),
(9, 'invoice online', 64786.0, 'Ergonomic application Towels', NULL, NULL, NULL, NULL, NULL),
(10, 'reciprocal bypassing gold', 74305.0, 'Handcrafted Handcrafted Concrete Table overriding', NULL, NULL, NULL, NULL, NULL);       
CREATE MEMORY TABLE "PUBLIC"."ATENDIMENTO"(
    "ID" BIGINT NOT NULL,
    "DATA" DATE,
    "PACIENTE_ID" BIGINT,
    "PROFISSIONAL_DE_SAUDE_ID" BIGINT,
    "ENDERECO_ID" BIGINT,
    "AGENDA_ID" BIGINT,
    "PRONTUARIO_ID" BIGINT
);               
ALTER TABLE "PUBLIC"."ATENDIMENTO" ADD CONSTRAINT "PUBLIC"."PK_ATENDIMENTO" PRIMARY KEY("ID");
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.ATENDIMENTO;            
INSERT INTO "PUBLIC"."ATENDIMENTO" VALUES
(1, DATE '2020-09-15', NULL, NULL, NULL, NULL, NULL),
(2, DATE '2020-09-15', NULL, NULL, NULL, NULL, NULL),
(3, DATE '2020-09-15', NULL, NULL, NULL, NULL, NULL),
(4, DATE '2020-09-15', NULL, NULL, NULL, NULL, NULL),
(5, DATE '2020-09-15', NULL, NULL, NULL, NULL, NULL),
(6, DATE '2020-09-15', NULL, NULL, NULL, NULL, NULL),
(7, DATE '2020-09-15', NULL, NULL, NULL, NULL, NULL),
(8, DATE '2020-09-15', NULL, NULL, NULL, NULL, NULL),
(9, DATE '2020-09-15', NULL, NULL, NULL, NULL, NULL),
(10, DATE '2020-09-15', NULL, NULL, NULL, NULL, NULL);              
CREATE MEMORY TABLE "PUBLIC"."CARTAO_VACINA"(
    "ID" BIGINT NOT NULL
);   
ALTER TABLE "PUBLIC"."CARTAO_VACINA" ADD CONSTRAINT "PUBLIC"."PK_CARTAO_VACINA" PRIMARY KEY("ID");            
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.CARTAO_VACINA;          
INSERT INTO "PUBLIC"."CARTAO_VACINA" VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10);      
CREATE MEMORY TABLE "PUBLIC"."VACINA"(
    "ID" BIGINT NOT NULL,
    "NOME" VARCHAR(255),
    "LOTE" VARCHAR(255),
    "DATA_APLICACAO" DATE,
    "CARTAO_VACINA_ID" BIGINT
);          
ALTER TABLE "PUBLIC"."VACINA" ADD CONSTRAINT "PUBLIC"."PK_VACINA" PRIMARY KEY("ID");          
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.VACINA; 
INSERT INTO "PUBLIC"."VACINA" VALUES
(1, 'online', 'generating', DATE '2020-09-15', NULL),
(2, 'Small Wooden Table Intelligent Concrete Towels schemas', 'feed Books Borders', DATE '2020-09-15', NULL),
(3, 'generating global Personal Loan Account', 'copying tertiary', DATE '2020-09-15', NULL),
(4, 'Plastic Tools', 'strategic', DATE '2020-09-15', NULL),
(5, 'Savings Account Hat Fantastic Concrete Shirt', 'Mill Dynamic', DATE '2020-09-15', NULL),
(6, 'frictionless Bahamian Dollar', 'parsing Mouse Incredible Frozen Soap', DATE '2020-09-15', NULL),
(7, 'Adaptive Gorgeous Plastic Chips', 'hack', DATE '2020-09-15', NULL),
(8, 'Nevada alarm Terrace', 'Configuration Ergonomic Steel Bike', DATE '2020-09-15', NULL),
(9, 'interface optimize', 'solid state Concrete', DATE '2020-09-15', NULL),
(10, 'Rue', 'Digitized', DATE '2020-09-15', NULL);           
CREATE MEMORY TABLE "PUBLIC"."UNIDADE_SAUDE"(
    "ID" BIGINT NOT NULL
);   
ALTER TABLE "PUBLIC"."UNIDADE_SAUDE" ADD CONSTRAINT "PUBLIC"."PK_UNIDADE_SAUDE" PRIMARY KEY("ID");            
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.UNIDADE_SAUDE;          
INSERT INTO "PUBLIC"."UNIDADE_SAUDE" VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10);      
CREATE MEMORY TABLE "PUBLIC"."LABORATORIO"(
    "ID" BIGINT NOT NULL,
    "C_NPJ" VARCHAR(255),
    "TELEFONE" VARCHAR(255),
    "C_EP" VARCHAR(255),
    "RAZAO_SOCIAL" VARCHAR(255),
    "NOME_FANTASIA" VARCHAR(255),
    "TIPO_UNIDADE_SAUDE" VARCHAR(255),
    "ENDERECO_ID" BIGINT
);          
ALTER TABLE "PUBLIC"."LABORATORIO" ADD CONSTRAINT "PUBLIC"."PK_LABORATORIO" PRIMARY KEY("ID");
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.LABORATORIO;            
INSERT INTO "PUBLIC"."LABORATORIO" VALUES
(1, 'Advanced Rustic', 'cross-platform Liaison turn-key', 'quantifying', 'Rubber', 'navigating markets SCSI', 'PUBLICA', NULL),
(2, 'Codes specifically reserved for testing purposes', 'bandwidth Toys', 'Delaware', 'backing up back up', 'Soft', 'PARTICULAR', NULL),
(3, 'Nevada', 'JBOD repurpose', 'methodical supply-chains', 'withdrawal Cotton', 'PCI Central', 'PUBLICA', NULL),
(4, 'Taiwan', 'COM Licensed', 'auxiliary Borders', 'cross-platform', 'Intelligent Fresh Keyboard', 'PUBLICA', NULL),
(5, 'back up Intelligent', 'US Dollar Massachusetts Home Loan Account', 'Unbranded black Comoro Franc', 'mission-critical implementation multi-byte', 'calculate microchip', 'PUBLICA', NULL),
(6, 'gold FTP', 'Rubber', 'Surinam Dollar', 'AGP THX', 'Money Market Account', 'PARTICULAR', NULL),
(7, 'bluetooth', 'Granite logistical', 'bandwidth', 'Books ivory Forward', 'Seamless', 'PARTICULAR', NULL),
(8, 'navigate Soft', 'Global', 'invoice array', 'Investor', 'project exuding', 'PARTICULAR', NULL),
(9, 'alarm Handmade Soft Mouse Pennsylvania', 'indexing reboot application', 'Ergonomic Steel Table parse quantify', 'frictionless', 'Mouse Small', 'PARTICULAR', NULL),
(10, 'Michigan back-end bus', 'Games networks', 'Forint Checking Account', 'HTTP bluetooth', 'Soap Peru', 'PUBLICA', NULL);   
CREATE MEMORY TABLE "PUBLIC"."CLINICA_MEDICA"(
    "ID" BIGINT NOT NULL,
    "C_NPJ" VARCHAR(255),
    "TELEFONE" VARCHAR(255),
    "C_EP" VARCHAR(255),
    "RAZAO_SOCIAL" VARCHAR(255),
    "NOME_FANTASIA" VARCHAR(255),
    "TIPO_UNIDADE_SAUDE" VARCHAR(255),
    "ENDERECO_ID" BIGINT
);       
ALTER TABLE "PUBLIC"."CLINICA_MEDICA" ADD CONSTRAINT "PUBLIC"."PK_CLINICA_MEDICA" PRIMARY KEY("ID");          
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.CLINICA_MEDICA;         
INSERT INTO "PUBLIC"."CLINICA_MEDICA" VALUES
(1, 'Credit Card Account pink', 'Consultant Future Facilitator', 'Dalasi Licensed Granite Towels', 'Lead Generic Metal Chair', 'killer plum European Monetary Unit (E.M.U.-6)', 'PUBLICA', NULL),
(2, 'harness', 'Credit Card Account', 'explicit Branding withdrawal', 'communities Soft program', 'Identity e-commerce', 'PUBLICA', NULL),
(3, 'maroon', 'overriding SSL', 'Granite', 'architectures Buckinghamshire project', 'Shoals', 'PARTICULAR', NULL),
(4, 'virtual New York', 'Colombian Peso Unidad de Valor Real', 'Reverse-engineered Architect fresh-thinking', 'Car Architect', 'Bahrain payment PCI', 'PARTICULAR', NULL),
(5, 'wireless', 'optimize Dynamic', 'synthesize Steel infomediaries', 'Home Loan Account Bahamian Dollar', 'Home synthesize Hong Kong', 'PUBLICA', NULL),
(6, 'Tasty Soft Chicken Security Chief', 'cohesive withdrawal Syrian Arab Republic', 'wireless bus Tuna', 'Gloves disintermediate', 'Forward', 'PUBLICA', NULL),
(7, 'Wyoming Analyst CSS', 'Integration Kyat', 'Sports Bedfordshire Monaco', 'architect', 'capacitor Papua New Guinea Tasty Concrete Shoes', 'PUBLICA', NULL),
(8, 'back-end', 'New Jersey silver', 'Manager', 'SMS', 'Implementation', 'PUBLICA', NULL),
(9, 'Rubber', 'knowledge user bypass', 'real-time', 'Brunei Dollar', 'Netherlands Antillian Guilder', 'PARTICULAR', NULL),
(10, 'schemas JSON', 'Ergonomic Borders', 'Investment Account', 'Intelligent Frozen Car', 'Cuban Peso Peso Convertible Director green', 'PARTICULAR', NULL);
CREATE MEMORY TABLE "PUBLIC"."HOSPITAL"(
    "ID" BIGINT NOT NULL,
    "NOME" VARCHAR(255)
);              
ALTER TABLE "PUBLIC"."HOSPITAL" ADD CONSTRAINT "PUBLIC"."PK_HOSPITAL" PRIMARY KEY("ID");      
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.HOSPITAL;               
INSERT INTO "PUBLIC"."HOSPITAL" VALUES
(1, 'Checking Account'),
(2, 'Albania Checking Account portals'),
(3, 'web-readiness ability e-markets'),
(4, 'Home Loan Account orchid Communications'),
(5, 'Checking Account Gorgeous Steel Bike'),
(6, 'Organic visualize'),
(7, 'Buckinghamshire Supervisor'),
(8, 'hack'),
(9, 'neural-net input'),
(10, 'system optical Digitized');  
CREATE MEMORY TABLE "PUBLIC"."POSTO_DE_SAUDE"(
    "ID" BIGINT NOT NULL,
    "C_NPJ" VARCHAR(255),
    "TELEFONE" VARCHAR(255),
    "C_EP" VARCHAR(255),
    "RAZAO_SOCIAL" VARCHAR(255),
    "NOME_FANTASIA" VARCHAR(255),
    "TIPO_UNIDADE_SAUDE" VARCHAR(255),
    "ENDERECO_ID" BIGINT
);       
ALTER TABLE "PUBLIC"."POSTO_DE_SAUDE" ADD CONSTRAINT "PUBLIC"."PK_POSTO_DE_SAUDE" PRIMARY KEY("ID");          
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.POSTO_DE_SAUDE;         
INSERT INTO "PUBLIC"."POSTO_DE_SAUDE" VALUES
(1, 'Awesome pixel Ball', 'radical Personal Loan Account SDD', 'invoice', 'Salad', 'drive', 'PARTICULAR', NULL),
(2, 'virtual', 'Bedfordshire mission-critical circuit', 'FTP Investment Account', 'Universal', 'collaboration', 'PUBLICA', NULL),
(3, 'Minnesota Optimized interface', 'transmitting Pizza', 'Books Crossing synthesizing', 'infrastructures Money Market Account Regional', 'Exclusive Home Loan Account', 'PARTICULAR', NULL),
(4, 'Handmade redundant Soft', 'synthesize', 'circuit', 'Health', 'payment Saint Barthelemy envisioneer', 'PARTICULAR', NULL),
(5, 'blue Fresh', 'open-source', 'Metal', 'firewall Senior Checking Account', 'intranet', 'PUBLICA', NULL),
(6, 'deploy secondary', 'Expanded', 'holistic Applications Handcrafted Rubber Sausages', 'Group', 'transparent Synergistic', 'PARTICULAR', NULL),
(7, 'Hong Kong cross-media', 'Incredible Steel Pizza', 'Kip action-items optical', 'invoice', 'Customer', 'PUBLICA', NULL),
(8, 'Analyst Djibouti Franc', 'Colorado', 'maximized', 'Danish Krone auxiliary', 'Bacon Unbranded Granite', 'PUBLICA', NULL),
(9, 'white Kiribati client-driven', 'Small Wooden Ball green', 'Auto Loan Account Incredible', 'Cloned Tools', 'Credit Card Account', 'PARTICULAR', NULL),
(10, 'Ramp Developer Senior', 'Fundamental Cheese', 'Credit Card Account', 'USB Junctions', 'Solutions parsing', 'PUBLICA', NULL); 
CREATE MEMORY TABLE "PUBLIC"."LEITO"(
    "ID" BIGINT NOT NULL,
    "IDENTIFICACAO" VARCHAR(255),
    "HOSPITAL_ID" BIGINT
);             
ALTER TABLE "PUBLIC"."LEITO" ADD CONSTRAINT "PUBLIC"."PK_LEITO" PRIMARY KEY("ID");            
-- 9 +/- SELECT COUNT(*) FROM PUBLIC.LEITO;   
INSERT INTO "PUBLIC"."LEITO" VALUES
(1, 'Home Principal Checking Account', 10),
(2, 'Concrete indexing Factors', 9),
(4, 'Supervisor Shirt invoice', NULL),
(5, 'stable', NULL),
(6, 'Games', NULL),
(7, 'SAS clear-thinking parsing', NULL),
(8, 'Bedfordshire', NULL),
(9, 'alarm Pike', NULL),
(10, 'Ball feed', NULL);           
CREATE MEMORY TABLE "PUBLIC"."FARMACIA"(
    "ID" BIGINT NOT NULL,
    "NOME" VARCHAR(255),
    "ENDERECO_ID" BIGINT
);   
ALTER TABLE "PUBLIC"."FARMACIA" ADD CONSTRAINT "PUBLIC"."PK_FARMACIA" PRIMARY KEY("ID");      
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.FARMACIA;               
INSERT INTO "PUBLIC"."FARMACIA" VALUES
(1, 'conglomeration California platforms', NULL),
(2, 'Checking Account Soft', NULL),
(3, 'interactive protocol', NULL),
(4, 'Triple-buffered Dominica 24/7', NULL),
(5, 'JSON Norway Czech Republic', NULL),
(6, 'models', NULL),
(7, 'yellow', NULL),
(8, 'Director', NULL),
(9, 'Cotton', NULL),
(10, 'infrastructures Engineer', NULL);  
CREATE MEMORY TABLE "PUBLIC"."MEDICAMENTO"(
    "ID" BIGINT NOT NULL,
    "NOME" VARCHAR(255),
    "FARMACIA_ID" BIGINT
);
ALTER TABLE "PUBLIC"."MEDICAMENTO" ADD CONSTRAINT "PUBLIC"."PK_MEDICAMENTO" PRIMARY KEY("ID");
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.MEDICAMENTO;            
INSERT INTO "PUBLIC"."MEDICAMENTO" VALUES
(1, 'District transform', NULL),
(2, 'benchmark', NULL),
(3, 'deploy Administrator Platinum', NULL),
(4, 'deliver', NULL),
(5, 'haptic niches', NULL),
(6, 'Auto Loan Account Movies', NULL),
(7, 'solid state cyan', NULL),
(8, 'EXE', NULL),
(9, 'Investor Groves Berkshire', NULL),
(10, 'Public-key Colorado software', NULL);        
CREATE MEMORY TABLE "PUBLIC"."AGENDA"(
    "ID" BIGINT NOT NULL,
    "DATA" VARCHAR(255),
    "MEDICO_ID" BIGINT,
    "FISIOTERAPEUTA_ID" BIGINT,
    "ENFERMEIRO_ID" BIGINT,
    "PSICOLOGO_ID" BIGINT
);             
ALTER TABLE "PUBLIC"."AGENDA" ADD CONSTRAINT "PUBLIC"."PK_AGENDA" PRIMARY KEY("ID");          
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.AGENDA; 
INSERT INTO "PUBLIC"."AGENDA" VALUES
(1, 'Health engage Gorgeous', NULL, NULL, NULL, NULL),
(2, 'transmitter', NULL, NULL, NULL, NULL),
(3, 'Fantastic Metal Sausages', NULL, NULL, NULL, NULL),
(4, 'Wooden flexibility', NULL, NULL, NULL, NULL),
(5, 'envisioneer', NULL, NULL, NULL, NULL),
(6, 'Buckinghamshire Baby Licensed Steel Bacon', NULL, NULL, NULL, NULL),
(7, 'Pitcairn Islands Ball', NULL, NULL, NULL, NULL),
(8, 'action-items Intelligent Cotton Tuna Research', NULL, NULL, NULL, NULL),
(9, 'Cloned Metrics Ergonomic', NULL, NULL, NULL, NULL),
(10, 'Automotive Lead', NULL, NULL, NULL, NULL);             
CREATE MEMORY TABLE "PUBLIC"."AGENDA_CONSULTA"(
    "ID" BIGINT NOT NULL,
    "DATA" VARCHAR(255)
);       
ALTER TABLE "PUBLIC"."AGENDA_CONSULTA" ADD CONSTRAINT "PUBLIC"."PK_AGENDA_CONSULTA" PRIMARY KEY("ID");        
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.AGENDA_CONSULTA;        
INSERT INTO "PUBLIC"."AGENDA_CONSULTA" VALUES
(1, 'Dynamic'),
(2, 'Savings Account'),
(3, 'Automated orchestrate cyan'),
(4, 'Baby'),
(5, 'Virtual payment'),
(6, 'Center'),
(7, 'Granite Generic Intelligent'),
(8, 'Games'),
(9, 'Home Loan Account'),
(10, 'Cayman Islands Dollar');             
CREATE MEMORY TABLE "PUBLIC"."AGENDA_EXAME"(
    "ID" BIGINT NOT NULL,
    "DATA" VARCHAR(255)
);          
ALTER TABLE "PUBLIC"."AGENDA_EXAME" ADD CONSTRAINT "PUBLIC"."PK_AGENDA_EXAME" PRIMARY KEY("ID");              
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.AGENDA_EXAME;           
INSERT INTO "PUBLIC"."AGENDA_EXAME" VALUES
(1, 'Checking Account users'),
(2, 'Central Bike red'),
(3, 'model'),
(4, 'purple'),
(5, 'South Dakota matrix impactful'),
(6, 'architectures'),
(7, 'Home Loan Account Data'),
(8, 'Saint Kitts and Nevis Center cross-platform'),
(9, 'Graphic Interface Soap bandwidth'),
(10, 'Down-sized driver workforce');        
CREATE MEMORY TABLE "PUBLIC"."PERFIL_ACESSO"(
    "ID" BIGINT NOT NULL,
    "NOME" VARCHAR(255)
);         
ALTER TABLE "PUBLIC"."PERFIL_ACESSO" ADD CONSTRAINT "PUBLIC"."PK_PERFIL_ACESSO" PRIMARY KEY("ID");            
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.PERFIL_ACESSO;          
INSERT INTO "PUBLIC"."PERFIL_ACESSO" VALUES
(1, 'Handmade Factors paradigms'),
(2, 'copy'),
(3, 'applications'),
(4, 'whiteboard'),
(5, '5th generation'),
(6, '24/7 explicit orchestration'),
(7, 'Cross-platform Kazakhstan National'),
(8, 'deposit American Samoa leading-edge'),
(9, 'red Buckinghamshire'),
(10, 'Avon maximize');            
CREATE MEMORY TABLE "PUBLIC"."PERMISSAO"(
    "ID" BIGINT NOT NULL,
    "NOME" VARCHAR(255),
    "PERFIL_ACESSO_ID" BIGINT
);             
ALTER TABLE "PUBLIC"."PERMISSAO" ADD CONSTRAINT "PUBLIC"."PK_PERMISSAO" PRIMARY KEY("ID");    
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.PERMISSAO;              
INSERT INTO "PUBLIC"."PERMISSAO" VALUES
(1, 'RAM Beauty Direct', NULL),
(2, 'Dale Argentine Peso', NULL),
(3, 'black Brand Plastic', NULL),
(4, 'SCSI', NULL),
(5, 'Oregon circuit', NULL),
(6, 'SCSI exploit customized', NULL),
(7, 'Directives Consultant', NULL),
(8, 'client-server Cambridgeshire Connecticut', NULL),
(9, 'Rand Loti', NULL),
(10, 'Fundamental', NULL);     
CREATE MEMORY TABLE "PUBLIC"."PRONTUARIO"(
    "ID" BIGINT NOT NULL,
    "PACIENTE_ID" BIGINT
);           
ALTER TABLE "PUBLIC"."PRONTUARIO" ADD CONSTRAINT "PUBLIC"."PK_PRONTUARIO" PRIMARY KEY("ID");  
-- 10 +/- SELECT COUNT(*) FROM PUBLIC.PRONTUARIO;             
INSERT INTO "PUBLIC"."PRONTUARIO" VALUES
(1, NULL),
(2, NULL),
(3, NULL),
(4, NULL),
(5, NULL),
(6, NULL),
(7, NULL),
(8, NULL),
(9, NULL),
(10, NULL);             
ALTER TABLE "PUBLIC"."ATENDIMENTO" ADD CONSTRAINT "PUBLIC"."UX_ATENDIMENTO_PROFISSIONAL_DE_SAUDE_ID" UNIQUE("PROFISSIONAL_DE_SAUDE_ID");      
ALTER TABLE "PUBLIC"."JHI_USER" ADD CONSTRAINT "PUBLIC"."UX_USER_LOGIN" UNIQUE("LOGIN");      
ALTER TABLE "PUBLIC"."PACIENTE" ADD CONSTRAINT "PUBLIC"."UX_PACIENTE_ENDERECO_ID" UNIQUE("ENDERECO_ID");      
ALTER TABLE "PUBLIC"."ATENDIMENTO" ADD CONSTRAINT "PUBLIC"."UX_ATENDIMENTO_AGENDA_ID" UNIQUE("AGENDA_ID");    
ALTER TABLE "PUBLIC"."PACIENTE" ADD CONSTRAINT "PUBLIC"."UX_PACIENTE_PERFIL_ACESSO_ID" UNIQUE("PERFIL_ACESSO_ID");            
ALTER TABLE "PUBLIC"."PROCEDIMENTO" ADD CONSTRAINT "PUBLIC"."UX_PROCEDIMENTO_ENDERECO_ID" UNIQUE("ENDERECO_ID");              
ALTER TABLE "PUBLIC"."CLINICA_MEDICA" ADD CONSTRAINT "PUBLIC"."UX_CLINICA_MEDICA_ENDERECO_ID" UNIQUE("ENDERECO_ID");          
ALTER TABLE "PUBLIC"."PROCEDIMENTO" ADD CONSTRAINT "PUBLIC"."UX_PROCEDIMENTO_AGENDA_ID" UNIQUE("AGENDA_ID");  
ALTER TABLE "PUBLIC"."FARMACIA" ADD CONSTRAINT "PUBLIC"."UX_FARMACIA_ENDERECO_ID" UNIQUE("ENDERECO_ID");      
ALTER TABLE "PUBLIC"."ATENDIMENTO" ADD CONSTRAINT "PUBLIC"."UX_ATENDIMENTO_PACIENTE_ID" UNIQUE("PACIENTE_ID");
ALTER TABLE "PUBLIC"."PRONTUARIO" ADD CONSTRAINT "PUBLIC"."UX_PRONTUARIO_PACIENTE_ID" UNIQUE("PACIENTE_ID");  
ALTER TABLE "PUBLIC"."LABORATORIO" ADD CONSTRAINT "PUBLIC"."UX_LABORATORIO_ENDERECO_ID" UNIQUE("ENDERECO_ID");
ALTER TABLE "PUBLIC"."JHI_USER" ADD CONSTRAINT "PUBLIC"."UX_USER_EMAIL" UNIQUE("EMAIL");      
ALTER TABLE "PUBLIC"."PROFISSIONAL" ADD CONSTRAINT "PUBLIC"."UX_PROFISSIONAL_PERFIL_ACESSO_ID" UNIQUE("PERFIL_ACESSO_ID");    
ALTER TABLE "PUBLIC"."ATENDIMENTO" ADD CONSTRAINT "PUBLIC"."UX_ATENDIMENTO_ENDERECO_ID" UNIQUE("ENDERECO_ID");
ALTER TABLE "PUBLIC"."PROCEDIMENTO" ADD CONSTRAINT "PUBLIC"."UX_PROCEDIMENTO_PROFISSIONAL_DE_SAUDE_ID" UNIQUE("PROFISSIONAL_DE_SAUDE_ID");    
ALTER TABLE "PUBLIC"."PROCEDIMENTO" ADD CONSTRAINT "PUBLIC"."UX_PROCEDIMENTO_PACIENTE_ID" UNIQUE("PACIENTE_ID");              
ALTER TABLE "PUBLIC"."POSTO_DE_SAUDE" ADD CONSTRAINT "PUBLIC"."UX_POSTO_DE_SAUDE_ENDERECO_ID" UNIQUE("ENDERECO_ID");          
ALTER TABLE "PUBLIC"."JHI_PERSISTENT_TOKEN" ADD CONSTRAINT "PUBLIC"."FK_USER_PERSISTENT_TOKEN" FOREIGN KEY("USER_ID") REFERENCES "PUBLIC"."JHI_USER"("ID") NOCHECK;           
ALTER TABLE "PUBLIC"."JHI_USER_AUTHORITY" ADD CONSTRAINT "PUBLIC"."FK_USER_ID" FOREIGN KEY("USER_ID") REFERENCES "PUBLIC"."JHI_USER"("ID") NOCHECK;           
ALTER TABLE "PUBLIC"."MEDICAMENTO" ADD CONSTRAINT "PUBLIC"."FK_MEDICAMENTO_FARMACIA_ID" FOREIGN KEY("FARMACIA_ID") REFERENCES "PUBLIC"."FARMACIA"("ID") NOCHECK;              
ALTER TABLE "PUBLIC"."JHI_PERSISTENT_AUDIT_EVT_DATA" ADD CONSTRAINT "PUBLIC"."FK_EVT_PERS_AUDIT_EVT_DATA" FOREIGN KEY("EVENT_ID") REFERENCES "PUBLIC"."JHI_PERSISTENT_AUDIT_EVENT"("EVENT_ID") NOCHECK;       
ALTER TABLE "PUBLIC"."VACINA" ADD CONSTRAINT "PUBLIC"."FK_VACINA_CARTAO_VACINA_ID" FOREIGN KEY("CARTAO_VACINA_ID") REFERENCES "PUBLIC"."CARTAO_VACINA"("ID") NOCHECK;         
ALTER TABLE "PUBLIC"."PACIENTE" ADD CONSTRAINT "PUBLIC"."FK_PACIENTE_ENDERECO_ID" FOREIGN KEY("ENDERECO_ID") REFERENCES "PUBLIC"."ENDERECO"("ID") NOCHECK;    
ALTER TABLE "PUBLIC"."PROFISSIONAL" ADD CONSTRAINT "PUBLIC"."FK_PROFISSIONAL_PERFIL_ACESSO_ID" FOREIGN KEY("PERFIL_ACESSO_ID") REFERENCES "PUBLIC"."PERFIL_ACESSO"("ID") NOCHECK;             
ALTER TABLE "PUBLIC"."JHI_USER_AUTHORITY" ADD CONSTRAINT "PUBLIC"."FK_AUTHORITY_NAME" FOREIGN KEY("AUTHORITY_NAME") REFERENCES "PUBLIC"."JHI_AUTHORITY"("NAME") NOCHECK;      
ALTER TABLE "PUBLIC"."PACIENTE" ADD CONSTRAINT "PUBLIC"."FK_PACIENTE_PERFIL_ACESSO_ID" FOREIGN KEY("PERFIL_ACESSO_ID") REFERENCES "PUBLIC"."PERFIL_ACESSO"("ID") NOCHECK;     
