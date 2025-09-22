# VaultNote

Privacy-first, Zero-Knowledge Notepad mit Self-Destruct. Erstelle sichere Notizen, die nach dem Lesen oder Ablauf automatisch gelöscht werden.

## Features

- 🔒 **Zero-Knowledge Encryption**: Clientseitige Verschlüsselung, Schlüssel verlässt niemals den Browser
- ⏰ **Self-Destruct**: Notizen können nach Zeit oder Anzahl der Lesevorgänge gelöscht werden
- 📝 **Markdown Support**: Rich text editing
- 🌙 **Dark/Light Mode**: Automatische Theme-Erkennung
- 🇨🇭 **Swiss Hosting**: Gehostet in der Schweiz mit strengen Datenschutzgesetzen
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
