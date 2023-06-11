create database fluxohealth;
use fluxohealth;

create table Plano(
	idPlano int primary key auto_increment,
    nomePlano varchar(45),
    descricaoPlano varchar(255),
    valor decimal(8,2) check (valor > 0)
);

insert into Plano
values (null, 'Básico', 'Plano básico contendo poucas vantagens', 2500),
	   (null, 'Premium', 'Contém diversas vantagens ao adquirir esse plano', 4000);



create table Hospital(
	idHosp int primary key auto_increment,
    nomeHosp varchar(45),
    cepHosp char(9),
    numHosp char(6),
    loginHosp varchar(60),
    senhaHosp varchar(45),
    cnpjHosp char(14),
    dataContratacao date,
    fkPlano int,
	foreign key (fkPlano) references Plano(idPlano)
);

insert into Hospital
values (null, 'Hospital 1', '58013-135', '150a', 'hospital1@gmail.com', 'hospital123', '111111', '2023-05-25', 1), 
	   (null, 'Hospital 2', '59146-310', '526', 'hospital2@gmail.com', '12345', '2222222', '2023-04-24', 2);



create table trocaDeSenhas(
	idTroca int primary key auto_increment,
	concluido tinyint,
    dataHora datetime,
    fkHosp int,
    foreign key (fkHosp) references Hospital(idHosp)
);


create table Sala(
	idSala int primary key auto_increment,
    nomeSala varchar(45),
    descricaoSala varchar(255),
	fkHosp int,
    foreign key (fkHosp) references Hospital(idHosp)
);

insert into Sala
values (null, 'Medicação - S1', 'Sala de Medicação', 1),
	   (null, 'Medicação - S2', 'Sala de medicação', 1),
	   (null, 'Enfermaria', 'Sala de diagnósticos e medicação', 1),
       (null, 'Pronto-socorro', 'Sala para atendimentos urgentes/emergenciais.', 1),
       (null, 'Berçario', 'Sala para bebês recém nascidos', 1);

       
create table Poltrona(
	idPoltrona int primary key auto_increment,
    nomePoltrona varchar(45),
    fkSala int,
    foreign key (fkSala) references Sala(idSala)
);

insert into Poltrona
values (null, 'Poltrona 1', 1),
	   (null, 'Poltrona 2', 1),
       (null, 'Poltrona 3', 1),
       (null, 'Poltrona 4', 1),
       
       (null, 'Poltrona 1', 2),
	   (null, 'Poltrona 2', 2),
       
       (null, 'Poltrona 1', 3),
	   (null, 'Poltrona 2', 3),
       
       (null, 'Poltrona 1', 4),
	   (null, 'Poltrona 2', 4),
       
       (null, 'Poltrona 1', 5),
	   (null, 'Poltrona 2', 5);
       

       
create table TipoSensor(
	idTipo int primary key auto_increment,
    tipo varchar(45),
    tipoDados varchar(45)
);

insert into TipoSensor
values (null, 'Temperatura', 'Graus Celsius'),
	   (null, 'Bloqueio', 'Binário');



create table Sensor(
	idSensor int primary key auto_increment,
    modelo varchar(45),
    fkTipoSensor int,
    fkPoltrona int,
    foreign key (fkTipoSensor) references TipoSensor(idTipo),
    foreign key (fkPoltrona) references Poltrona(idPoltrona)
);

insert into Sensor
values (null, 'LM35', 1, 1),
	   (null, 'TCRT5000', 2, 1),
       
	   (null, 'LM35', 1, 2),
       (null, 'TCRT5000', 2, 2),
       
	   (null, 'LM35', 1, 3),
       (null, 'TCRT5000', 2, 3),
       
	   (null, 'LM35', 1, 4),
       (null, 'TCRT5000', 2, 4),
       
	   (null, 'LM35', 1, 5),
       (null, 'TCRT5000', 2, 5),
       
	   (null, 'LM35', 1, 6),
       (null, 'TCRT5000', 2, 6),
       
	   (null, 'LM35', 1, 7),
       (null, 'TCRT5000', 2, 7),
       
	   (null, 'LM35', 1, 8),
       (null, 'TCRT5000', 2, 8),
       
	   (null, 'LM35', 1, 9),
       (null, 'TCRT5000', 2, 9),
       
       (null, 'LM35', 1, 10),
       (null, 'TCRT5000', 2, 10),
       
       (null, 'LM35', 1, 11),
       (null, 'TCRT5000', 2, 11),
       
       (null, 'LM35', 1, 12),
       (null, 'TCRT5000', 2, 12);


clear
create table Registro(
	idRegistro int,
    dataHora datetime,
    valor decimal(4,2),
    fkSensor int,
    foreign key (fkSensor) references Sensor(idSensor),
	primary key (idRegistro, fkSensor, dataHora)
);

insert into Registro (idRegistro, fkSensor, dataHora, valor)
values (1, 1, now(), 38.0),
	   (1, 2, now(), 1),
       (2, 3, now(), 27.0),
       (2, 4, now(), 1),
       (3, 5, now(), 30.0),
       (3, 6, now(), 1),
       (4, 7, now(), 0.0),
       (4, 8, now(), 0),
       
       (5, 9, now(), 0),
       (5, 10, now(), 0),
       (6, 11, now(), 35),
       (6, 12, now(), 1),
       
       (7, 13, now(), 31),
       (7, 14, now(), 1),
       (8, 15, now(), 0),
       (8, 16, now(), 0),
       
       (9, 17, now(), 35),
       (9, 18, now(), 1),
       (10, 19, now(), 0),
       (10, 20, now(), 0),
       
       (11, 21, now(), 31),
       (11, 22, now(), 1),
       (12, 23, now(), 31),
       (12, 24, now(), 1);
 


-- INSERINDO DADOS NA SALA 1 (MEdicação - S1)
insert into Registro (idRegistro, fkSensor, dataHora, valor)
values (1, 1, now(), 38.0),
	   (1, 2, now(), 1),
       
       (2, 3, now(), 36.5),
       (2, 4, now(), 1),
       
       (3, 5, now(), 41),
       (3, 6, now(), 1);
       
      
       
-- Inserindo dados em todas as salas
insert into Registro (idRegistro, fkSensor, dataHora, valor)
values (1, 1, now(), round((RAND() * 7 + 33), 1)),
	   (1, 2, now(), 1),
       (2, 3, now(), round((RAND() * 7 + 33), 1)),
       (2, 4, now(), 1),
       (3, 5, now(), round((RAND() * 7 + 33), 1)),
       (3, 6, now(), 1),
       
       (5, 9, now(), 0),
       (5, 10, now(), 0),
       (6, 11, now(), round((RAND() * 7 + 33), 1)),
       (6, 12, now(), 1),
       
       (7, 13, now(), round((RAND() * 7 + 33), 1)),
       (7, 14, now(), 1),
       (8, 15, now(), 0),
       (8, 16, now(), 0),
       
       (9, 17, now(), round((RAND() * 7 + 33), 1)),
       (9, 18, now(), 1),
       (10, 19, now(), 0),
       (10, 20, now(), 0),
       
       (11, 21, now(), round((RAND() * 7 + 33), 1)),
       (11, 22, now(), 1),
       (12, 23, now(), round((RAND() * 7 + 33), 1)),
       (12, 24, now(), 1);
       
    
       
       
       
       

     