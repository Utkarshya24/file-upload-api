# File Upload API (Local Storage with Multer)

A simple API to upload, retrieve, and delete files using local filesystem storage with Multer. Built with Node.js, Express, MongoDB, and deployed on Koyeb. Files are stored in the `public/uploads/` directory and automatically expire after 7 days.

## Features
- Upload files (images, PDFs) to a local `public/uploads/` directory.
- Retrieve files by ID via a local URL.
- Delete files manually or automatically after 7 days using MongoDB TTL.
- File size limit: 5MB (configurable).
- Basic API key authentication.
- Swagger UI for API documentation and testing (default landing page).

## Live Server
- **URL**: [https://elaborate-erminia-utkarshya24-4bb4736b.koyeb.app/api-docs/](https://elaborate-erminia-utkarshya24-4bb4736b.koyeb.app/api-docs/)
- Visit the live server to access Swagger UI and test the API endpoints directly.

## Prerequisites
- **Node.js**: v14 or higher (for local development).
- **MongoDB**: Running locally or a cloud URI (e.g., MongoDB Atlas).
- **Koyeb Account**: For deployment.

## Installation (Local Development)
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd file-upload-api