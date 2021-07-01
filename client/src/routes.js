import Admin from './pages/Admin'
import Auth from './pages/Auth';
import Backet from './pages/Backet';
import ProductPage from './pages/ProductPage';
import Shop from './pages/Shop';
import * as Route from './utils/constants'

export const authRoutes = [
  { path: Route.ADMIN_ROUTE, Component: Admin },
  { path: Route.BACKET_ROUTE, Component: Backet }
];
export const publicRoutes = [
  { path: Route.REGISTRATION_ROUTE, Component: Auth },
  { path: Route.LOGIN_ROUTE, Component: Auth },
  { path: Route.PRODUCT_ROUTE + "/:id", Component: ProductPage },
  { path: Route.SHOP_ROUTE, Component: Shop }
];