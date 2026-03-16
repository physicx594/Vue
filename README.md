# Healthy Diet — 健康飲食電商平台

以 Vue.js 2 建構的全端電商網站，涵蓋前台購物流程與後台管理系統。

> **此專案已封存，不再維護更新。** Vue 3 重構版本請參考 [healthy-diet-vue3](https://github.com/physicx594/healthy-diet-vue3)。

**Demo：** <https://physicx594.github.io/Vue/>

## 功能特色

### 前台

- 首頁輪播推薦、AOS 滾動動畫
- 商品列表瀏覽與單一商品詳細頁
- 購物車增刪改查
- 結帳流程（填寫資料 → 付款 → 完成）
- 優惠券套用
- RWD 響應式設計

### 後台

- 管理員登入驗證
- 商品 CRUD 管理（含圖片上傳）
- 訂單管理
- 優惠券管理
- 圖片儲存管理

## 技術架構

| 類別 | 技術 |
| --- | --- |
| 框架 | Vue.js 2.6 |
| 狀態管理 | Vuex 3 |
| 路由 | Vue Router 3 |
| UI 框架 | Bootstrap 4 + SCSS |
| HTTP 請求 | Axios |
| 表單驗證 | vee-validate 3 |
| 輪播套件 | Swiper 5 |
| 動畫 | AOS、Animate.css |
| 圖片瀏覽 | v-viewer |
| 建構工具 | Vue CLI 4 |
| 部署 | GitHub Pages |

## 環境需求

- Node.js 14（node-sass 4.14 最高支援至 Node 14）
- npm

## 安裝與啟動

```bash
# 1. 安裝依賴
npm install

# 2. 設定環境變數
cp .env.example .env
# 編輯 .env 填入 API URL 與 UUID

# 3. 啟動開發伺服器
npm run serve

# 4. 建構生產版本
npm run build

# 5. 程式碼檢查
npm run lint
```

## 環境變數

| 變數名稱 | 說明 |
| --- | --- |
| `VUE_APP_API_URL` | API 基礎路徑 |
| `VUE_APP_UUID` | 使用者識別碼（API path） |

## 專案結構

```
src/
├── views/
│   ├── frontend/        # 前台頁面
│   │   ├── Index.vue        # 首頁
│   │   ├── Products.vue     # 商品列表
│   │   ├── Product.vue      # 商品詳情
│   │   ├── Cart.vue         # 購物車
│   │   ├── Checkout.vue     # 結帳
│   │   ├── CheckoutPay.vue  # 付款
│   │   └── CheckoutSuccess.vue # 訂單完成
│   └── backend/         # 後台頁面
│       ├── Login.vue        # 登入
│       ├── Dashboard.vue    # 儀表板
│       ├── Products.vue     # 商品管理
│       ├── Orders.vue       # 訂單管理
│       ├── Coupons.vue      # 優惠券管理
│       └── Storages.vue     # 圖片管理
├── components/          # 共用元件
│   ├── Pagination.vue
│   ├── frontend/        # 前台元件 (Navbar, Footer, Swiper...)
│   └── backend/         # 後台元件 (Navbar, Toast)
├── store/               # Vuex 狀態管理
├── router/              # 路由設定
├── filters/             # Vue 過濾器 (金額格式化等)
└── assets/              # SCSS 與靜態資源
```

## 部署

```bash
./deploy.sh
```

自動建構並推送至 GitHub Pages 的 `gh-pages` 分支。
