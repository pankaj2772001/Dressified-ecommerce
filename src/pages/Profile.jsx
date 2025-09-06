import { useContext, useState } from "react"
import StoreProvider from "../contexts/StoreProvider"
import profile from "../assets/profile.jpg"

const Profile = () => {

    
   const {addAddress, address, updateAddress, deleteAddress} = useContext(StoreProvider)


   const [addressBtnVisibilty, setAddressBtnVisibilty] = useState(false)
   const [isEditing, setIsEditing] = useState(false)

   const [loading, setLoading] = useState(false)

   

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

    async function formHandler(event){
        event.preventDefault()

        setLoading(true)
        if(isEditing){

            const res = await updateAddress(formData)

            

            if(res.ok){
setLoading(false)
setAddressBtnVisibilty(false)
setIsEditing(false)
            }
            
        }else{

            
            const res = await addAddress(formData)

            if(res.ok){
                setLoading(false)
                setAddressBtnVisibilty(false)
                 
            }
           
            
        }

        
        setFormData({

        fullName: "",
        phoneNumber: "",
        pincode: "",
        add1: "",
        add2: "",
        city: "" 
 
        })

        
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
        <div className="row mx-4 px-3">

            <div className="col-md-6 mt-5">
                <div className="row p-4">
                    <div className="col-md-6">
                    <img src={profile} alt={profile} className="rounded-circle img-fluid "  />
                </div>
                
                <div className="col-md-6 mt-4">
                    <div><span><b>Full Name: </b></span><span>John Doe</span></div> <br />
                <div><span><b>Email: </b></span><span>JohnDoe123@gmail.com</span></div> <br />
                <div><span><b>Phone Number: </b></span><span>070 8674 8017</span></div> <br />
                <div><span><b>Gender: </b></span><span>Male</span></div>
                </div>
                </div>
                
                
                
            </div>

            
            <div className="col-md-6 py-3" >
                <h3 className="text-center mb-4">ADDRESSES</h3>


                {

                    address.length > 0 ? address?.map(add => (
                        <div className="border px-5 py-3 shadow-sm mb-4 rounded">
                            {/* <h5>{add.fullName.split(" ")?.map(word => word.toUpperCase()[0] + word.slice(1)).join(" ")}</h5> */}
                            <h5>{add.fullName}</h5>
                            <p>{add.add1}</p>
                            <p>{add.add2}</p>
                            <p>{add.city} - {add.pincode}</p>
                            <p>{add.phoneNumber}</p>
                            
                            <div>
                                <button className="btn btn-primary w-100 mb-3" onClick={() => {
                                setFormData(add)
                                setAddressBtnVisibilty(true)
                                setIsEditing(true)
                            }}>Edit Address</button>
                            <button className="btn btn-primary w-100" onClick={() => deleteAddress(add._id)}>Delete Address</button>
                         
                            </div>
                                
                            
                        

                        
                        </div>
                    )) : <p>No Address added yet.</p>
                }
            
               <br />   

                <button className="w-100 btn-secondary btn" onClick={() => addressBtnHandler()}> {addressBtnVisibilty === true ?  isEditing === true ? "Cancel Editing" : "Cancel" :  "+ Add a new address" }</button><br /><br />


{
    addressBtnVisibilty && 
    <form  className="text-center" onSubmit={formHandler}>

            <input type="text" placeholder="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required className="form-control"/><br />
            <input type="number" placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="form-control"/><br />
            <input type="number" placeholder="Pin Code" name="pincode" value={formData.pincode} onChange={handleChange} required className="form-control" /><br />
            <input type="text" placeholder="House No, Building Name" name="add1" value={formData.add1} onChange={handleChange} required className="form-control"/><br />
            <input type="text" placeholder="Road Name, Area, Colony" name="add2" value={formData.add2} onChange={handleChange} required  className="form-control"/><br />
            <input type="text" placeholder="City" name="city" value={formData.city} onChange={handleChange} required className="form-control"/><br />
            <button className="w-100 btn-secondary btn" type="submit">{isEditing ? loading ? "Updating..." : "Update Address" :  loading ? "Saving..." : "Save Address"}</button>

        </form>
}
                
            </div>

        
        
        
        </div>
    )
}

export default Profile