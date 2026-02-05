# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

這是一個使用 Vue.js 2 建構的電子商務平台，包含前台購物介面和後台管理介面。

## 開發指令

```bash
nvm use 14             # 需使用 Node.js 14（node-sass 4.14 最高支援至 Node 14）
npm run serve          # 啟動開發伺服器
npm run build          # 建構生產版本
npm run lint           # 執行 ESLint 程式碼檢查
```

部署至 GitHub Pages：
```bash
./deploy.sh
```

## 技術架構

**核心技術：**
- Vue.js 2.6 + Vue Router 3 + Vuex 3
- Bootstrap 4 + SCSS
- Axios 作為 HTTP 客戶端
- vee-validate 表單驗證

**外部 API：**
- HexSchool Vue Course API（`vue-course-api.hexschool.io`）
- 環境變數設定於 `.env`（由 `.env.example` 複製）
  - `VUE_APP_API_URL` — API base URL
  - `VUE_APP_UUID` — API path（用戶識別碼）

## API 路徑模式

```js
// 前台（公開）
`${VUE_APP_API_URL}/api/${VUE_APP_UUID}/products`
`${VUE_APP_API_URL}/api/${VUE_APP_UUID}/product/${id}`
`${VUE_APP_API_URL}/api/${VUE_APP_UUID}/cart`
`${VUE_APP_API_URL}/api/${VUE_APP_UUID}/order`
`${VUE_APP_API_URL}/api/${VUE_APP_UUID}/pay/${id}`
`${VUE_APP_API_URL}/api/${VUE_APP_UUID}/coupon`

// 後台（需驗證）
`${VUE_APP_API_URL}/api/${VUE_APP_UUID}/admin/products`
`${VUE_APP_API_URL}/api/${VUE_APP_UUID}/admin/product/${id}`
`${VUE_APP_API_URL}/api/${VUE_APP_UUID}/admin/orders`
`${VUE_APP_API_URL}/api/${VUE_APP_UUID}/admin/coupons`
`${VUE_APP_API_URL}/api/${VUE_APP_UUID}/admin/upload`

// 認證（無 UUID）
`${VUE_APP_API_URL}/admin/signin`
`${VUE_APP_API_URL}/api/user/check`
```

**API Response 格式：**
- 列表：`res.data.products` / `res.data.orders` / `res.data.coupons`
- 單一資源：`res.data.product` / `res.data.order`
- 分頁：`res.data.pagination`
- 購物車：`res.data.data.carts`（cart 項目的數量欄位為 `qty`）
- 上傳圖片：`res.data.imageUrl`
- 建立訂單：`res.data.orderId`
- 更新操作使用 `PUT`（非 PATCH），body 格式為 `{ data: {...} }`

## 程式碼結構

```
src/
├── views/
│   ├── frontend/   # 前台頁面 (Index, Products, Cart, Checkout...)
│   └── backend/    # 後台頁面 (Login, Dashboard, Products, Orders, Coupons)
├── components/
│   ├── frontend/   # 前台元件 (Navbar, Footer, ShoppingCart, Swiper...)
│   └── backend/    # 後台元件 (Navbar, Toast)
├── router/         # 路由設定
├── store/          # Vuex 狀態管理
├── filters/        # Vue 過濾器 (金額格式化、訂單 ID 截斷)
└── assets/         # SCSS 樣式與靜態資源
```

## 狀態管理 (Vuex)

主要狀態：
- `products` / `pagination` - 商品列表與分頁
- `cart` / `totalPrice` / `shippingFee` - 購物車相關
- `isLoading` / `formLoading` - 載入狀態

主要 Actions：
- `getProducts(page)` - 取得商品列表
- `getCart()` - 取得購物車
- `addToCart({item, quantity})` - 加入購物車
- `delItem(id)` - 刪除購物車項目

## 路由結構

**前台 (/)：** Index, Products, Product/:id, Cart, Checkout, CheckoutPay, CheckoutSuccess, About

**後台 (/admin)：** Login, Dashboard (含巢狀路由: products, orders, coupons, storages)

## 認證機制

- 登入後 token 儲存於 Cookie
- API 請求透過 `Authorization` header 驗證（直接放 token，不加 Bearer 前綴）
- `/api/user/check` 需檢查 `res.data.success` 判斷是否有效

## 樣式規範

- Bootstrap 4 客製化變數在 `assets/helpers/_variables.scss`
- 主色：#264710，強調色：#de9e36
- 元件內使用 scoped SCSS

## 程式碼風格

- 無分號、單引號、無尾隨逗號 (Prettier)
- ESLint 搭配 Vue 外掛
