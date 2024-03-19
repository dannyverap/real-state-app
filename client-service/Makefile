start_db:
	docker compose up -d

stop_db:
	docker compose down

server:
	yarn run dev

create_migration:
	db-migrate create $(n) --sql-file 

migrate_up:
	db-migrate up

migrate_down:
	db-migrate down

.PHONY: start_db stop_db server migrate migra-down create_migration
