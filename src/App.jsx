import {
  BrowserRouter, Routes, Route,
  useLocation,
  Navigate
} from "react-router-dom";

import StoreProvider from "./contexts/StoreProvider";

import Nav from "./components/Nav";

import { useEffect, useState } from "react";
import ProductListing from "./pages/ProductListing";
import CategoryListing from "./pages/CategoryListing";
import ProductDetail from "./pages/ProductDetail";
import Section from "./components/Section";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import CheckOut from "./pages/CheckOut";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";



const StoreContent = () => {

  const [products, setProducts] = useState()
  const [size, setSize] = useState("")
  const [address, setAddress] = useState([])
  const [checkOutItems, setCheckOutItems] = useState({
    cartItems: "",
    totalAmount: "",
    address: "",
  })

  console.log(checkOutItems)


  console.log

  useEffect(() => {

    async function fetchProducts() {

      const res = await fetch('https://dressified-ecommerce-backend.vercel.app/products')

      const data = await res.json()

      setProducts(data.data.products)
    }

    fetchProducts()
  }, [])

  const [wishList, setWishList] = useState([])
  const [cart, setCart] = useState([])

  console.log(cart)

  const fetchWishList = async () => {

    try {

      const response = await fetch('https://dressified-ecommerce-backend.vercel.app/wishlist')

      const data = await response.json()

      setWishList(data)

    } catch (error) {

    }
  }

  const fetchCartItems = async () => {

    try {

      const response = await fetch("https://dressified-ecommerce-backend.vercel.app/cart")

      const data = await response.json()

      setCart(data)


    } catch (error) {

    }


  }



  const addToWishList = async (productId) => {


    const a = wishList.find((item) => {

      return item.product._id === productId
    })

    try {

      if (a === undefined) {

        const response = await fetch('https://dressified-ecommerce-backend.vercel.app/wishlist', {

          method: "POST",
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ product: productId })
        })

        if (response.ok) {

          notify("Item Added to wishlist")
        }
      }

      // if (!response.ok) throw new Error("Failed to add to wishlist");
      fetchWishList()

    } catch (error) {

    }

  }

  const removeWishList = async (itemId) => {

    console.log(itemId)

    try {

      const response = await fetch(`https://dressified-ecommerce-backend.vercel.app/wishList/${itemId}`, {

        method: "DELETE"
      })

      if (response.ok) {

        notify("Item removed from wishlist")
      }

      fetchWishList()
      fetchCartItems()


    } catch (error) {

    }


  }

  const notify = (msg) => toast(msg, {
    position: "bottom-right",
    autoClose: 700,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  })

  

  const addToCart = async (itemId, size) => {


    const ab = cart?.item.find((prod) => {

      return prod.selectedSize === size && prod.product._id === itemId
    })

    try {

      if (size.length != 0) {

        
          if(ab){

            updateCartItemQty(ab._id, "increement")

          }else{
            const response = await fetch("https://dressified-ecommerce-backend.vercel.app/cart", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ product: itemId, selectedSize: size })
        })

          }
        

        notify("Item added to the cart")
        setSize("")


      } else {

        notify("Please select a size")
      }

      fetchCartItems()



    } catch (error) {

    }

  }

  const removeCartItem = async (cartId) => {

    try {

      const response = await fetch(`https://dressified-ecommerce-backend.vercel.app/cart/${cartId}`, {

        method: "DELETE"
      })


      fetchCartItems()

    } catch (error) {

    }


  }

  const updateCartItemQty = async (cartItemId, actioned) => {

    console.log(cartItemId)
    console.log(actioned)

    try {

      const response = await fetch(`https://dressified-ecommerce-backend.vercel.app/cart/update/${cartItemId}`, {

        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: actioned })
      })

      if (response.ok) {

        notify("Cart item updated successfully")
      }

      fetchCartItems()

    } catch (error) {

    }
  }

  async function fetchAddress() {

    try {

      const response = await fetch('https://dressified-ecommerce-backend.vercel.app/address')

      const data = await response.json()

      setAddress(data)

    } catch (error) {

    }
  }



  useEffect(() => {
    fetchWishList()
    fetchCartItems()
    fetchAddress()

  }, [])

  const addAddress = async (formData) => {

    try {

      const response = await fetch('https://dressified-ecommerce-backend.vercel.app/address', {

        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({

          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          pincode: formData.pincode,
          add1: formData.add1,
          add2: formData.add2,
          city: formData.city
        })

      })

      fetchAddress()

    } catch (error) {

    }
  }


  const updateAddress = async (formData) => {

    const { _id } = formData

    try {

      const response = await fetch(`https://dressified-ecommerce-backend.vercel.app/address/update/${_id}`, {

        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(formData)
      })

      fetchAddress()

    } catch (error) {

    }
  }


  const deleteAddress = async (addressId) => {

    try {

      const response = await fetch(`https://dressified-ecommerce-backend.vercel.app/address/${addressId}`, {

        method: "DELETE"
      })

      fetchAddress()

    } catch (error) {

    }
  }

  const checkOut = async (checkOutItems) => {



    try {

      const response = await fetch("https://dressified-ecommerce-backend.vercel.app/order", {

        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          cartItems: checkOutItems.cartItems,
          address: checkOutItems.address,
          totalAmount: checkOutItems.totalAmount,
          orderDate: new Date().toISOString(),
        })
      })



      setCheckOutItems({
        cartItems: "",
        totalAmount: "",
        address: "",
      })

      return response



    } catch (error) {

      console.log('Failed to checkout')

    }
  }
  const location = useLocation()

  console.log(location)

  const hideSectionRoutes = ["/cart", "/wishlist", '/user', '/checkout', '/home']

  const shouldHideSection = hideSectionRoutes.some((path) => location.pathname.startsWith(path))



  function findCategorie(sectionName) {

    const filteredProducts = products?.filter((products => products.section === sectionName))


    const categories = filteredProducts?.map(product => product.category)



    const uniqueCategories = [...new Set(categories)]

    return uniqueCategories

  }


  useEffect(() => {

    setSize("")


  }, [location.pathname])

  console.log(size)



  const [deliveryFees, setDeliveryFees] = useState(5)



  return (
    <StoreProvider.Provider value={{ notify, products, addToWishList, wishList, removeWishList, addToCart, size, setSize, cart, removeCartItem, updateCartItemQty, addAddress, address, updateAddress, deleteAddress, checkOutItems, setCheckOutItems, checkOut, findCategorie, deliveryFees, setDeliveryFees }}>

      <ScrollToTop />

      <Nav />
      {!shouldHideSection && <Section />}


      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/section/:sectionName" element={<ProductListing />} />
        <Route path="/section/:sectionName/category/:categoryName" element={<ProductListing />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/user" element={<Profile />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/home" element={<Home />} />

      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={700}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
      <Footer />


    </StoreProvider.Provider>

  )




}



const App = () => {

  return (

    <BrowserRouter>
      <StoreContent />
    </BrowserRouter>
  )

}

export default App