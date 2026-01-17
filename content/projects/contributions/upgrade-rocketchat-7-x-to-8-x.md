---
title: Upgrade RocketChat 7.x to 8.x
description: This is a step-by-step guide for backing up and upgrading a
  Rocket.Chat instance along with its MongoDB database
featured: true
image: /img/rocketchat-upgrade.jpeg
weight: 400
---
The newest release with version 8 from [Rocket.Chat](https://www.rocket.chat/blog/introducing-rocket-chat-8-0) was released some days ago.

My self-hosted workspace is running on version `7.12.1` with MongoDB version `6.0.19`. To upgrade we need to check the engine requirements from the [GitHub release page](https://github.com/RocketChat/Rocket.Chat/releases/tag/8.0.1). Now MongoDB version `8.2` is necessary.

To complete the upgrade just follow the official guidelines <https://docs.rocket.chat/docs/guidelines-for-updating-rocketchat> and <https://docs.rocket.chat/v1/docs/mongodb-backup-and-restore>.

For simplicity, I'll provide here all ran commands for my instance which is running on a Debian system:

```
# Running mongodump alone from the command line without any options will assume the database is located on localhost at port 27017 with no authentication.
mongodump

# When the backup is completed, a /dump directory is created.

# Upgrade MongoDB 6 to 7 (https://www.mongodb.com/docs/manual/release-notes/7.0-upgrade-standalone/#std-label-7.0-upgrade-standalone)
monogsh

# The 6.0 instance must have featureCompatibilityVersion set to "6.0". To check featureCompatibilityVersion:
db.adminCommand( { getParameter: 1, featureCompatibilityVersion: 1 } )

# Example output
rs01 [direct: primary] test> db.adminCommand( { getParameter: 1, featureCompatibilityVersion: 1 } )
{
  featureCompatibilityVersion: { version: '6.0' },
  ok: 1,
  '$clusterTime': {
    clusterTime: Timestamp({ t: 1768660875, i: 1 }),
    signature: {
      hash: Binary.createFromBase64('AAAAAAAAAAAAAAAAAAAAAAAAAAA=', 0),
      keyId: Long('0')
    }
  },
  operationTime: Timestamp({ t: 1768660875, i: 1 })
}
rs01 [direct: primary] test>

# Shutdown mongod instance
db.adminCommand( { shutdown: 1 } )

# Import the version 7 public key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

# Create the liste file for version 7
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Reload the package database
apt update

# Install version 7.0.24 of MongoDB Community Server
apt install -y \
   mongodb-org=7.0.24 \
   mongodb-org-database=7.0.24 \
   mongodb-org-server=7.0.24 \
   mongodb-mongosh \
   mongodb-org-shell=7.0.24 \
   mongodb-org-mongos=7.0.24 \
   mongodb-org-tools=7.0.24 \
   mongodb-org-database-tools-extra=7.0.24
   
# Check version
mongod --version

# Start MongoDB
systemctl start mongod

# Enable backwards-incompatible 7.0 features
mongosh
db.adminCommand(
   {
     setFeatureCompatibilityVersion: "7.0",
     confirm: true
   }
)

# Upgrade MongoDB 7 to 8 (https://www.mongodb.com/docs/manual/release-notes/8.0-upgrade-standalone/#std-label-8.0-upgrade-standalone)
monogsh

# Shutdown mongod instance
db.adminCommand( { shutdown: 1 } )

# Import the version 8 public key
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
   gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
   --dearmor

# Create the list file
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/debian bookworm/mongodb-org/8.0 main" | tee /etc/apt/sources.list.d/mongodb-org-8.0.list

# Reload the package database
apt update

# Install latest 8.0.x version of MongoDB Community Server
apt install -y mongodb-org

# Check version
mongod --version

# Start MongoDB
systemctl start mongod

# Enable backwards-incompatible 8.0 features
mongosh
db.adminCommand(
   {
     setFeatureCompatibilityVersion: "8.0",
     confirm: true
   }
)

# Upgrade MongoDB 8.0.x to 8.2 (https://www.mongodb.com/docs/manual/release-notes/8.2-upgrade-standalone)
monogsh

# Shutdown mongod instance
db.adminCommand( { shutdown: 1 } )

# Create the list file
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/debian bookworm/mongodb-org/8.2 main" | tee /etc/apt/sources.list.d/mongodb-org-8.2.list

# Reload the package database
apt update

# Install latest version of MongoDB Community Server
apt install -y mongodb-org

# Check version
mongod --version

# Start MongoDB
systemctl start mongod

# Enable backwards-incompatible 8.2 features
mongosh
db.adminCommand(
   {
     setFeatureCompatibilityVersion: "8.2",
     confirm: true
   }
)

# Update Rocket.Chat to 8.0.1
systemctl stop rocketchat
rm -rf /opt/Rocket.Chat
curl -L https://releases.rocket.chat/8.0.1/download -o /tmp/rocket.chat.tgz
tar -xzf /tmp/rocket.chat.tgz -C /tmp
cd /tmp/bundle/programs/server && npm install
mv /tmp/bundle /opt/Rocket.Chat
systemctl start rocketchat
```
