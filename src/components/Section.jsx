
import { useContext } from "react"
import { useNavigate } from "react-router"
import StoreProvider from "../contexts/StoreProvider"

const Section = () => {

    const navigate = useNavigate()

    

    function handleClick(sectionName){

      navigate(`/section/${sectionName}`)

    }

    return (
              
        <div className="d-flex justify-content-evenly my-3">

            <div onClick={() => handleClick("Mens")}>
                Mens
            </div>
            <div onClick={() => handleClick("Womens")}>
                Womens
            </div>
            <div onClick={() => handleClick("Kids")}>
                Kids
            </div>

        </div>
                       
            
    )
}

export default Section