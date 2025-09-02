import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router"
import { NavLink } from "react-router"
import StoreProvider from "../contexts/StoreProvider"
import { FaHeart } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "../assets/Dressified1.png"



const Nav = () => {

    const [query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState([])

    const { products, wishList, cart } = useContext(StoreProvider)

    console.log(cart)

    const navigate = useNavigate()

    function searchSuggestions(event) {

        const value = event.target.value.toLowerCase()
        setQuery(value)

        if (!value.trim()) {

            setSuggestions([])

            return
        }
        const matchedProducts = products?.filter((item) =>
            item.category.toLowerCase().includes(value)
        )

        setSuggestions(matchedProducts || [])

    }

    return (
        <header className="bg-light sticky-top shadow-sm">
            <nav className="navbar navbar-expand-lg container">
                <div className="container-fluid">

                     <Link className="nav-link d-flex align-items-center" to={"/home"}> <img src={Logo} alt="Brand" width={"110rem"}/> </Link>




<div>
    <button className="navbar-toggler mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>





                <div className="collapse navbar-collapse mt-3" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item me-5">

                            <div className="input-group">
                                <span className="input-group-text" ><CiSearch className="fs-5" /></span>
                                <input className="pe-5 ps-2 py-2 form-control " type="text" onChange={searchSuggestions} value={query} placeholder="What are you looking for?" style={{ width: "15rem" }} />
                            </div>


                            <div>
                                <ul className={`z-1 position-absolute mt-2 list-group list-group-flush rounded shadow-sm   ${suggestions.length > 0 && "overflow-y-scroll"}`} style={{ maxHeight: "300px" }} >

                                    {suggestions.length > 0 ? suggestions?.map(item => <li className="list-group-item pe-5" style={{ cursor: "pointer" }} onClick={() => {
                                        navigate(`/section/${item.section}/category/${item.category}`);
                                        setQuery('')
                                        setSuggestions([])
                                    }}>
                                        <span> {item.category} - <b>in {item.section}</b></span>


                                    </li>) : query ? <li className="list-group-item pe-5">No Categories Found</li> : null}

                                </ul>
                            </div>



                        </li>

                        <li className="nav-item">
                            <ul className="navbar-nav gap-4 ">

                                <li className="nav-item">
                                    <NavLink to={"/user"} className="nav-link position-relative"><FaUser className="fs-4" /></NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink to={"/wishlist"} className="nav-link position-relative"><FaHeart className="fs-4 " />{wishList.length > 0 && <span class="position-absolute top-1 ms-2 translate-middle badge rounded-pill bg-primary">{wishList.length}
                                    </span>}

                                    </NavLink>
                                </li>
                                <li className="nav-item ">
                                    <NavLink to={"/cart"} className="nav-link  position-relative"><FaShoppingCart className="fs-4" />{cart.item?.length > 0 && <span class="position-absolute top-1 ms-2 translate-middle badge rounded-pill bg-primary">{cart.item?.length}

                                    </span>}</NavLink>
                                </li>

                            </ul>
                        </li>

                    </ul>

                </div>
                                    
</div>
        
                </div>




               

            </nav>

        </header>
    )
}

export default Nav