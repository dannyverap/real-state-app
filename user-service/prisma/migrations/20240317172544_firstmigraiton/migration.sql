-- CreateEnum
CREATE TYPE "Role" AS ENUM ('LANDLORD', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "user_type" "Role" NOT NULL DEFAULT 'LANDLORD',
    "verification_code" DOUBLE PRECISION,
    "expiry" TIMESTAMP(3),
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "first_name" TEXT,
    "last_name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_mail_key" ON "User"("mail");
