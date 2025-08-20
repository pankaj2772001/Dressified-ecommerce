import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router"
import { NavLink } from "react-router"
import StoreProvider from "../contexts/StoreProvider"
import { FaHeart } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";



const Nav = () => {

    const [query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState([])

    const { products } = useContext(StoreProvider)

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
        <header className="bg-light  pb-1">
            <nav className="navbar container d-flex align-item-center">

                <div className="mt-3">
                    <Link className="nav-link" to={"/home"}> <h2 className=" text-dark">Dressified</h2> </Link>
                </div>
                


                


                <div className="">
                    <ul className="nav gap-5 mt-2">
                        <li>
                            <div >
                    
                    <div className="input-group">
                        <span class="input-group-text" ><CiSearch className="fs-5" /></span>
                        <input className="pe-5 ps-2 py-2 form-control " type="text" onChange={searchSuggestions} value={query} placeholder="What are you looking for?"  style={{width: "15rem"}}/> 
                    </div>
                        
                    
                    <div>
                        <ul className={`z-1 position-absolute mt-2 list-group list-group-flush rounded shadow-sm   ${suggestions.length > 0 && "overflow-y-scroll"}`}  style={{maxHeight: "300px"}} >

                        {suggestions.length > 0 ? suggestions?.map(item => <li className="list-group-item pe-5" style={{ cursor: "pointer" }}  onClick={() => {
                            navigate(`/section/${item.section}/category/${item.category}`);
                            setQuery('')
                            setSuggestions([])
                        }}>
                            <span> {item.category} - <b>in {item.section}</b></span>


                        </li>) : query ? <li className="list-group-item pe-5">No Categories Found</li> : null}

                    </ul>
                    </div>
                    
                </div>
                        </li>
                    <li className="nav-item">
                        <NavLink to={"/user"} className="nav-link position-relative"><FaUser className="fs-4 position-absolute"/></NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to={"/wishlist"} className="nav-link position-relative"><FaHeart className="fs-4" /><span class="position-absolute top-1 ms-2 translate-middle badge rounded-pill bg-primary">
                            10
                    
                        </span></NavLink>
                    </li>
                    <li className="nav-item ">
                        <NavLink to={"/cart"} className="nav-link  position-relative"><FaShoppingCart className="fs-4" /><span class="position-absolute top-1 ms-2 translate-middle badge rounded-pill bg-primary">
                            10
                            
                        </span></NavLink>
                    </li>
                    
                </ul>
                </div>
                
            </nav>

        </header>
    )
}

export default Nav