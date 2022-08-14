CURDIR := $(shell pwd)

DOCKER_COMPOSE := docker-compose
DOCKER_COMPOSE_FILE := docker-compose.yml
STOP := stop
START := up -d --build

stop-server:
	$(DOCKER_COMPOSE) -f $(CURDIR)/$(DOCKER_COMPOSE_FILE) $(STOP)
start-server:
	$(DOCKER_COMPOSE) -f $(CURDIR)/$(DOCKER_COMPOSE_FILE) $(START)
docker-status:
	docker ps
start: start-server
stop: stop-server
restart: stop start docker-status