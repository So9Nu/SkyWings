# 1) basic checks
node -v && which node
ls -l node_modules/.bin/vite
readlink node_modules/.bin/vite || true
file node_modules/.bin/vite
sed -n '1p' node_modules/vite/bin/vite.js

# 2) try a non-shebang run (works if node is fine)
npx vite
# or
node ./node_modules/vite/bin/vite.js

# 3) common fixes
# make sure bin is executable
chmod +x node_modules/.bin/vite
chmod +x node_modules/vite/bin/vite.js

# remove macOS quarantine attributes (if present)
xattr -lr node_modules | head -n 30
xattr -rd com.apple.quarantine node_modules || true

# 4) if project sits in Downloads or an external/noexec volume, move it and reinstall
mkdir -p ~/Projects
mv ~/Downloads/airline/frontend ~/Projects/airline-frontend || true
cd ~/Projects/airline-frontend || cd ./frontend
rm -rf node_modules package-lock.json
npm install
npm run dev# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
