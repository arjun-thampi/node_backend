-- AlterTable
ALTER TABLE "libManage" ADD COLUMN     "book_returned" BOOLEAN DEFAULT false,
ADD COLUMN     "book_taken" BOOLEAN DEFAULT false,
ADD COLUMN     "bookreturned_at" TIMESTAMP(3),
ADD COLUMN     "booktaken_at" TIMESTAMP(3);
