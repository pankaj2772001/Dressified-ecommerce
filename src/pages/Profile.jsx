import { useContext, useState } from "react"
import StoreProvider from "../contexts/StoreProvider"

const Profile = () => {

    
   const {addAddress, address, updateAddress, deleteAddress} = useContext(StoreProvider)


   const [addressBtnVisibilty, setAddressBtnVisibilty] = useState(false)
   const [isEditing, setIsEditing] = useState(false)

   console.log(address)

    const [formData, setFormData] = useState({

        fullName: "",
        phoneNumber: "",
        pincode: "",
        add1: "",
        add2: "",
        city: "" 

    })


    function handleChange(event){

        const {name, value} = event.target

        setFormData(prevValue => ({...prevValue,[name]: name === "phoneNumber" && "pincode" ? parseInt(value) : value}))

    }

    function formHandler(event){
        event.preventDefault()

        if(isEditing){

            updateAddress(formData)
            setIsEditing(false)
        }else{
            addAddress(formData)
        }

        
        setFormData({

        fullName: "",
        phoneNumber: "",
        pincode: "",
        add1: "",
        add2: "",
        city: "" 
 
        })

        setAddressBtnVisibilty(false)
    }


    function addressBtnHandler(){

        setAddressBtnVisibilty(!addressBtnVisibilty)
        setIsEditing(false)

        if(addressBtnVisibilty === false){

            setFormData({

        fullName: "",
        phoneNumber: "",
        pincode: "",
        add1: "",
        add2: "",
        city: "" 
 
        })
        }


    }




    return(
        <div className="d-flex ">

            <div style={{width: "50vw"}}>
                <img src="" alt="" />
                <div><h5>Full Name: </h5><p>John Doe</p></div>
                <div><h5>Email:</h5><p>JohnDoe123@gmail.com</p></div>
                <div><h5>Phone Number</h5><p>070 8674 8017</p></div>
                <div><h5>Gender: </h5><p>Male</p></div>
                
            </div>
            <div style={{width: "50vw"}}>
                <h3>ADDRESS</h3>


                {

                    address.length > 0 ? address?.map(add => (
                        <div className="card border">
                            <p>{add.fullName}</p>
                            <p>{add.phoneNumber}</p>
                            <p>{add.pincode}</p>
                            <p>{add.add1}</p>
                            <p>{add.add2}</p>
                            <p>{add.city}</p>
                            <button onClick={() => {
                                setFormData(add)
                                setAddressBtnVisibilty(true)
                                setIsEditing(true)
                            }}>Edit Address</button>
                            <button onClick={() => deleteAddress(add._id)}>Delete Address</button>
                        

                        
                        </div>
                    )) : "No Address"
                }
            
               <br />   

                <button onClick={() => addressBtnHandler()}> {addressBtnVisibilty === true ?  isEditing === true ? "Cancel Editing" : "Cancel" :  "+ Add a new address" }</button><br /><br />


{
    addressBtnVisibilty && 
    <form onSubmit={formHandler}>

            <input type="text" placeholder="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required/><br /><br />
            <input type="number" placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required/><br /><br />
            <input type="number" placeholder="Pin Code" name="pincode" value={formData.pincode} onChange={handleChange} required/><br /><br />
            <input type="text" placeholder="add1" name="add1" value={formData.add1} onChange={handleChange} required/><br /><br />
            <input type="text" placeholder="add2" name="add2" value={formData.add2} onChange={handleChange} required/><br /><br />
            <input type="text" placeholder="City" name="city" value={formData.city} onChange={handleChange} required/><br /><br /> 
            <button type="submit">{isEditing ? "Update Address" : "Save Address"}</button>

        </form>
}
                
            </div>

        
        
        
        </div>
    )
}

export default Profile