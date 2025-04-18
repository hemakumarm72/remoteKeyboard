# Remote Keyboard Application

## project file

```
remote-keyboard/
│
├── public/
│   ├── index.html       # Frontend UI
│   ├── style.css        # Grid and button styling
│   └── script.js        # AJAX polling and click logic
│
├── components/
│   └── index.js         # Optional: modular route (e.g., for cleaner routing)
│
├── router.js            # Express router binding /api
├── server.js            # Main backend server
├── package.json         # Node project setup
└── README.md            # Project documentation

```

This project is a browser-based collaborative keyboard grid app built with Node.js, Express, MySQL, and jQuery (via AJAX polling). Two users can interact with a shared 2x5 keyboard grid in real time.

---

## 📦 Tech Stack

- **Node.js + Express** for backend API
- **MySQL** for data storage
- **jQuery + AJAX** for client-server communication
- **HTML/CSS** for frontend layout

---

## 🎯 Features

- 2 users (`?user=1` and `?user=2`) can interact with the keyboard
- Keyboard is a 2x5 grid of keys (50x50px each)
- Initially, all keys are white (off)
- When a user clicks a key:
  - It lights up as **red** (user 1) or **yellow** (user 2)
  - Clicking again toggles it off
- Only one user can control the board at a time
- A user must click **"Acquire Control"** to interact
- Control is auto-released after:
  - 1 key interaction
  - OR 120 seconds of inactivity
- Real-time updates using **AJAX polling**

---

## 🗄️ Database Schema

> 📊 View the live DB diagram here: [dbdiagram.io/assignment-backend](https://dbdiagram.io/d/assignment-backend-68026ca31ca52373f58295f3)

### `keys`

| Column | Type   | Description                     |
| ------ | ------ | ------------------------------- |
| keyId  | INT    | Primary Key (0-9)               |
| userId | string | NULL (off), 1 (red), 2 (yellow) |

### `control`

| Column     | Type     | Description                    |
| ---------- | -------- | ------------------------------ |
| controlId  | INT      | Always 1 (singleton)           |
| userId     | string   | Who currently has control      |
| updated_at | DATETIME | When control was last acquired |

---

## 🚀 How to Run

### 1. Install Dependencies

```bash
npm install
```

### 2. Start MySQL & Create Database

Run the contents of `Remote Keyboard Database Setup` in your MySQL CLI:

```
CREATE DATABASE IF NOT EXISTS keyboard;
USE keyboard;

-- Tracks the current value (owner) of each key
CREATE TABLE IF NOT EXISTS `keys` (
  keyId INT PRIMARY KEY,        -- 0 to 9
  userId varchar(20) DEFAULT NULL    -- NULL (off), 1 (red), 2 (yellow)
);

-- Insert 10 blank keys
INSERT IGNORE INTO `keys` (id) VALUES (0),(1),(2),(3),(4),(5),(6),(7),(8),(9);

-- Tracks who has control and when they got it
CREATE TABLE IF NOT EXISTS control (
  controlId INT PRIMARY KEY,         -- always 1
  userId varchar(20) DEFAULT NULL,    -- 1 or 2 or null
  updatedAt DATETIME         -- when control was acquired
);

-- Insert the default row
INSERT IGNORE INTO control (id, userId, updatedAt) VALUES (1, NULL, NOW());

```

### 3. Configure DB Connection (in `.env`)

```bash

PORT=
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_NAME=

```

### 4. Run the Server

```bash
npm  start
```

### 5. Open the App

Visit:

```
http://localhost:3000/?user=1
http://localhost:3000/?user=2
```

---

## 💡 Optional Enhancements

- Timeout countdown display
- Dynamic color support for more users
- Logging key history (user clicks)

---
