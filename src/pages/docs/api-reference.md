---
title: API reference
description: Learn how api works.
---

## Overview

This API allows managing users, instances, and nodes. It requires an API key for all requests, which should be passed in the x-api-key header.

## Authentication
API Key:
* An API key is required for all endpoints. It ensures that the request is authenticated and authorized.
* Header: x-api-key

---

## User Endpoints

### GET | /api/users
* Retrieves a list of all users.
* Reponse:
  * '200': List of users.
  * '500': Error retrieving users.

### POST | /api/getUser
* Retrieves a user by email or username.
* Request Body:
  * 'type' (string): The search type, either 'email' or 'username'.
  * 'value' (string): The email or username to search for.
* Response:
  * '201': User details.
  * '400': Missing or invalid parameters, or user not found.
  * '500': Error retrieving user.

### POST | /api/users/create
* Creates a new user.
* Request Body:
  * 'username' (string): Username of the new user.
  * 'email' (string): Email of the new user.
  * 'password' (string): Password for the new user.
  * 'userId' (string, optional): User ID, generated if not provided.
  * 'admin' (boolean, optional): Whether the user has admin rights.
* Response:
  * '201': User created with details.
  * '400': Missing required parameters.
  * '409': User already exists.
  * '500': Error creating user.

## Instances Endpoints

### GET | /api/instances
* Retrieves a list of all instances.
* Response:
  * '200': List of instances.
  * '500': Error retrieving instances.

### POST | /api/instances/deploy
* Deploys a new instance.
* Request Body:
  * 'image' (string): Image to deploy.
  * 'memory' (string): Memory allocation.
  * 'cpu' (string): CPU allocation.
  * 'ports' (string): Port mapping.
  * 'nodeId' (string): Node ID where the instance will be deployed.
  * 'name' (string): Name of the instance.
  * 'user' (string): User ID owning the instance.
  * 'primary' (string): Primary port.
* Response:
  * '201': Instance created.
  * '400': Missing parameters.
  * '500': Error deploying instance.

### DELETE | /api/instance/delete
* Deletes an existing instance.
* Request Body:
  * 'id' (string): ID of the instance to delete.
* Response:
  * '201': Instance deleted.
  * '400': Missing ID or instance not found.
  * '500': Error deleting instance.

### POST | /api/getUserInstance
* Retrieves instances owned by a specific user.
* Request Body:
  * 'userId' (string): ID of the user.
* Response:
  * '200': List of user instances.
  * '400': Missing user ID or user not found.
  * '500': Error retrieving user instances.

### POST | /api/getInstance
* Retrieves details of a specific instance.
* Request Body:
  * 'id' (string): ID of the instance.
* Response:
  * '200': Instance details.
  * '400': Missing instance ID or instance not found.
  * '500': Error retrieving instance.

## Images Endpoints

### GET | /api/images
* Retrieves a list of available images.
* Response:
  * '200': List of images.
  * '500': Error retrieving images.

## Nodes Endpoints

### GET | /api/nodes
* Retrieves a list of all nodes
* Response:
  * '200': List of nodes.
  * '500': Error retrieving nodes.

### POST | /api/nodes/create
* Creates a new node.
* Request Body:
  * 'name' (string): Name of the node.
  * 'tags' (string): Tags associated with the node.
  * 'ram' (string): RAM specification.
  * 'disk' (string): Disk specification.
  * 'processor' (string): Processor specification.
  * 'address' (string): Network address of the node.
  * 'port' (string): Network port.
* Response:
  * '201': Node created with details.
  * '400': Missing parameters.
  * '500': Error creating node.

### DELETE | /api/nodes/delete
* Deletes an existing node.
* Request Body:
  * 'nodeId' (string): ID of the node to delete.
* Response:
  * '201': Node deleted.
  * '400': Invalid or missing node ID.
  * '500': Error deleting node.
---

## Error Responses

* '400': Bad Request. The request was invalid or cannot be otherwise served.
* '401': Unauthorized. API key is missing or invalid.
* '500': Internal Server Error. An error occurred on the server.
