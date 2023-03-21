-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
