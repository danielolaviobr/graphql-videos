/*
  Warnings:

  - Added the required column `expiresAt` to the `Tokens` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "usersId" TEXT NOT NULL,
    FOREIGN KEY ("usersId") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Tokens" ("id", "token", "usersId") SELECT "id", "token", "usersId" FROM "Tokens";
DROP TABLE "Tokens";
ALTER TABLE "new_Tokens" RENAME TO "Tokens";
CREATE UNIQUE INDEX "Tokens.token_unique" ON "Tokens"("token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
