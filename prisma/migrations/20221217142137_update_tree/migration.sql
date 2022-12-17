/*
  Warnings:

  - The primary key for the `Tree` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Tree" DROP CONSTRAINT "Tree_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tree_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tree_id_seq";
