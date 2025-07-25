# Project Setup and Running Instructions

This project consists of a front-end and a back-end application. Follow the instructions below to set up and run both parts.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Back-end Setup](#back-end-setup)
- [Front-end Setup](#front-end-setup)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (LTS version recommended)
- npm or Yarn (Yarn is used in this guide as per `yarn.lock` files)

## Back-end Setup

1. Navigate to the `back-end` directory:

   ```bash
   cd back-end
   ```

2. Install the dependencies:

   ```bash
   yarn
   ```

3. .env content

   ```bash
      PORT=3000
      NODE_ENV=development
      DB_URI=mongodb+srv://admin:admin@cluster0.5gbwmdj.mongodb.net/entity-api?retryWrites=true&w=majority&appName=Cluster0
      JWT_SECRET=fngeoheoj3riwhi3gr3ugrubfwudqwuidhwufheuifbeucnwidnwidbwubdwuwef
   ```

   4. From the `back-end` directory, start the server.

   ```bash
   yarn dev
   ```

## Front-end Setup

1. Navigate to the `front-end` directory:
   ```bash
   cd front-end
   ```
2. Install the dependencies:

   ```bash
   yarn
   ```

   3. From the `front-end` directory, start the development server.

   ```bash
   yarn dev
   ```
