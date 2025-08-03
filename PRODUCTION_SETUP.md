# Production Setup Guide

## Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb://your-production-mongodb-uri
GOOGLE_MAPS_API=your_actual_google_maps_api_key
JWT_SECRET=your_super_secure_jwt_secret_key
```

### Frontend (.env)
```env
VITE_BASE_URL=https://your-backend-domain.com
VITE_GOOGLE_MAPS_API=your_actual_google_maps_api_key
```

## Google Maps API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
   - Distance Matrix API
4. Create credentials (API Key)
5. Restrict the API key to your domain
6. Add the API key to both backend and frontend environment variables

## Database Setup

### MongoDB Atlas (Recommended for Production)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Set up database access (username/password)
4. Set up network access (IP whitelist)
5. Get connection string and add to `MONGODB_URI`

### Local MongoDB
```bash
# Install MongoDB
# Start MongoDB service
mongod --dbpath /path/to/data/db
```

## Deployment

### Backend Deployment (Node.js/Express)

#### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Start with PM2
pm2 start server.js --name "uber-backend"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

#### Using Docker
```dockerfile
# Dockerfile for Backend
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
```

### Frontend Deployment (React/Vite)

#### Using Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

#### Using Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Set environment variables in Netlify dashboard

#### Using Docker
```dockerfile
# Dockerfile for Frontend
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

## Security Checklist

- [ ] Set strong JWT secret
- [ ] Configure CORS properly for production domains
- [ ] Set up HTTPS/SSL certificates
- [ ] Configure Google Maps API key restrictions
- [ ] Set up proper MongoDB authentication
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging
- [ ] Configure backup strategies

## Monitoring

### Backend Monitoring
```bash
# Using PM2
pm2 monit

# Using PM2 logs
pm2 logs uber-backend
```

### Database Monitoring
- Set up MongoDB Atlas monitoring
- Configure alerts for connection issues
- Monitor query performance

## Performance Optimization

### Backend
- Enable compression middleware
- Implement caching strategies
- Optimize database queries
- Use connection pooling

### Frontend
- Enable code splitting
- Optimize bundle size
- Implement lazy loading
- Use CDN for static assets

## Troubleshooting

### Common Issues

1. **Google Maps API Errors**
   - Check API key configuration
   - Verify API is enabled
   - Check domain restrictions

2. **Database Connection Issues**
   - Verify MongoDB URI
   - Check network connectivity
   - Verify authentication credentials

3. **CORS Errors**
   - Check CORS configuration
   - Verify frontend URL in backend CORS settings

4. **JWT Token Issues**
   - Verify JWT secret is set
   - Check token expiration
   - Verify token format

## Backup and Recovery

### Database Backup
```bash
# MongoDB backup
mongodump --uri="your-mongodb-uri" --out=/backup/path

# MongoDB restore
mongorestore --uri="your-mongodb-uri" /backup/path
```

### Application Backup
- Use Git for code versioning
- Set up automated deployments
- Configure environment variable backups

## SSL/HTTPS Setup

### Using Let's Encrypt
```bash
# Install Certbot
sudo apt-get install certbot

# Get SSL certificate
sudo certbot certonly --standalone -d your-domain.com

# Configure nginx with SSL
# (Add SSL configuration to nginx.conf)
```

## Load Balancing

### Using Nginx
```nginx
upstream backend {
    server backend1:4000;
    server backend2:4000;
    server backend3:4000;
}

server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Environment-Specific Configurations

### Development
- Use local MongoDB
- Enable detailed error messages
- Use development API keys

### Staging
- Use staging database
- Enable limited error details
- Use staging API keys

### Production
- Use production database
- Disable error details
- Use production API keys
- Enable monitoring and logging 