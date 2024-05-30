import Navbar from "../../components/navbar/Navbar"
import Notecard from "../../components/cards/Notecard"
import {MdAdd} from "react-icons/md"
import AddEditNotes from "./AddEditNotes"
import { useEffect, useState } from "react"
import Modal from "react-modal"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import Toast from "../../components/ToastMessage/Toast"
import Emptycard from "../../components/Emptycard/Emptycard"

const Home =()=>{

    const [openAddEditModal, setOpenAddEditModal] = useState({
       isShown:false,
       type:"add",
       data:null, 
    })

    const [showToastMsg, setshowToastMsg] = useState({
        isShown:false,
        message:"",
        type:"add"
    })

    const [AllNotes, setAllNotes] = useState([])
    const [userInfo,setUserInfo] = useState(null);

    const [isSearch, setisSearch] = useState(false)

    const navigate = useNavigate();

    const handleEdit = (noteDetails) =>{
        setOpenAddEditModal({ 
            isShown:true,
            type:"edit",
            data:noteDetails,
        })
    }

    const handleshowToast =(message,type)=>{
        setshowToastMsg({
            isShown:true,
            message:message,
            type:type
        })
    }

    const handlecloseToast =()=>{
        setshowToastMsg({
            isShown:false,
            message:"",
        })
    }

    const getUserInfo = async()=>{
        try{
            const response = await axiosInstance.get("get-user");
            if(response.data && response.data.user){
                setUserInfo(response.data.user);
            }
        } catch (error){
            if(error.response.status===401){
                localStorage.clear();
                navigate("/login")
            }
        }
    }

    const getAllNotes = async()=>{
        try{
            const response = await axiosInstance.get("/get-all-notes");
            if(response.data && response.data.notes){
                setAllNotes(response.data.notes);
            }
        } catch (error){
            console.log("error")
        }
    }

    const deleteNote = async (data) => {
        const noteId = data._id
        try{
            const response = await axiosInstance.delete("/delete-note/"+noteId)
            if(response.data && !response.data.error){
                handleshowToast("Note Deleted Successfully","delete")
                getAllNotes()
            }
        }
        catch(error){
            if(error.response&&error.response.data&&error.response.data.message){
                console.log(error.response.message)
            }
        }}

    const onsearchNote = async (query) => {
        try{
            const response = await axiosInstance.get("/search-notes/",{
                params:{query},
            })
            if(response.data && response.data.notes){
                setisSearch(true)
                setAllNotes(response.data.notes)}
        }
        catch(error){
                console.log(error)
        }}

    const handleclearSearch = async () => {
        setisSearch(false)
        getAllNotes()
    }

    const updateisPinned = async (notedata) => {
        
        const noteId = notedata._id
        try{
            const response = await axiosInstance.put("/update-note-pinned/"+noteId,{
                ispinned:!notedata.ispinned
            })
            if(response.data &&response.data.note){
                handleshowToast("Note Updated Successfully","ispinned")
                getAllNotes()
            }
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
      getAllNotes()
      getUserInfo()
      return () => {}
    },[] )
    


    return(
        <div>
            <Navbar 
                userInfo={userInfo} 
                onsearchNote={onsearchNote}
                handleclearSearch={handleclearSearch}
                login={false}
                />
            <div className="container mx-auto">
                {AllNotes.length>0?
                (<div className="grid grid-cols-3 gap-4 mt-8">
                
                {AllNotes.map((item)=>(
                    
                    <Notecard 
                        key={item._id}
                        title={item.title}
                        date={item.createdOn}
                        content={item.content}
                        tags={item.tags}
                        ispinned={item.ispinned}
                        onedit={()=>handleEdit(item)}
                        ondelete={()=>{deleteNote(item)}}
                        onpinNote={()=>{updateisPinned(item)}}
                    />
                ))}
                </div> ): 
                <Emptycard 
                    message={isSearch?"Oops! no notes found...":"Start creating your first note! Click the 'Add' button"}/>
                }
            </div>
            <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" 
                onClick={()=>{
                    setOpenAddEditModal({
                        isShown:true,
                        type:"add",
                        data:null, 
                    })
                }}>
                <MdAdd className="text-[32px] text-white"></MdAdd>
            </button>

            <Modal
                isOpen = {openAddEditModal.isShown}
                onRequestClose={()=>{}}
                style={{
                    overlay:{
                        backgroundColor:"rgba(0,0,0,0.2)",
                    },
                }}
                    contentLabels=""
                    className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow"
                >
                    <AddEditNotes 
                        type={openAddEditModal.type}
                        notedata={openAddEditModal.data}
                        onclose={()=>{
                            setOpenAddEditModal({
                            isShown:false,
                            type:"add",
                            data:null, 
                        })
                    }}
                        getAllNotes={getAllNotes} 
                        handleshowToast={handleshowToast}
                    />
            </Modal>

            <Toast
                isShown={showToastMsg.isShown}
                message={showToastMsg.message}
                type={showToastMsg.type}
                onclose={handlecloseToast}
            />

        </div>
    )
}

export default Home