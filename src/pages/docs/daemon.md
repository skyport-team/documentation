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

```sh
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

```sh
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
git clone --branch 0.1.0-beta7 https://github.com/skyport-team/skyportd
cd skyportd
npm install

mv example_config.json config.json
```

You can then add the node to the Panel and get the configure command by clicking the "Configure" button. Once you have executed this command, you are ready to start the Daemon.

### Setup Complete

All you need to do now is start skyportd:
```bash
node .
```
