import Vue from "vue";
import Router from "vue-router";
const Nav = _ => import("@/view/nav");
const Login = _ => import("@/view/account/Login");
const Protocol = _ => import("@/view/account/Protocol");
const Mine = _ => import("@/view/mine");
const Home = _ => import("@/view/home");
const Cart = _ => import("@/view/cart");
const Order = _ => import("@/view/cart/Order");
const OzerOrder = _ => import("@/view/cart/OzerOrder");
const OrderList = _ => import("@/view/cart/OrderList");
const BackDetail = _ => import("@/view/cart/BackDetail");
const OrderDetail = _ => import("@/view/cart/OrderDetail");
const Pay = _ => import("@/view/cart/Pay");
const Logistics = _ => import("@/view/cart/Logistics");
const LogisticsDetail = _ => import("@/view/cart/LogisticsDetail");
const Evaluation = _ => import("@/view/cart/Evaluation");
const Member = _ => import("@/view/member");
const ClassifyTwo = _ => import("@/view/home/ClassifyTwo");
const Search = _ => import("@/view/home/Search");
const GoodsDetail = _ => import("@/view/home/GoodsDetail");
const ShareGoods = _ => import("@/view/home/ShareGoods");
const AllBack = _ => import("@/view/home/AllBack");
const EvaluationPage = _ => import("@/view/home/EvaluationPage");
const ShopDetail = _ => import("@/view/home/ShopDetail");
const MoreShop = _ => import("@/view/home/MoreShop");
const MoreGoods = _ => import("@/view/home/MoreGoods");
const ZeroShop = _ => import("@/view/home/ZeroShopThree");
const ZeroShopDetail = _ => import("@/view/home/ZeroShopDetail");
const UpDataInfo = _ => import("@/view/mine/UpDataInfo");
const AddMoney = _ => import("@/view/mine/AddMoney");
const MerchantsRegister = _ => import("@/view/mine/MerchantsRegister");
const MerchantsRegisterNext = _ => import("@/view/mine/MerchantsRegisterNext");
const Discount = _ => import("@/view/mine/Discount");
const MerchantsAddress = _ => import("@/view/mine/MerchantsAddress");
const UpLicense = _ => import("@/view/mine/UpLicense");
const CommissionPage = _ => import("@/view/mine/CommissionPage");
const Team = _ => import("@/view/mine/Team");
const Balance = _ => import("@/view/mine/Balance");
const Address = _ => import("@/view/mine/Address");
const NewAddress = _ => import("@/view/mine/NewAddress");
const PlayPassword = _ => import("@/view/mine/PlayPassword");
const ForgetPw = _ => import("@/view/mine/ForgetPw");
const UserSwitch = _ => import("@/view/mine/UserSwitch");
const Test = _ => import("@/view/Test");
const Test2 = _ => import("@/view/Test2");
const PlayPlay = _ => import("@/view/PlayPlay");
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/protocol",
      name: "Protocol",
      component: Protocol,
      meta: {
        tourists: true
      }
    },
    {
      path: "/playPlay",
      name: "PlayPlay",
      component: PlayPlay
    },
    {
      path: "/test/:transStatementId",
      name: "Test",
      component: Test
    },
    {
      path: "/test2/:transStatementId",
      name: "Test2",
      component: Test2
    },
    {
      path: "/",
      name: "Nav",
      component: Nav,
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "Home",
          component: Home,
          meta: {
            tourists: true
          }
        },
        {
          path: "/classifyTwo/:id",
          name: "ClassifyTwo",
          component: ClassifyTwo,
          meta: {
            tourists: true
          }
        },
        {
          path: "/mine",
          name: "Mine",
          component: Mine
        },
        {
          path: "/member",
          name: "Member",
          component: Member
        },
        {
          path: "/cart",
          name: "Cart",
          component: Cart
        }
      ]
    },
    {
      path: "/search",
      name: "Search",
      component: Search,
      meta: {
        tourists: true
      }
    },
    {
      path: "/moreShop/:keyword",
      name: "MoreShop",
      component: MoreShop,
      meta: {
        tourists: true
      }
    },
    {
      path: "/moreGoods/:keyword",
      name: "MoreGoods",
      component: MoreGoods,
      meta: {
        tourists: true
      }
    },
    {
      path: "/zeroShop",
      name: "ZeroShop",
      component: ZeroShop,
      meta: {
        tourists: true
      }
    },
    {
      path: "/zeroShopDetail/:id",
      name: "ZeroShopDetail",
      component: ZeroShopDetail,
      meta: {
        tourists: true
      }
    },
    {
      path: "/goodsDetail/:id",
      name: "GoodsDetail",
      component: GoodsDetail,
      meta: {
        tourists: true
      }
    },
    {
      path: "/shareGoods",
      name: "ShareGoods",
      component: ShareGoods
    },
    {
      path: "/allBack",
      name: "AllBack",
      component: AllBack,
      meta: {
        tourists: true
      }
    },
    {
      path: "/EvaluationPage/:id",
      name: "EvaluationPage",
      component: EvaluationPage
    },
    {
      path: "/shopDetail/:id",
      name: "ShopDetail",
      component: ShopDetail
    },
    {
      path: "/order/:goodsInfo",
      name: "Order",
      component: Order
    },
    {
      path: "/ozerOrder/:goodsInfo",
      name: "OzerOrder",
      component: OzerOrder
    },
    {
      path: "/orderList/:active",
      name: "OrderList",
      component: OrderList
    },
    {
      path: "/backDetail/:id",
      name: "BackDetail",
      component: BackDetail
    },
    {
      path: "/orderDetail/:orderId",
      name: "OrderDetail",
      component: OrderDetail
    },
    {
      path: "/pay/:orderInfo",
      name: "Pay",
      component: Pay
    },
    {
      path: "/logistics/:orderId",
      name: "Logistics",
      component: Logistics
    },
    {
      path: "/logisticsDetail/:logisticsId",
      name: "LogisticsDetail",
      component: LogisticsDetail
    },
    {
      path: "/evaluation/:orderId",
      name: "Evaluation",
      component: Evaluation
    },
    {
      path: "/upDataInfo/:id",
      name: "UpDataInfo",
      component: UpDataInfo
    },
    {
      path: "/addMoney",
      name: "AddMoney",
      component: AddMoney
    },
    {
      path: "/merchantsRegister",
      name: "MerchantsRegister",
      component: MerchantsRegister
    },
    {
      path: "/merchantsRegisterNext",
      name: "MerchantsRegisterNext",
      component: MerchantsRegisterNext
    },
    {
      path: "/discount",
      name: "Discount",
      component: Discount
    },
    {
      path: "/merchantsAddress",
      name: "MerchantsAddress",
      component: MerchantsAddress
    },
    {
      path: "/upLicense",
      name: "UpLicense",
      component: UpLicense
    },
    {
      path: "/CommissionPage/:isMember",
      name: "CommissionPage",
      component: CommissionPage
    },
    {
      path: "/team",
      name: "Team",
      component: Team
    },
    {
      path: "/balance",
      name: "Balance",
      component: Balance
    },
    {
      path: "/address",
      name: "Address",
      component: Address
    },
    {
      path: "/newAddress",
      name: "NewAddress",
      component: NewAddress
    },
    {
      path: "/editAddress/:info",
      name: "EditAddress",
      component: NewAddress
    },
    {
      path: "/playPassword",
      name: "PlayPassword",
      component: PlayPassword
    },
    {
      path: "/forgetPw",
      name: "ForgetPw",
      component: ForgetPw
    },
    {
      path: "/userSwitch",
      name: "UserSwitch",
      component: UserSwitch
    },
    {
      path: "/",
      name: "Home",
      component: Home
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 };
  }
});
