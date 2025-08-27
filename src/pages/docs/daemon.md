---
title: Installation
description: Learn how to install Skyport Daemon.
---

## Dependencies

* Node.js `v18` and higher (Nodejs `v22` recommended).
* Docker (or Docker Desktop on Windows / macOS)

### Example Dependency Installation

#### Method 1: Using APT (Recommended for Beginners)

The commands below are an example of how to install dependencies on Ubuntu 24.04:

```bash
# Install Docker
curl -sSL https://get.docker.com/ | CHANNEL=stable bash

# Install Node.js via NodeSource
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_22.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

sudo apt update
sudo apt install -y nodejs git
```

#### Method 2: Using NVM (Recommended for Developers)

The Node Version Manager (NVM) provides more flexibility in managing Node.js versions:

```bash
# Install Docker
curl -sSL https://get.docker.com/ | CHANNEL=stable bash

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Reload shell configuration
source ~/.bashrc

# Install and use Node.js v22
nvm install 22
nvm use 22

# Install git
sudo apt install -y git
```

## Installation

The following commands will download the Skyport Daemon into /etc/skyportd and use npm to install the required packages:

```bash
cd /etc
git clone https://github.com/skyport-team/skyportd
cd skyportd
npm install

mv example_config.json config.json
```

You can then add the node to the Panel and get the configure command by clicking the "Configure" button. Once you have executed this command, you are ready to start the Daemon.

### Setup Complete

All you need to do now is start skyportd:

#### Method 1: Direct Start (Development)

```bash
node .
```

#### Method 2: Using PM2 (Recommended for Production)

PM2 is a process manager that helps keep your daemon running and provides features like auto-restart, monitoring, and log management:

```bash
# Install PM2 globally
npm install -g pm2

# Start Skyport Daemon with PM2
pm2 start index.js --name "skyportd"

# Enable PM2 to start on system boot
pm2 startup
pm2 save

# Useful PM2 commands
pm2 status          # Check status
pm2 logs skyportd  # View logs
pm2 restart skyportd  # Restart daemon
pm2 stop skyportd     # Stop daemon
```
