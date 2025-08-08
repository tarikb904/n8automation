# Fonts Used in the App

- **Primary font:**  
  - `"Inter"` — Main font family used throughout the app.  
  - Imported from Google Fonts in `src/index.css` with:  
    ```css
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    ```
  - Applied globally via the `.font-inter` class and on the `body` element with Tailwind utility classes.

- **Monospace font:**  
  - Tailwind's default monospace font stack is used when `font-mono` class is applied.  
  - Typically resolves to system monospace fonts like `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`.

No other custom fonts or font families are explicitly used in the codebase.

---

If you want to add or change fonts globally or for specific components, I can assist with that.