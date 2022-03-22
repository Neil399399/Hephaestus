#docker
local:
	source ./scripts/.env_local ; \
	docker-compose -f ./deployment/docker-compose.yaml up -d postgres adminer;

local-down:
	source ./scripts/.env_local ; \
	docker-compose -f ./deployment/docker-compose.yaml down;

#server
build:
	cd domain && go build

test:
	cd domain && go run main.go log