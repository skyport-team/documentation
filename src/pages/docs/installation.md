---
title: Installation
description: Learn how to install Skyport.
---

## Picking a Server OS

Skyport runs on a wide range of operating systems, so pick whichever you are most comfortable using.

| Operating System       | Versions             | Support Status     | Additional Notes                 |
| ---------------------- | -------------------- | ------------------ | -------------------------------- |
| **Ubuntu**             | 22.04 LTS, 24.04 LTS | ✅ Full Support    | Recommended for most users       |
| **CentOS/Rocky Linux** | 7, 8                 | ✅ Supported       | Use Rocky Linux for CentOS 8     |
| **Debian**             | 11, 12               | ✅ Full Support    | Stable and secure                |
| **Windows**            | 10, 11               | ✅ Supported       | Semi-stable, mainly for dev      |
| **macOS**              | 10.15+               | ✅ Supported       | Community-tested                 |

## Dependencies

- Node.js `v18` and higher (Nodejs `v22` recommended).

### Example Dependency Installation

The commands below are simply an example of how you might install these dependencies on Ubuntu 24.04. Please consult with your
operating system's package manager to determine the correct packages to install.


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

The following commands will download the Skyport Panel into /etc/skyport and use npm to install the required packages:

```bash
cd /etc
git clone https://github.com/skyport-team/panel
mv panel skyport
cd skyport
npm install
```

### Seed & Create a User

Before creating a user, rename the example configuration file:

```bash
mv example_config.json config.json
```

You'll then need to create an administrative user so that you can log into the panel. To do so, run the command below.

```bash
npm run seed
npm run createUser
```

### Setup Complete

All you need to do now is start Skyport:

#### Method 1: Direct Start (Development)

```bash
node .
```

#### Method 2: Using PM2 (Recommended for Production)

PM2 is a process manager that helps keep your application running and provides features like auto-restart, monitoring, and log management:

```bash
# Install PM2 globally
npm install -g pm2

# Start Skyport with PM2
pm2 start index.js --name "skyport"

# Enable PM2 to start on system boot
pm2 startup
pm2 save

# Useful PM2 commands
pm2 status          # Check status
pm2 logs skyport  # View logs
pm2 restart skyport  # Restart application
pm2 stop skyport     # Stop application
```

Your Panel will now be accessible from port 3001 (unless you changed it in `config.json`).
