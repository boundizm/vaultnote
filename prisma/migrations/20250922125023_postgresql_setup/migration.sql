-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "titleEncrypted" TEXT,
    "ciphertext" TEXT NOT NULL,
    "iv" TEXT NOT NULL,
    "remainingReads" INTEGER,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consumedAt" TIMESTAMP(3),
    "destroyToken" TEXT,
    "isProtected" BOOLEAN DEFAULT false,
    "encryptedKey" TEXT,
    "keyIv" TEXT,
    "salt" TEXT,
    "images" TEXT,
    "authorNameEncrypted" TEXT,
    "authorEmailEncrypted" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "maxViews" INTEGER,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Note_destroyToken_key" ON "Note"("destroyToken");

-- CreateIndex
CREATE INDEX "Note_expiresAt_idx" ON "Note"("expiresAt");
