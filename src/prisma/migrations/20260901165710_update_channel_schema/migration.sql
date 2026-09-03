/*
  Warnings:

  - You are about to drop the `_ChannelToWorkSpace` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `workspaceId` on the `Channel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_ChannelToWorkSpace" DROP CONSTRAINT "_ChannelToWorkSpace_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChannelToWorkSpace" DROP CONSTRAINT "_ChannelToWorkSpace_B_fkey";

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "workspaceId",
ADD COLUMN     "workspaceId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ChannelToWorkSpace";

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "WorkSpace"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
