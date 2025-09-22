-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ciphertext" BLOB NOT NULL,
    "iv" BLOB NOT NULL,
    "remainingReads" INTEGER,
    "expiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consumedAt" DATETIME,
    "destroyToken" TEXT,
    "isProtected" BOOLEAN DEFAULT false,
    "encryptedKey" BLOB,
    "keyIv" BLOB,
    "salt" BLOB,
    "images" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Note_destroyToken_key" ON "Note"("destroyToken");

-- CreateIndex
CREATE INDEX "Note_expiresAt_idx" ON "Note"("expiresAt");
