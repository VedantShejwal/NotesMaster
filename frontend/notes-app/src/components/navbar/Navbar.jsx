import { useNavigate } from "react-router-dom";
import Profileinfo from "../cards/Profileinfo"
import Searchbar from "../searchbar/Searchbar";
import { useState } from "react";

const Navbar = ({userInfo,onsearchNote,handleclearSearch,login}) => {

const [searchquery, setSearchquery] = useState("");
const navigate=useNavigate(null);

const onLogout=()=>{
  localStorage.clear()
  navigate("/login");
}

const handleSearch=()=>{
  if(searchquery){
    onsearchNote(searchquery)
  }
}

const onClearsearch=()=>{
  setSearchquery("");
  handleclearSearch()
}
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className="text-xl font-medium text-black py-2">Notes</h2>
        {!login&&(<Searchbar 
          value={searchquery} 
          onChange={({target})=>{
            setSearchquery(target.value);
          }}
          handleSearch={handleSearch}
          onClearsearch={onClearsearch}
        />)}
        <Profileinfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  )
}

export default Navbar
