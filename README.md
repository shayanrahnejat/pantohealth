# 🗺️ Train Station Map – Frontend Module

A React-based interactive city selector that loads train station data from a remote JSON API, stores it in a global Zustand store, and allows users to filter map data by city using a Material-UI dropdown.

This module is designed to be scalable, testable, and production-ready.

---

## ✨ Features

- Fetches real train-station data from a remote API  
- Extracts unique cities automatically  
- Adds a global **“all”** filter  
- Stores data in **Zustand** for global access  
- Uses **Material UI Select** for a professional UI  
- Fully covered with **Jest + React Testing Library**

---

## 🧩 Architecture Overview

**Data flow**

1. `InfoSelectCity` fetches station data from the API  
2. The dataset is stored in Zustand using `setCoords`  
3. Unique city names are extracted  
4. The user selects a city from the dropdown  
5. The selected city is saved globally using `setCurrent`  
6. The map reads the state and updates markers accordingly  

---

## 🧪 Testing Stack

| Tool | Purpose |
|------|--------|
| Jest | Test runner |
| React Testing Library | UI behavior testing |
| user-event | Simulates real user interactions |
| jest-dom | DOM-specific assertions |
| jsdom | Browser-like environment |

---

## 🧪 What Is Tested

The test suite verifies:

- API data is fetched correctly  
- City names are deduplicated  
- The `"all"` option is added  
- Zustand receives the full dataset  
- Selecting a city updates global state  

This guarantees both **UI correctness** and **state reliability**.

---

## 🚀 Installation

```bash
npm install
```

## Install testing tools

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest @types/jest jest-environment-jsdom
```

## Running tests

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest @types/jest jest-environment-jsdom
```