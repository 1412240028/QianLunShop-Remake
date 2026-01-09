# QianLun Shop - CSS Implementation Guide

## 📁 Struktur Folder

Buat folder `styles` di dalam root project, lalu taruh semua file CSS di dalamnya:

```
qianlun-shop/
├── styles/
│   ├── global.css          # Base styles & variables
│   ├── Navbar.css          # Navbar styling
│   ├── Footer.css          # Footer styling
│   ├── Home.css            # Home page
│   ├── Products.css        # Products page
│   ├── ProductDetail.css   # Product detail page
│   ├── Cart.css            # Cart page
│   ├── Contact.css         # Contact page
│   └── About.css           # About page
├── components/
├── pages/
└── ...
```

## 🎨 Cara Import CSS ke Component

### 1. Update `main.jsx`

Ganti import CSS lama dengan yang baru:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './contexts/CartContext';

// Import global CSS
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
```

### 2. Import CSS di Setiap Component

#### `components/Navbar.jsx`
```jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../styles/Navbar.css';

function Navbar() {
  // ... component code
}

export default Navbar;
```

#### `components/Footer.jsx`
```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  // ... component code
}

export default Footer;
```

#### `pages/Home.jsx`
```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  // ... component code
}

export default Home;
```

#### `pages/Products.jsx`
```jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../styles/Products.css';

function Products() {
  // ... component code
}

export default Products;
```

#### `pages/ProductDetail.jsx`
```jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/ProductDetail.css';

function ProductDetail() {
  // ... component code
}

export default ProductDetail;
```

#### `pages/Cart.jsx`
```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../styles/Cart.css';

function Cart() {
  // ... component code
}

export default Cart;
```

#### `pages/Contact.jsx`
```jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Contact.css';

function Contact() {
  // ... component code
}

export default Contact;
```

#### `pages/About.jsx`
```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';

function About() {
  // ... component code
}

export default About;
```

## 🎯 CSS Variables yang Tersedia

File `global.css` sudah menyediakan CSS variables yang bisa kamu gunakan:

```css
/* Colors */
--primary-black: #0a0a0a
--secondary-black: #1a1a1a
--gold: #d4af37
--gold-light: #f4d03f
--gold-dark: #b8941f

/* Spacing */
--spacing-xs: 0.5rem
--spacing-sm: 1rem
--spacing-md: 1.5rem
--spacing-lg: 2rem
--spacing-xl: 3rem
--spacing-xxl: 4rem

/* Border Radius */
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px

/* Shadows */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1)
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.15)
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2)
--shadow-gold: 0 4px 16px rgba(212, 175, 55, 0.3)
```

## 🛠️ Cara Customize

### Ubah Warna Tema

Edit `styles/global.css`:

```css
:root {
  --gold: #your-gold-color;
  --primary-black: #your-black-color;
  /* ... */
}
```

### Ubah Font

Edit `styles/global.css`:

```css
:root {
  --font-primary: 'Your-Font', serif;
  --font-secondary: 'Your-Font', sans-serif;
}
```

### Tambah Custom Styling

Buat file CSS baru di folder `styles/` dan import di component yang membutuhkan.

## 📱 Responsive Breakpoints

Semua CSS sudah responsive dengan breakpoints:

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## ✅ Checklist Implementasi

- [ ] Buat folder `styles/` di root project
- [ ] Copy semua file CSS ke folder `styles/`
- [ ] Update import di `main.jsx`
- [ ] Import CSS di setiap component/page
- [ ] Hapus atau comment out `src/index.css` yang lama
- [ ] Test di browser
- [ ] Check responsive di berbagai device

## 🚀 Testing

Setelah implementasi, test hal berikut:

1. **Visual**
   - [ ] Warna gold dan black konsisten
   - [ ] Border dan shadow terlihat premium
   - [ ] Typography readable dan elegan

2. **Responsive**
   - [ ] Mobile menu berfungsi
   - [ ] Grid berubah di mobile
   - [ ] Semua button accessible

3. **Interactive**
   - [ ] Hover effects bekerja
   - [ ] Button states jelas
   - [ ] Form inputs responsive

## 💡 Tips

1. **Prioritas Import**: Global CSS selalu di-import pertama kali
2. **Avoid Inline Styles**: Gunakan CSS classes yang sudah ada
3. **Consistent Naming**: Ikuti naming convention yang ada
4. **Mobile First**: Test di mobile dulu sebelum desktop
5. **Browser DevTools**: Gunakan untuk debugging CSS

## 🐛 Common Issues & Solutions

### Issue: CSS tidak apply
**Solution**: Pastikan path import benar dan file CSS ada di folder `styles/`

### Issue: Styling clash
**Solution**: Hapus `src/index.css` yang lama atau comment out conflicting styles

### Issue: Responsive tidak bekerja
**Solution**: Check viewport meta tag ada di `index.html`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Issue: Font tidak load
**Solution**: Pastikan font family yang digunakan tersedia di sistem atau import web font

## 📞 Need Help?

Jika ada issue atau pertanyaan, check:
1. Browser console untuk error messages
2. Network tab untuk failed CSS requests
3. Elements inspector untuk applied styles

---

**Happy Styling! ✨**