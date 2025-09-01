
import { useContext, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import StoreProvider from "../contexts/StoreProvider"

const Section = () => {

    const navigate = useNavigate()

    const [activeSection, setActiveSection] = useState()

    

    const location = useLocation()

     const sectionName = location.pathname.split("/")[2];
 

    function handleClick(sectionName){

      navigate(`/section/${sectionName}`)
        setActiveSection(sectionName)

    }

    return (
              
        
            <div className="d-flex justify-content-evenly my-3">

            <div style={{cursor: "pointer"  }}  className={`btn  ${sectionName === "Mens" && "btn-primary"} `} onClick={() => handleClick("Mens")}>
                Mens
            </div>
            <div style={{cursor: "pointer"}}  className={`btn  ${sectionName === "Womens" && "btn-primary"} `} onClick={() => handleClick("Womens")}>
                Womens
            </div>
            <div style={{cursor: "pointer"}}   className={`btn  ${sectionName === "Kids" && "btn-primary" } `}  onClick={() => handleClick("Kids")}>
                Kids
            </div>

        </div>
        
        
                       
            
    )
}

export default Section