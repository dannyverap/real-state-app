start_db:
	docker compose up -d

stop_db:
	docker compose down

create_migration:
	npx prisma migrate dev --name $(n)

server:
	yarn run dev

build:
	yarn build

server_prod:
	yarn run start

.PHONEY: start_db stop_db server migrate migrate-down create_migration