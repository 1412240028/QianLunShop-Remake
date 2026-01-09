# TODO: Ensure Toast.css works for all pages

- [x] Import '../styles/Toast.css' in main.jsx to make it globally available
- [x] Add toast notification to Products.jsx handleAddToCart
- [x] Remove redundant import of Toast.css from ProductDetail.jsx
- [x] Add toast notification to Cart.jsx removeFromCart and clearCart
- [x] Make cart-item styling smaller in Cart.css (reduce padding, gap, image size, font size)
- [x] Change font color of "Browse Products" link in Cart.css to var(--primary-black)
- [x] Make cart-item even smaller (reduce padding to var(--spacing-sm), gap to var(--spacing-xs), image to 50px, font to 0.85rem)
- [x] Adjust cart-item grid layout to prevent overlapping (change to 1fr 0.8fr 0.8fr 0.8fr 0.5fr)
- [x] Reduce font sizes for product name (0.85rem), price (0.9rem), and subtotal (1rem) in cart-item
- [x] Make cart-item even smaller: grid to 1fr 0.7fr 0.7fr 0.7fr 0.4fr, padding to var(--spacing-xs), image to 40px
- [x] Remove text from payment methods in Cart.jsx, leave only emojis
- [x] Verify that toast notifications work in Products, ProductDetail, and Cart pages (app running on localhost:5175)
