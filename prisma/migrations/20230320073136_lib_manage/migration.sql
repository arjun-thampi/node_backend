-- CreateTable
CREATE TABLE "libManage" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "book_id" UUID NOT NULL,

    CONSTRAINT "libManage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "libManage" ADD CONSTRAINT "libManage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "libManage" ADD CONSTRAINT "libManage_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
