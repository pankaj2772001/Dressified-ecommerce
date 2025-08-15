import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router"
import { NavLink } from "react-router"
import StoreProvider from "../contexts/StoreProvider"

const Nav = () => {

    const [query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState([])

    const {products} = useContext(StoreProvider)

    const navigate = useNavigate()

    function searchSuggestions(event){

        const value = event.target.value.toLowerCase()
        setQuery(value)

        if(!value.trim()){

            setSuggestions([])

            return
        }
      const matchedProducts = products?.filter((item) =>
      item.category.toLowerCase().includes(value)
    )

    setSuggestions(matchedProducts || [])

    }

    return (
        <header className="bg-light">
            <nav className="navbar container">

                <Link className="nav-link" to={"/home"}> <h2 className="navbar-brand text-dark">Dressified</h2> </Link>


                <div>
                    <input type="text" onChange={searchSuggestions} value={query} placeholder="Search by products"/>
                <ul>

                    {suggestions.length > 0 ? suggestions?.map(item => <li onClick={() => { 
                        navigate(`/section/${item.section}/category/${item.category}`); 
                        setQuery('')
                        setSuggestions([]) 
                        }}>
                    <span> {item.category} - <b>in {item.section}</b></span> 
                    
                        
                         </li>) : query ? <li>No Product Found</li> : null}
                    
                </ul>
                </div>
                


                <ul className="nav gap-5">
                   
                    <li className="nav-item">
                        <NavLink to={"/wishlist"} className="nav-link">❤️</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/cart"} className="nav-link">🛒</NavLink>
                    </li>
                     <li className="nav-item">
                        <NavLink to={"/user"} className="nav-link">Profile</NavLink>
                    </li>
                </ul>
            </nav>

        </header>
    )
}

export default Nav