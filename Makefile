# Path and Variables
SHELL := /bin/bash
AUTH := neil399399
PROJECT := hephaestus 
REPO := github.com/${AUTH}/${PROJECT}
ROOT_DIR := $(CURDIR)
OUTPUT_DIR := ${ROOT_DIR}/bin

DATABASE_URL :=${DATABASE_URL}

deps:
	brew install golang-migrate;

#migrate
migrate:
	source ./scripts/.env_local ; \
	migrate -verbose -source file://${ROOT_DIR}/deployment/migrations -database ${DATABASE_URL} up;

#docker
postgres:
	source ./scripts/.env_local ; \
	docker-compose -f ./deployment/docker-compose.yaml up -d postgres ; \
	sleep 2

adminer:
	source ./scripts/.env_local ; \
	docker-compose -f ./deployment/docker-compose.yaml up -d adminer ; \
	sleep 2

#deploy
local: postgres adminer migrate;

local-down:
	source ./scripts/.env_local ; \
	docker-compose -f ./deployment/docker-compose.yaml down;

#server
build:
	cd domain && go build

test:
	cd domain && go run main.go log