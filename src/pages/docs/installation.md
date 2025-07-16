---
title: Installation
description: Learn how to install Skyport.
---

## Picking a Server OS

Skyport runs on a wide range of operating systems, so pick whichever you are most comfortable using.

| Operating System | Version |     Supported      | Notes                                                       |
|------------------|---------|:------------------:|-------------------------------------------------------------|
| **Ubuntu**       | 24.04   | ✅ | Documentation written assuming Ubuntu 24.04 as the OS. |
|                  | 22.04   | ✅ |                                                             |
| **CentOS**       | 7       | ✅ | Extra repos are required.                                   |
|                  | 8       | ✅ | Note that CentOS 8 is EOL. Use Rocky or Alma Linux.         |
| **Debian**       | 11      | ✅ |                                                             |
|                  | 12      | ✅ |                                                             |
| **Windows**      | 11      | ✅ |                                                             |
|                  | 10      | ✅ |                                                             |
| **macOS**        | 10.15+  | ✅ |                                                             |

## Dependencies

* Node.js `v18` and higher (Nodejs `v22` recommended).

### Example Dependency Installation

The commands below are simply an example of how you might install these dependencies on Ubuntu 24.04. Please consult with your
operating system's package manager to determine the correct packages to install.

```sh
# Ubuntu/Debian
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_16.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

sudo apt update
sudo apt install -y nodejs git
```

## Installation

The following commands will download the Skyport Panel into /etc/skyport and use npm to install the required packages:

``` bash
cd /etc
git clone --branch 0.1.0-beta6 https://github.com/skyportlabs/panel
mv panel skyport
cd skyport
npm install
```

### Seed & Create a User

You'll then need to create an administrative user so that you can log into the panel. To do so, run the command below.

``` bash
npm run seed
npm run createUser
```

### Setup Complete

All you need to do now is start Skyport:
``` bash
node .
```

Your Panel will now be accessible from port 3001 (unless you changed it in `config.json`).
