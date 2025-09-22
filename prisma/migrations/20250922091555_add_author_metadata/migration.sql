-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
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
    "images" TEXT,
    "authorName" TEXT,
    "authorEmail" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "maxViews" INTEGER
);
INSERT INTO "new_Note" ("ciphertext", "consumedAt", "createdAt", "destroyToken", "encryptedKey", "expiresAt", "id", "images", "isProtected", "iv", "keyIv", "remainingReads", "salt") SELECT "ciphertext", "consumedAt", "createdAt", "destroyToken", "encryptedKey", "expiresAt", "id", "images", "isProtected", "iv", "keyIv", "remainingReads", "salt" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
CREATE UNIQUE INDEX "Note_destroyToken_key" ON "Note"("destroyToken");
CREATE INDEX "Note_expiresAt_idx" ON "Note"("expiresAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
