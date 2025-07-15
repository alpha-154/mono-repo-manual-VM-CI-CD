AWS EC2 Server Setup & Node.js Deployment Guide

✅ Step 1: Launch EC2 Instance
1. Go to AWS EC2 Dashboard.
2. Launch a new instance:
    * Choose Ubuntu (e.g., Ubuntu 20.04 LTS).
    * Select t2.micro or as per your need.
    * In the Key Pair section:
        * Create/download a new key pair (e.g., mrh.pem).
    * Configure Security Group:
        * Allow port 22 (SSH), port 80 (HTTP), and your Node.js port (e.g., 8080 or 3000).

✅ Step 2: Setup SSH Access on Local Machine

📥 Move .pem file to ~/.ssh/ & Set Permissions

# Create .ssh directory if it doesn't exist
- `mkdir -p ~/.ssh`

# Move the PEM file
- `mv ~/Downloads/mrh.pem ~/.ssh/mrh.pem`

# Set correct permissions
- `chmod 400 ~/.ssh/mrh.pem`

# Verify permission
`ls -l ~/.ssh/mrh.pem`

✅ Step 3: Connect to EC2 Instance via SSH

`ssh -i ~/.ssh/mrh.pem ubuntu@<your-ec2-public-ip>`
Replace <your-ec2-public-ip> with your actual EC2 public IPv4 address.

✅ Step 4: Install Node.js and Git
# Install NVM
- `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`

# Load NVM
- `source ~/.bashrc`

# Install latest LTS Node.js version
- `nvm install --lts`

# Install Git ( though most of the it get by default installed with the ubuntu machine)
- sudo apt update
- sudo apt install git -y

✅ Step 5: Clone Your Node.js Project
- git clone <your-repository-url>
- cd <project-folder>
- npm install

✅ Step 6: Install & Configure PM2 (Recommended)
- npm install -g pm2
- pm2 start index.js --name my-backend
- pm2 save
- pm2 startup
- # Follow instructions and run the generated sudo command

✅ Step 7: Install and Configure Nginx as Reverse Proxy
- sudo apt install nginx -y

📂 Configure Nginx
- sudo nano /etc/nginx/sites-available/default

Replace the default config with the following:
server {
    listen 80;
    server_name <your-ec2-public-ip>; # or your domain name

    location / {
        proxy_pass http://localhost:8080; # or your Node.js port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}


✅ Save & Exit Nano:
- Press Ctrl + O, Enter to save
- Press Ctrl + X to exit

✅ Test & Reload Nginx
- sudo nginx -t
- sudo systemctl reload nginx


✅ Step 8: Visit Your App
* If using IP: http://<your-ec2-public-ip>/
* If using domain: http://your-domain.com/

📌 Optional: Set Up Custom Domain (Route53 or external DNS)
1. Go to your domain registrar (e.g., Namecheap, GoDaddy).
2. Add an A record pointing to your EC2 Public IPv4 address.
3. Wait for DNS to propagate.


🧠 Summary
Task	Command
Connect to EC2 =>	ssh -i ~/.ssh/mrh.pem ubuntu@<ip>
Clone project =>	git clone <repo>
Install deps =>	npm install
Run server =>	pm2 start index.js --name my-app
Set up Nginx =>	sudo nano /etc/nginx/sites-available/default
Restart Nginx =>	sudo systemctl reload nginx
