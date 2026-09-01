-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "joinedWorkspaceId" INTEGER[],
ADD COLUMN     "sentMessageId" INTEGER[];

-- CreateTable
CREATE TABLE "Channel" (
    "_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "messageId" INTEGER[],
    "workspaceId" INTEGER[],

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Message" (
    "_id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "channelId" INTEGER NOT NULL,
    "senderId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "WorkSpace" (
    "_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT DEFAULT '',
    "membersId" INTEGER[],
    "role" "Role" NOT NULL,
    "joinCode" TEXT NOT NULL,
    "channelId" INTEGER[],

    CONSTRAINT "WorkSpace_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "_ChannelToWorkSpace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ChannelToWorkSpace_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_UserToWorkSpace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserToWorkSpace_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkSpace_name_key" ON "WorkSpace"("name");

-- CreateIndex
CREATE INDEX "_ChannelToWorkSpace_B_index" ON "_ChannelToWorkSpace"("B");

-- CreateIndex
CREATE INDEX "_UserToWorkSpace_B_index" ON "_UserToWorkSpace"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelToWorkSpace" ADD CONSTRAINT "_ChannelToWorkSpace_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelToWorkSpace" ADD CONSTRAINT "_ChannelToWorkSpace_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkSpace"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWorkSpace" ADD CONSTRAINT "_UserToWorkSpace_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWorkSpace" ADD CONSTRAINT "_UserToWorkSpace_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkSpace"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
