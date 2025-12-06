---
description: Start LoFi Player development servers
---

# Starting LoFi Player Development Environment

// turbo-all

## 1. Navigate to project directory
```bash
cd C:\Users\lofim\OneDrive\Documents\anitgravity-projects\LoFi-Player
```

## 2. Check current git branch
```bash
git branch
```
**Expected:** Should show current working branch (likely `feature/spatial-nav-v2` or `dev`)

## 3. Start PocketBase backend (Terminal 1)
```bash
cd backend
./pocketbase.exe serve
```
**Expected Output:** 
- Server starts on `http://127.0.0.1:8090`
- Admin UI available at `http://127.0.0.1:8090/_/`

**Keep this terminal running**

## 4. Start web development server (Terminal 2)
Open a new terminal in the root directory:
```bash
pnpm dev
```
**Expected Output:**
- Vite dev server starts
- Web app available at `http://localhost:5173`
- Hot Module Replacement (HMR) enabled

**Keep this terminal running**

## 5. Verify servers are running
- Backend: http://127.0.0.1:8090/_/ (should show PocketBase admin)
- Frontend: http://localhost:5173 (should show LoFi Player app)

## 6. Check for any build errors
If you see errors in the terminal, note them before proceeding with development.

## Troubleshooting

### PocketBase won't start
- Check if port 8090 is already in use
- Verify `pocketbase.exe` exists in `backend/` folder

### Vite dev server errors  
- Run `pnpm install` to ensure dependencies are installed
- Check for TypeScript/linting errors in console
- Clear cache: delete `node_modules/.vite` and restart

### Both servers running but blank page
- Check browser console for errors (F12)
- Verify no compilation errors in Vite terminal
- Try hard refresh (Ctrl+Shift+R)

## Stopping Servers

Press `Ctrl+C` in each terminal to stop the respective server.
