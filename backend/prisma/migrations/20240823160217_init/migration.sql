-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "details" JSONB,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);
