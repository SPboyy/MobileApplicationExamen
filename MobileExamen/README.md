# 📱 Mobile Pokémon Dex App

A React Native app built with Expo that lists Pokémon using the free [PokéAPI](https://pokeapi.co/).

## 🧩 Features
- Home tab with a searchable and sortable Pokémon list (via FlashList)
- Detail page showing Pokémon ID, name, types, and a short description
- Profile tab with trainer info and shiny count (out of 1025)
- Infinite scrolling (loads 20 Pokémon at a time)
- Uses PokéAPI for live data

## 🌐 API Endpoints
- **List:** `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`
- **Detail:** Each Pokémon’s `url` property (e.g., `https://pokeapi.co/api/v2/pokemon/1/`)

## 🔍 Search & Sort
- Search updates in real-time as you type.
- Sort by **name** (A–Z / Z–A) or **index** (ascending / descending).
- Current sort type and direction are shown on the buttons.

## ⚙️ Run Instructions
```bash
npm install
npx expo start
