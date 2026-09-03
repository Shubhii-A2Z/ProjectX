/*
  Warnings:

  - A unique constraint covering the columns `[joinCode]` on the table `WorkSpace` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WorkSpace_joinCode_key" ON "WorkSpace"("joinCode");
