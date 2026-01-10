# 📦 QianLun Shop - LocalStorage Database Guide

## 📋 Daftar Isi
1. [Pengenalan](#pengenalan)
2. [Struktur File](#struktur-file)
3. [Context API yang Tersedia](#context-api-yang-tersedia)
4. [Cara Menggunakan](#cara-menggunakan)
5. [Storage Keys](#storage-keys)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Pengenalan

QianLun Shop menggunakan **browser localStorage** sebagai database untuk menyimpan data seperti:
- 🛒 **Cart (Keranjang Belanja)**
- ❤️ **Wishlist (Daftar Keinginan)**
- 📦 **Order History (Riwayat Pesanan)**
- ⚙️ **User Preferences (Preferensi Pengguna)**

Semua data disimpan di browser pengguna dan **persisten** (tidak hilang saat refresh atau tutup browser).

---

## 📁 Struktur File

Berikut adalah file-file yang harus Anda buat:

```
src/
├── contexts/
│   ├── CartContext.jsx              ✅ (sudah ada, diperbaiki)
│   ├── WishlistContext.jsx          🆕 (buat file baru)
│   ├── OrderHistoryContext.jsx      🆕 (buat file baru)
│   └── UserPreferencesContext.jsx   🆕 (buat file baru)
├── utils/
│   └── localStorage.js              🆕 (buat file baru)
├── pages/
│   └── Settings.jsx                 🆕 (buat file baru)
└── main.jsx                         ✏️ (update dengan providers)
```

---

## 🎨 Context API yang Tersedia

### 1️⃣ **CartContext** - Keranjang Belanja

**Import:**
```javascript
import { useCart } from '../contexts/CartContext';
```

**Methods:**
```javascript
const {
  items,              // Array of cart items
  addToCart,          // (product, quantity) => void
  removeFromCart,     // (id) => void
  updateQuantity,     // (id, quantity) => void
  clearCart,          // () => void
  getCartTotal,       // () => number
  getCartCount,       // () => number
  getShippingCost,    // () => number
  getTax,             // () => number
  getFinalTotal       // () => number
} = useCart();
```

**Contoh Penggunaan:**
```javascript
// Add product to cart
addToCart({
  id: 1,
  name: 'APEX CHRONOGRAPH',
  price: 12500000,
  image: '/assets/images/products/watch.png',
  category: 'watch'
}, 1);

// Update quantity
updateQuantity(1, 3);

// Get total
const total = getCartTotal(); // Returns number
```

---

### 2️⃣ **WishlistContext** - Daftar Keinginan

**Import:**
```javascript
import { useWishlist } from '../contexts/WishlistContext';
```

**Methods:**
```javascript
const {
  items,                // Array of wishlist items
  addToWishlist,        // (product) => void
  removeFromWishlist,   // (id) => void
  clearWishlist,        // () => void
  isInWishlist,         // (id) => boolean
  getWishlistCount      // () => number
} = useWishlist();
```

**Contoh Penggunaan:**
```javascript
// Add to wishlist
addToWishlist({
  id: 1,
  name: 'APEX CHRONOGRAPH',
  price: 12500000,
  image: '/assets/images/products/watch.png',
  category: 'watch'
});

// Check if item is in wishlist
const inWishlist = isInWishlist(1); // Returns true/false

// Toggle wishlist
const handleToggleWishlist = (product) => {
  if (isInWishlist(product.id)) {
    removeFromWishlist(product.id);
  } else {
    addToWishlist(product);
  }
};
```

---

### 3️⃣ **OrderHistoryContext** - Riwayat Pesanan

**Import:**
```javascript
import { useOrderHistory } from '../contexts/OrderHistoryContext';
```

**Methods:**
```javascript
const {
  orders,               // Array of orders
  addOrder,             // (orderData) => newOrder
  updateOrderStatus,    // (orderId, status) => void
  clearOrderHistory,    // () => void
  getOrderById,         // (orderId) => order
  getOrdersByStatus,    // (status) => orders[]
  getTotalSpent         // () => number
} = useOrderHistory();
```

**Contoh Penggunaan:**
```javascript
// Create new order
const newOrder = addOrder({
  items: cartItems,
  subtotal: 12500000,
  shipping: 50000,
  tax: 1375000,
  total: 13925000,
  status: 'pending',
  customerInfo: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+6281234567890',
    address: 'Jakarta, Indonesia'
  }
});

// Order object structure:
{
  id: 'ORDER-1234567890',
  items: [...],
  subtotal: 12500000,
  shipping: 50000,
  tax: 1375000,
  total: 13925000,
  status: 'pending', // 'pending', 'processing', 'shipped', 'completed', 'cancelled'
  customerInfo: {...},
  createdAt: '2025-01-10T10:30:00.000Z',
  updatedAt: '2025-01-10T10:30:00.000Z'
}

// Update order status
updateOrderStatus('ORDER-1234567890', 'shipped');

// Get completed orders
const completedOrders = getOrdersByStatus('completed');
```

---

### 4️⃣ **UserPreferencesContext** - Preferensi Pengguna

**Import:**
```javascript
import { usePreferences } from '../contexts/UserPreferencesContext';
```

**Methods:**
```javascript
const {
  preferences,                // Object with all preferences
  updatePreference,           // (key, value) => void
  updateMultiplePreferences,  // (preferences) => void
  resetPreferences,           // () => void
  addRecentlyViewed,          // (product) => void
  clearRecentlyViewed,        // () => void
  addSearchQuery,             // (query) => void
  clearSearchHistory,         // () => void
  saveUserInfo,               // (email, phone, address) => void
  clearUserInfo               // () => void
} = usePreferences();
```

**Preferences Object:**
```javascript
{
  // Display
  theme: 'light',              // 'light' | 'dark'
  currency: 'IDR',
  language: 'id',              // 'id' | 'en'
  
  // Shopping
  defaultSortBy: 'default',    // 'default' | 'price-low' | 'price-high' | 'name'
  itemsPerPage: 12,
  gridView: 'grid',            // 'grid' | 'list'
  
  // Notifications
  emailNotifications: true,
  orderUpdates: true,
  promotionalEmails: false,
  
  // User info
  savedAddress: null,
  savedPhone: null,
  savedEmail: null,
  
  // History
  recentlyViewed: [],          // Max 10 items
  searchHistory: []            // Max 20 queries
}
```

**Contoh Penggunaan:**
```javascript
// Update single preference
updatePreference('theme', 'dark');

// Update multiple preferences
updateMultiplePreferences({
  theme: 'dark',
  language: 'en',
  defaultSortBy: 'price-low'
});

// Save user info for quick checkout
saveUserInfo(
  'john@example.com',
  '+6281234567890',
  'Jakarta, Indonesia'
);

// Add to recently viewed (auto-limits to 10)
addRecentlyViewed({
  id: 1,
  name: 'APEX CHRONOGRAPH',
  price: 12500000,
  image: '/assets/images/products/watch.png'
});

// Add search query (auto-limits to 20)
addSearchQuery('luxury watch');
```

---

## 🔑 Storage Keys

Data disimpan dengan key berikut di localStorage:

| Key | Context | Deskripsi |
|-----|---------|-----------|
| `qianlun-cart` | CartContext | Keranjang belanja |
| `qianlun-wishlist` | WishlistContext | Daftar keinginan |
| `qianlun-orders` | OrderHistoryContext | Riwayat pesanan |
| `qianlun-preferences` | UserPreferencesContext | Preferensi pengguna |

---

## 💡 Cara Menggunakan

### Setup Awal

1. **Buat semua file context** di folder `src/contexts/`
2. **Buat file localStorage.js** di folder `src/utils/`
3. **Update main.jsx** dengan semua providers
4. **Buat halaman Settings.jsx** di folder `src/pages/`

### Update App.jsx untuk Routing Settings

```javascript
import Settings from './pages/Settings';

// Tambahkan route:
<Route path="/settings" element={<Settings />} />
```

### Tambahkan Link ke Settings di Navbar

```javascript
<li>
  <Link to="/settings">Settings</Link>
</li>
```

---

## 🛠️ Troubleshooting

### Problem: Data tidak tersimpan

**Solusi:**
1. Cek apakah browser support localStorage:
```javascript
console.log(localStorage.getItem('qianlun-cart'));
```

2. Cek console untuk error
3. Clear browser cache dan coba lagi

### Problem: Data hilang setelah refresh

**Solusi:**
1. Pastikan useEffect untuk load data sudah berjalan
2. Cek apakah ada error di console
3. Pastikan providers sudah di-wrap dengan benar di main.jsx

### Problem: QuotaExceededError

**Solusi:**
1. localStorage punya limit ~5-10MB per domain
2. Utility `localStorage.js` sudah handle ini dengan auto-clear old data
3. Atau clear data manual di Settings page

### Problem: Data corrupt

**Solusi:**
```javascript
// Manual clear di browser console:
localStorage.removeItem('qianlun-cart');
localStorage.removeItem('qianlun-wishlist');
localStorage.removeItem('qianlun-orders');
localStorage.removeItem('qianlun-preferences');

// Atau clear semua:
localStorage.clear();
```

---

## 🎁 Fitur Bonus di Settings Page

1. **View Storage Info** - Lihat berapa storage yang dipakai
2. **Export Data** - Backup semua data ke file JSON
3. **Import Data** - Restore data dari backup
4. **Clear Individual Data** - Hapus cart, wishlist, atau orders saja
5. **Reset Preferences** - Kembalikan preferensi ke default
6. **Clear All Data** - Hapus semua data (danger zone)

---

## 📝 Tips & Best Practices

1. **Always handle errors** - localStorage bisa penuh atau tidak tersedia
2. **Validate data** - Pastikan data yang disimpan valid
3. **Limit data size** - Jangan simpan data yang terlalu besar
4. **Use compression** - Untuk data besar, pertimbangkan kompresi
5. **Backup regularly** - Gunakan export feature untuk backup
6. **Test on different browsers** - localStorage beda-beda per browser

---

## 🚀 Next Steps

Setelah setup localStorage, Anda bisa:

1. ✅ Implement checkout flow dengan OrderHistory
2. ✅ Tambah wishlist button di product cards
3. ✅ Buat halaman "My Orders" untuk view order history
4. ✅ Implement dark mode berdasarkan preferences
5. ✅ Buat "Recently Viewed" section di homepage
6. ✅ Tambah search suggestions dari searchHistory

---

## 📞 Support

Jika ada pertanyaan atau issue, silakan hubungi:
- Email: dhoniprasetya3@gmail.com
- WhatsApp: +62 857-552-85030

---

**Happy Coding! 🎉**