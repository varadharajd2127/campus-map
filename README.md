# SmartID Card Generator

A full-stack web application that dynamically generates professional ID cards with user details, photo upload, QR code generation, and PDF export functionality.

---

## Features

* User detail input form
* Image upload (profile photo)
* Automatic QR code generation for each user
* Dynamic ID card preview
* Download ID card as PDF
* Clean and responsive user interface with Tamil and English support

---

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### Other Tools and Libraries

* Cloudinary for image storage
* QRCode.js for QR code generation
* html2pdf.js for PDF download

---

## Project Structure

```bash
project-root/

├── frontend/
│   ├── input.html
│   ├── ID.html
│   └── styles/

├── backend/
│   ├── server.js
│   ├── models/
│   └── routes/

├── images/
└── README.md
```

---

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Joyson3008/SmartID-Card-Generator.git
```

### 2. Navigate to the project folder

```bash
cd SmartID-Card-Generator
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file and add the following:

```env
MONGO_URI=your_mongodb_connection
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 5. Run the server

```bash
node server.js
```

---

## Screenshots

Add project screenshots here to demonstrate the user interface and functionality.

---

## Future Enhancements

* User authentication (login and registration)
* Admin dashboard
* ID card database management
* QR code scan redirection to user profile
* Deployment using cloud platforms

---

## Author

Joyson
Computer Science Student and Full Stack Developer

---

## License

This project is open-source and available for learning and development purposes.
