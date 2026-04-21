-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "priority" TEXT NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);
