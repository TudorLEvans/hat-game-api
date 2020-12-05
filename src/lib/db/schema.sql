CREATE TABLE players (
userId integer primary key autoincrement not null,
username text not null,
sessionId text not null,
score integer default 0,
inSession boolean default false,
createdItems boolean default false,
takenTurn boolean default false,
team text
);
CREATE TABLE sessions (
sessionId text primary key not null,
round integer default 0,
redScore integer default 0,
blueScore integer default 0,
currentTeam text
);
CREATE TABLE hat (
hatId integer primary key autoincrement not null,
sessionId text not null,
entryText text not null,
userId integer
);
CREATE TABLE turns (
turnId integer primary key autoincrement not null,
hatId integer not null,
userId integer not null,
sessionId integer not null,
round integer not null,
startTime timestamp with time zone,
endTime timestamp with time zone
);