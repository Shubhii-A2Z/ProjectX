/*
  Warnings:

  - You are about to drop the column `messageId` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `joinedWorkspaceId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sentMessageId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `channelId` on the `WorkSpace` table. All the data in the column will be lost.
  - You are about to drop the column `membersId` on the `WorkSpace` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `WorkSpace` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "messageId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "joinedWorkspaceId",
DROP COLUMN "sentMessageId",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "WorkSpace" DROP COLUMN "channelId",
DROP COLUMN "membersId",
DROP COLUMN "role";
