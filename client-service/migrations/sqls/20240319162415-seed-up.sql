CREATE TABLE "clients" (
    "user_id" bigserial PRIMARY KEY,
    "phone" varchar NOT NULL,
    "mail" varchar UNIQUE NOT NULL,
    "first_name" varchar,
    "last_name" varchar,
    "profile_pic" text,
    "verified" boolean NOT NULL DEFAULT FALSE,
    "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE INDEX ON "clients" ("mail")