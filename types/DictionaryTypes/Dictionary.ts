export interface HeaderLaunguage {
   
    logoAltText: string;
    LaunguageSwitcher:SwitcherLaunguage;
    cart: {
      yourBag: string;
      cart: string;
      checkout: string;
      total:string
    };
    account: {
      greeting: string;
    };
    menu: {
      home: string;
      shop: string;
      contact: string;
      cartDetail: string;
    };
    social: {
      facebook: string;
      instagram: string;
    };
    helpLine: {
      callUs: string;
      phoneNumber: string;
    };
  }
  
 export interface FooterLaunguage {
    copywriteText: string;
    menu: {
        home: string;
        shop: string;
        contact: string;
        cartDetail: string;
    };
  
  
  }
  export interface LayoutLanguage{
    Header:HeaderLaunguage,
    Footer:FooterLaunguage,
  }
  export interface SwitcherLaunguage{
    LaunguageChanger:string
  }
  export interface HomeSliderLaunguage{
    button: string;
  }
  export interface HomeCategoryTopLaunguage{
    Button: string;
  }
  export interface HomeNewArriwalsLaunguage{
    All: string;
    NewProduct:string

  }
 export interface HomeLaunguage {
    Slider:HomeSliderLaunguage,
    Category_Top: HomeCategoryTopLaunguage;
    NewArrivals: HomeNewArriwalsLaunguage;
  }
  
 export interface ShopLaunguage {
    Filter: {
      Categories: string;
      Priceİnterval: string;
      Price: string;
      FilterBySize: string;
    };
  }
  
 export interface ContactLaunguage {
    ContactUs: string;
    Adress: string;
    PhoneNumber: string;
  }
  
 export interface ProductDetailLaunguage {
    Information: string;
    AddToCart: string;
    AddToCartErrorMesage: string;
    AddToCartSuccessMesage: string;
    RelatedProducts: string;
  }
 export interface CheckOutLaunguage {
    BillingAddress: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    PhoneNumberDescription: string;
    Email: string;
    EmailDescription: string;
    Adress: string;
    AdressDescription: string;
    order: {
      OrderName: string;
      Content: string;
      ProductName: string;
      ProductSize: string;
      ProductCount: string;
      ProductPrice: string;
      Total: string;
      Shipping: string;
      FinalTotal: string;
      Button: string;
    };
  }
  export interface NotFoundLanguage {
    ReturnHome: string;
  }
  export interface CartLanguage {
    product: string;
    price: string;
    size: string;
    quantity: string;
    total: string;
    continueShopping: string;
    clearCart: string;
    shippingMethod: string;
    cartTotal: string;
    finalInfo: string;
    subtotal: string;
    shipping: string;
    proceedToCheckout: string;
    emptyCart: string;
  }
  
 export default interface Dictionary {
    header: HeaderLaunguage;
    footer: FooterLaunguage;
 
    Home: HomeLaunguage;
    Shop: ShopLaunguage;
    Contact: ContactLaunguage;
    ProductDetail: ProductDetailLaunguage;
    CheckOut:CheckOutLaunguage,
    Cart:CartLanguage
  }
  