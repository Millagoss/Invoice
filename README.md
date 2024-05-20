# Invoice Management System

A modern, user-friendly application for managing invoices, built with Next.js, leveraging Server Actions for data fetching and dynamic server-rendered pages for enhanced performance and SEO.

## Introduction

This project provides a streamlined solution for managing invoices, offering functionalities for creating, updating, and viewing invoices alongside robust authentication features. Designed to simplify the process of invoice management for both businesses and individuals, it leverages cutting-edge technologies to deliver a seamless experience.

## Setup

To get started with the project, ensure you have Node.js installed on your system. Then, clone the repository and navigate to the project directory:

```bash
git clone https://github.com/Millagoss/Invoice
cd invoice-management-system
```

Install dependencies:

```bash
npm install
```

Generate Prisma client:

```bash
npx prisma generate
```

Start the development server:

```bash
npm run dev
```

Your application should now be running at `http://localhost:3000`.

## Usage

### Authentication

Users can sign up and log in through the `/auth` route. After successful login, users are redirected to the home page where they can manage their invoices.

### Creating Invoices

Navigate to the `/create-invoice` route to start creating new invoices. Fill out the necessary details and submit the form to add the invoice to your list.

### Viewing and Updating Invoices

Access the `/invoices` route to view all your invoices. Here, you can also update existing invoices or delete them.

## Features

### Server Actions

This project utilizes Next.js Server Actions for data fetching and manipulation. Server Actions provide a powerful alternative to traditional API routes, enabling direct interaction with databases and other services within the request-response cycle without the need for external API calls.

### Dynamic Server-Rendered Pages

Dynamic server-rendered pages enhance the performance and SEO of the application. By pre-rendering content on the server side, the application delivers faster initial page loads and improves search engine indexing.
