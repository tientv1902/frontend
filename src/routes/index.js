import AboutUsPage from "../pages/AboutUsPage/AboutUsPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import CustomerSupport from "../pages/CustomerSupport/CustomerSupport";
import HomePage from "../pages/HomePage/HomePage";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SuccessOrderPage from "../pages/SuccessOrderPage/SuccessOrderPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import ViewOrderDetails from "../pages/ViewOrderDetails/ViewOrderDetails";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/successOrder',
        page: SuccessOrderPage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/viewOrderDetails/:id',
        page: ViewOrderDetails,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/myOrder',
        page: MyOrderPage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false,
        isShowFooter: false,
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false,
        isShowFooter: false,
    },
    {
        path: '/product-details/:id',
        page: ProductDetailsPage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/manage/admin',
        page: AdminPage,
        isShowHeader: false,
        isShowFooter: false,
        isPrivate: true,
    },
    {
        path: '/AboutUs',
        page: AboutUsPage,
    },
    {
        path: '/CustomerSupport',
        page: CustomerSupport,
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowFooter: false,
    },
];
