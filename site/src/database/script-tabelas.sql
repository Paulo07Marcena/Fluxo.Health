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

create table trocaDeSenhas(
	idTroca int primary key auto_increment,
	concluido tinyint,
    dataHora datetime,
    fkHosp int,
    foreign key (fkHosp) references hospital(idHosp)
);

create table Sala(
	idSala int primary key auto_increment,
    nomeSala varchar(45),
    descricaoSala varchar(255),
	fkHosp int,
    foreign key (fkHosp) references Hospital(idHosp)
);

create table Poltrona(
	idPoltrona int primary key auto_increment,
    nomePoltrona varchar(45),
    fkSala int,
    foreign key (fkSala) references Sala(idSala)
);

create table TipoSensor(
	idTipo int primary key auto_increment,
    tipo varchar(45),
    tipoDados varchar(45)
);

create table Sensor(
	idSensor int primary key auto_increment,
    modelo varchar(45),
    fkTipoSensor int,
    fkPoltrona int,
    foreign key (fkTipoSensor) references TipoSensor(idTipo),
    foreign key (fkPoltrona) references Poltrona(idPoltrona)
);

create table Registro(
	idRegistro int,
    dataHora datetime,
    valor decimal(4,2),
    fkSensor int,
    foreign key (fkSensor) references Sensor(idSensor),
	primary key (idRegistro,fkSensor)
);
