# VaultNote - Secure Encrypted Notes

A zero-knowledge, end-to-end encrypted note-sharing application built with Next.js, PostgreSQL, and military-grade AES-256-GCM encryption.

## 🚀 Production Deployment

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Git

### 1. Environment Setup

Copy the example environment file:
```bash
cp .env.example .env
```

Configure your production environment variables:

```env
# PostgreSQL Database URL
DATABASE_URL="postgresql://username:password@host:port/database?schema=public&sslmode=require"

# Cron job secret (generate random string)
CRON_SECRET="your-secure-random-secret-here"

# Next.js URL
NEXTAUTH_URL="https://yourdomain.com"
```

### 2. Database Setup

```bash
# Install dependencies
pnpm install

# Generate Prisma client for PostgreSQL
pnpm prisma generate

# Create and run migrations
pnpm prisma migrate deploy
```

### 3. Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🏗️ Architecture

### Security Features
- **End-to-End Encryption**: AES-256-GCM encryption
- **Zero-Knowledge**: Server never sees plaintext
- **Client-Side Encryption**: All encryption happens in browser
- **Secure Metadata**: Titles and author info are encrypted server-side

### PostgreSQL Schema
```sql
-- Notes table with encrypted metadata
CREATE TABLE "Note" (
  id TEXT PRIMARY KEY,
  "titleEncrypted" TEXT,
  ciphertext TEXT NOT NULL,
  iv TEXT NOT NULL,
  "remainingReads" INTEGER,
  "expiresAt" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "consumedAt" TIMESTAMP,
  "destroyToken" TEXT UNIQUE,
  "isProtected" BOOLEAN DEFAULT false,
  "encryptedKey" TEXT,
  "keyIv" TEXT,
  salt TEXT,
  images TEXT,
  "authorNameEncrypted" TEXT,
  "authorEmailEncrypted" TEXT,
  "viewCount" INTEGER DEFAULT 0,
  "maxViews" INTEGER
);

CREATE INDEX "Note_expiresAt_idx" ON "Note"("expiresAt");
```

## 🔧 Development

```bash
# Install dependencies
pnpm install

# Start development server (requires PostgreSQL)
pnpm dev

# Database operations
pnpm prisma studio    # Open database browser
pnpm prisma migrate dev  # Create new migration
pnpm prisma db push     # Push schema changes
```

## 🚀 Deployment Options

### Vercel + Supabase (Recommended)
1. **Create Supabase project** → Get PostgreSQL URL
2. **Deploy to Vercel:**
   - Connect GitHub repository
   - Set environment variables:
     ```
     DATABASE_URL=postgresql://...
     CRON_SECRET=your-random-secret
     NEXTAUTH_URL=https://yourdomain.vercel.app
     ```
3. **Deploy!** 🚀

### Railway (All-in-One)
1. **Connect GitHub** repository
2. **Add PostgreSQL** service
3. **Set environment** variables
4. **Deploy** automatically

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Manual Server
```bash
# Using PM2
npm install -g pm2
pm2 start npm --name "vaultnote" -- start
pm2 startup
pm2 save
```

## 🔒 Security Best Practices

- Use HTTPS in production
- Rotate database credentials regularly
- Monitor for security vulnerabilities
- Keep dependencies updated
- Use environment variables for secrets
- Enable PostgreSQL SSL in production

## 📊 Features

- ✅ End-to-end encrypted notes
- ✅ Password-protected notes
- ✅ Self-destructing notes
- ✅ Image attachments
- ✅ View tracking and limits
- ✅ Encrypted metadata (titles, authors)
- ✅ Responsive design
- ✅ Dark theme
- ✅ PostgreSQL production-ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Made with ❤️ in Switzerland** 🇨🇭
- 🚫 **No Tracking**: Keine Cookies, kein Analytics

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL mit Prisma ORM
- **Encryption**: Web Crypto API (AES-GCM)
- **Styling**: TailwindCSS mit Inter Font

## Lokale Entwicklung

### Voraussetzungen

- Node.js 18+
- pnpm (empfohlen) oder npm/yarn
- PostgreSQL (lokal oder Cloud)

### Setup

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd vaultnote
   ```

2. **Abhängigkeiten installieren**
   ```bash
   pnpm install
   ```

3. **Datenbank einrichten**

   **Option A: Lokale PostgreSQL**
   - PostgreSQL installieren (z.B. via Homebrew auf macOS: `brew install postgresql`)
   - Datenbank erstellen: `createdb vaultnote`
   - Verbindung: `postgresql://username:password@localhost:5432/vaultnote`

   **Option B: Cloud Database (empfohlen für Produktion)**
   - Supabase: https://supabase.com
   - Neon: https://neon.tech
   - Railway: https://railway.app

4. **Umgebungsvariablen**
   ```bash
   cp .env.example .env.local
   ```
   Bearbeite `.env.local` und setze `DATABASE_URL`:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/vaultnote?schema=public"
   ```

5. **Datenbank migrieren**
   ```bash
   pnpm db:migrate
   ```

6. **Entwicklungsserver starten**
   ```bash
   pnpm dev
   ```
   Öffne http://localhost:3000

## API Endpoints

### POST /api/notes
Erstellt eine neue verschlüsselte Note.

**Request Body:**
```json
{
  "ciphertext": "base64-encoded",
  "iv": "base64-encoded",
  "maxReads": 1,
  "duration": 60
}
```

**Response:**
```json
{
  "id": "note-id"
}
```

### GET /api/notes/{id}
Holt eine Note zum Entschlüsseln.

**Response:**
```json
{
  "ciphertext": "base64-encoded",
  "iv": "base64-encoded",
  "remainingReadsPreview": 0
}
```

### GET /api/cron/cleanup?auth=secret
Löscht abgelaufene Notizen (für Cron-Jobs).

## Datenmodell

```prisma
model Note {
  id              String   @id @default(cuid())
  ciphertext      Bytes
  iv              Bytes
  remainingReads  Int?
  expiresAt       DateTime?
  createdAt       DateTime @default(now())
  consumedAt      DateTime?
  destroyToken    String?  @unique
  @@index([expiresAt])
}
```

## Security

- **CSP**: Strict Content Security Policy
- **Rate Limiting**: 100 Requests/15min per IP
- **HTTPS Only**: Erzwingt sichere Verbindungen
- **Input Validation**: Zod Schemas
- **No Cookies**: Kein Tracking oder Sessions

## Cron Jobs

Richte einen Cron-Job ein, um abgelaufene Notizen zu löschen:

```bash
# Jede Stunde
0 * * * * curl "https://yourdomain.com/api/cron/cleanup?auth=YOUR_SECRET"
```

Setze `CRON_SECRET` in den Umgebungsvariablen.

## Tests

### E2E Tests mit Playwright

```bash
pnpm test:e2e
```

Der Test:
1. Erstellt eine neue Note
2. Öffnet den Share-Link
3. Verifiziert, dass der Inhalt entschlüsselt wird
4. Prüft, dass die Note nach dem Lesen gelöscht wurde

## Deployment (Produktion)

### 1. Datenbank einrichten

**Empfohlen: Supabase (kostenlos)**
- Gehe zu [supabase.com](https://supabase.com)
- Erstelle ein neues Projekt
- Gehe zu Settings → Database → Connection string
- Kopiere die URI und setze sie als `DATABASE_URL`

**Alternativen:**
- **Neon**: https://neon.tech (kostenlos)
- **Railway**: https://railway.app
- **PlanetScale**: https://planetscale.com

### 2. Vercel Deployment (empfohlen)

1. **Repository pushen**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Vercel einrichten**
   - Gehe zu [vercel.com](https://vercel.com)
   - Importiere dein GitHub Repository
   - Setze die Environment Variables:
     ```
     DATABASE_URL=postgresql://...
     CRON_SECRET=dein-sicherer-secret-hier
     ```
   - Deploy!

3. **Datenbank migrieren**
   Nach dem ersten Deploy, führe die Migration aus:
   ```bash
   npx prisma migrate deploy
   ```

### 3. Cron Jobs (automatisches Cleanup)

Vercel führt automatisch jede Stunde das Cleanup-Script aus (siehe `vercel.json`).

**Alternativ:** Verwende einen externen Cron-Service wie:
- [Cron-Job.org](https://cron-job.org)
- [EasyCron](https://www.easycron.com)

URL: `https://yourdomain.com/api/cron/cleanup?auth=DEIN_CRON_SECRET`

### 4. Domain & SSL

Vercel stellt automatisch HTTPS zur Verfügung. Optional kannst du eine Custom Domain hinzufügen.

### 5. Monitoring

Für Produktion, erwäge:
- **Analytics**: Selbst-gehostete Lösungen (keine Cookies)
- **Error Monitoring**: Sentry oder ähnliche
- **Uptime Monitoring**: UptimeRobot oder ähnliche

## Security in Produktion

- ✅ **CSP**: Strenge Content Security Policy
- ✅ **Rate Limiting**: 100 req/15min pro IP
- ✅ **HTTPS Only**: Automatisch durch Vercel
- ✅ **Input Validation**: Zod-Schemas
- ✅ **Zero-Knowledge**: Schlüssel verlässt niemals den Client
- ✅ **Auto-Destruct**: Notizen werden automatisch gelöscht

## Contributing

Issues und Pull Requests sind willkommen!

## License

MIT License
