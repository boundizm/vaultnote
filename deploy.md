# VaultNote Ubuntu Server Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Server Prerequisites
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm

# Install PM2 for process management
npm install -g pm2

# Install Nginx (optional, for reverse proxy)
sudo apt install nginx -y
```

### 2. Clone Repository
```bash
# Clone from GitHub
git clone https://github.com/YOUR_USERNAME/vaultnote.git
cd vaultnote

# Install dependencies
pnpm install
```

### 3. Environment Setup
```bash
# Copy environment file
cp .env.example .env

# Edit environment variables
nano .env
```

**Required .env variables:**
```env
NODE_ENV=production
DATABASE_URL="postgresql://user:pass@host:port/db?sslmode=require"
CRON_SECRET="your-secure-random-secret-here"
NEXTAUTH_URL="https://yourdomain.com"
```

### 4. Database Setup
```bash
# Generate Prisma client
pnpm prisma generate

# Deploy database schema
pnpm prisma migrate deploy
# OR for existing DB:
pnpm prisma db push
```

### 5. Build Application
```bash
# Build for production
pnpm build
```

### 6. Start Application
```bash
# Option A: Direct start
pnpm start

# Option B: PM2 (recommended)
pm2 start npm --name "vaultnote" -- start
pm2 startup
pm2 save
```

### 7. Nginx Configuration (Optional)
```nginx
# /etc/nginx/sites-available/vaultnote
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/vaultnote /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Install SSL with Certbot
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

## 🔧 Maintenance Commands

```bash
# View logs
pm2 logs vaultnote

# Restart application
pm2 restart vaultnote

# Update application
git pull origin main
pnpm install
pnpm build
pm2 restart vaultnote

# Database operations
pnpm prisma studio  # Database browser (localhost:5555)
pnpm prisma migrate deploy  # Apply new migrations
```

## 🔒 Security Checklist

- [ ] Use HTTPS in production
- [ ] Set strong DATABASE_URL with SSL
- [ ] Generate secure CRON_SECRET
- [ ] Configure firewall (UFW)
- [ ] Regular system updates
- [ ] Monitor logs for security issues

## 🚨 Troubleshooting

**Build fails:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
pnpm install
pnpm build
```

**Database connection issues:**
```bash
# Test connection
pnpm prisma db pull
```

**Port already in use:**
```bash
# Find process using port 3000
sudo lsof -i :3000
# Kill process
sudo kill -9 PID
```
