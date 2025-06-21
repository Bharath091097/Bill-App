# Bill/Receipt Generator - Ubuntu Local Deployment

## 🐧 Ubuntu System Requirements
- Ubuntu 18.04 LTS or later
- Minimum 2GB RAM, 1GB free disk space
- Internet connection for initial setup

## ✨ App Features
- 📱 Fully responsive (mobile, tablet, desktop)
- 💰 Indian currency (₹) support  
- 🖼️ Company logo upload
- 📝 Inline editing for all fields
- 🧾 Multiple items with auto-calculation
- 🖨️ Print functionality
- 💻 Runs completely offline after setup

## 🚀 Quick Start

### Step 1: Install Node.js and npm
```bash
# Update system packages
sudo apt update

# Install Node.js (v18 LTS recommended)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x or higher
```

### Step 2: Install Yarn (Package Manager)
```bash
# Install Yarn globally
sudo npm install -g yarn

# Verify installation
yarn --version
```

### Step 3: Download and Setup Project
```bash
# Create project directory
mkdir ~/bill-generator
cd ~/bill-generator

# Copy your source code here (frontend folder contents)
# Then install dependencies
yarn install
```

### Step 4: Run the Application
```bash
# Start development server
yarn start

# Your app will open automatically at:
# http://localhost:3000
```

## 🔧 Production Build (Optional)
```bash
# Create optimized production build
yarn build

# Serve production build locally
sudo npm install -g serve
serve -s build -l 3000
```

## 📋 Project Structure
```
bill-generator/
├── package.json          # Dependencies & scripts
├── tailwind.config.js    # Tailwind CSS config
├── postcss.config.js     # PostCSS config
├── public/              # Static files
├── src/
│   ├── App.js           # Main application
│   ├── App.css          # Styles
│   ├── index.js         # Entry point
│   └── index.css        # Global styles
└── build/              # Production build (after yarn build)
```

## ⚡ Available Commands
```bash
yarn start      # Start development server (hot reload)
yarn build      # Create production build
yarn test       # Run tests
```

## 🌐 Access Your App
- **Local Access**: http://localhost:3000
- **Network Access**: http://[your-ip]:3000 (for other devices)
- **To find your IP**: `hostname -I`

## 🔒 Firewall Configuration (if needed)
```bash
# Allow port 3000 through firewall
sudo ufw allow 3000

# Check firewall status
sudo ufw status
```

## 🛠️ Troubleshooting

### If Node.js installation fails:
```bash
# Alternative installation via snap
sudo snap install node --classic
```

### If port 3000 is already in use:
```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill the process (replace PID with actual process ID)
sudo kill -9 [PID]

# Or start on different port
PORT=3001 yarn start
```

### If build fails due to memory:
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
yarn build
```

## 📱 Testing on Mobile Devices
1. Find your Ubuntu machine's IP: `hostname -I`
2. On mobile, browse to: `http://[your-ip]:3000`
3. Make sure both devices are on same network

## 🖨️ Print Setup
- Use browser's print function (Ctrl+P)
- Configure page size to A4 for best results
- Enable background graphics for full styling

## 💾 Data Persistence
- All data is stored in browser's local storage
- Data persists between browser sessions
- No database required

## 🔄 Updates & Maintenance
```bash
# Update dependencies
yarn upgrade

# Check for security vulnerabilities
yarn audit

# Fix vulnerabilities automatically
yarn audit fix
```

## 🏃‍♂️ Auto-Start on Boot (Optional)
```bash
# Create systemd service
sudo nano /etc/systemd/system/bill-generator.service

# Add this content:
[Unit]
Description=Bill Generator App
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/home/your-username/bill-generator
ExecStart=/usr/bin/yarn start
Restart=always

[Install]
WantedBy=multi-user.target

# Enable and start service
sudo systemctl enable bill-generator.service
sudo systemctl start bill-generator.service
```

---

**🎉 Your bill generator is now running locally on Ubuntu!**
Access it at http://localhost:3000 and start creating professional receipts.