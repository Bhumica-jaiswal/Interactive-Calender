# 📅 Interactive Wall Calendar with Memory Timeline

An interactive wall calendar component built using **React (Vite)** and **Tailwind CSS**, inspired by a physical wall calendar design and enhanced with dynamic range selection and a memory timeline system.

---

## 🚀 Overview

This project transforms a static wall calendar UI into a fully interactive frontend component.

It focuses on:
- Clean UI design
- Smooth user interactions
- Meaningful feature addition (Memory Timeline)

---

## ✨ Features

### 📆 Wall Calendar UI
- Inspired by a physical wall calendar layout
- Hero image section with styled layout
- Clean and minimal design using Tailwind CSS

---

### 🎯 Date Range Selection
- Select start and end dates directly on the grid
- Supports:
  - start date
  - end date
  - in-between range highlighting
- Hover preview before confirming selection

---

### 🧠 Memory Timeline System (Core Feature)
- Attach memories to selected date ranges
- Categorize memories into:
  - 🔵 Work
  - 🟢 Personal / Life

---

### 🔵🟢 Visual Indicators
- Dates with memories show colored dots
- Color-coded:
  - Work → Blue
  - Life → Green

---

### 👆 Hover Preview Tooltip
- Hover on a date to preview memory details
- Displays:
  - Title
  - Date range
- Smooth and minimal UI

---

### 📊 Timeline Panel
- Displays all memories in a structured list
- Sorted by date
- Clicking a memory:
  - highlights the corresponding range on calendar

---

### 📱 Fully Responsive
- Desktop → calendar + timeline side-by-side
- Mobile → stacked layout
- Touch-friendly interactions

---

### ✨ UX Enhancements
- Smooth transitions
- Hover effects
- Clear visual states
- Minimal and intuitive design

---

## 🧱 Tech Stack

- React (Vite)
- Tailwind CSS
- JavaScript (ES6+)

---

## 📂 Project Structure
# 📅 Interactive Wall Calendar with Memory Timeline

An interactive wall calendar component built using **React (Vite)** and **Tailwind CSS**, inspired by a physical wall calendar design and enhanced with dynamic range selection and a memory timeline system.

---

## 🚀 Overview

This project transforms a static wall calendar UI into a fully interactive frontend component.

It focuses on:
- Clean UI design
- Smooth user interactions
- Meaningful feature addition (Memory Timeline)

---

## ✨ Features

### 📆 Wall Calendar UI
- Inspired by a physical wall calendar layout
- Hero image section with styled layout
- Clean and minimal design using Tailwind CSS

---

### 🎯 Date Range Selection
- Select start and end dates directly on the grid
- Supports:
  - start date
  - end date
  - in-between range highlighting
- Hover preview before confirming selection

---

### 🧠 Memory Timeline System (Core Feature)
- Attach memories to selected date ranges
- Categorize memories into:
  - 🔵 Work
  - 🟢 Personal / Life

---

### 🔵🟢 Visual Indicators
- Dates with memories show colored dots
- Color-coded:
  - Work → Blue
  - Life → Green

---

### 👆 Hover Preview Tooltip
- Hover on a date to preview memory details
- Displays:
  - Title
  - Date range
- Smooth and minimal UI

---

### 📊 Timeline Panel
- Displays all memories in a structured list
- Sorted by date
- Clicking a memory:
  - highlights the corresponding range on calendar

---

### 📱 Fully Responsive
- Desktop → calendar + timeline side-by-side
- Mobile → stacked layout
- Touch-friendly interactions

---

### ✨ UX Enhancements
- Smooth transitions
- Hover effects
- Clear visual states
- Minimal and intuitive design

---

## 🧱 Tech Stack

- React (Vite)
- Tailwind CSS
- JavaScript (ES6+)

---

## 📂 Project Structure
# 📅 Interactive Wall Calendar with Memory Timeline

An interactive wall calendar component built using **React (Vite)** and **Tailwind CSS**, inspired by a physical wall calendar design and enhanced with dynamic range selection and a memory timeline system.

---

## 🚀 Overview

This project transforms a static wall calendar UI into a fully interactive frontend component.

It focuses on:
- Clean UI design
- Smooth user interactions
- Meaningful feature addition (Memory Timeline)

---

## ✨ Features

### 📆 Wall Calendar UI
- Inspired by a physical wall calendar layout
- Hero image section with styled layout
- Clean and minimal design using Tailwind CSS

---

### 🎯 Date Range Selection
- Select start and end dates directly on the grid
- Supports:
  - start date
  - end date
  - in-between range highlighting
- Hover preview before confirming selection

---

### 🧠 Memory Timeline System (Core Feature)
- Attach memories to selected date ranges
- Categorize memories into:
  - 🔵 Work
  - 🟢 Personal / Life

---

### 🔵🟢 Visual Indicators
- Dates with memories show colored dots
- Color-coded:
  - Work → Blue
  - Life → Green

---

### 👆 Hover Preview Tooltip
- Hover on a date to preview memory details
- Displays:
  - Title
  - Date range
- Smooth and minimal UI

---

### 📊 Timeline Panel
- Displays all memories in a structured list
- Sorted by date
- Clicking a memory:
  - highlights the corresponding range on calendar

---

### 📱 Fully Responsive
- Desktop → calendar + timeline side-by-side
- Mobile → stacked layout
- Touch-friendly interactions

---

### ✨ UX Enhancements
- Smooth transitions
- Hover effects
- Clear visual states
- Minimal and intuitive design

---

## 🧱 Tech Stack

- React (Vite)
- Tailwind CSS
- JavaScript (ES6+)

---

## 📂 Project Structure

src/
├── components/
│ ├── Calendar/
│ │ ├── CalendarContainer.jsx
│ │ ├── HeroSection.jsx
│ │ ├── CalendarHeader.jsx
│ │ ├── CalendarGrid.jsx
│ │ ├── DayCell.jsx
│ │ ├── MemoriesTimeline.jsx
│ │ └── NotesPanel.jsx
│
├── hooks/
│ ├── useRangeSelection.js
│
├── utils/
│ ├── dateUtils.js
│
├── App.jsx


---

## ⚙️ Implementation Details

### 🔹 Calendar Generation
- Dynamically generates days for a given month/year
- Handles:
  - correct day alignment
  - empty slots before first day

---

### 🔹 Range Selection Logic
- Managed using a custom hook (`useRangeSelection`)
- Handles:
  - start date
  - end date
  - hover preview
- Automatically swaps dates if selected in reverse order

---

### 🔹 Memory System
- Memories stored as structured objects:

```js
{
  id,
  title,
  startDate,
  endDate,
  type // "work" | "life"
}

🛠️ How to Run Locally
1. Clone the repository
git clone <your-repo-url>
cd <project-folder>
2. Install dependencies
npm install
3. Run development server
npm run dev
4. Open in browser
http://localhost:5173
📦 Build for Production
npm run build
npm run preview
