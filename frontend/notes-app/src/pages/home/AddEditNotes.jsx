import { useState } from "react"
import Taginputs from "../../components/input/Taginputs"
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
const AddEditNotes = ({notedata, type,getAllNotes,onclose,handleshowToast}) => {

    const [title,settitle]=useState(notedata?.title||"");
    const [content,setcontent]=useState(notedata?.content||"");
    const [tags,setTags]=useState(notedata?.tags||[]);
    const [error,seterror]=useState(null)

    const addnewnote = async()=>{
        try{
            const response = await axiosInstance.post("/add-note",{
                title,
                content,
                tags,
            })
            if(response.data &&response.data.note){}
                handleshowToast("Note Added Successfully","add")
                getAllNotes()
                onclose()
        }
        catch(error){
            if(error.response&&error.response.data&&error.response.data.message){
                seterror(error.response.message)
            }
        }

    };
    const editNote = async()=>{
        const noteId = notedata._id
        try{
            const response = await axiosInstance.put("/edit-note/"+noteId,{
                title,
                content,
                tags,
            })
            if(response.data &&response.data.note){}
                handleshowToast("Note Updated Successfully","edit")
                getAllNotes()
                onclose()
        }
        catch(error){
            if(error.response&&error.response.data&&error.response.data.message){
                seterror(error.response.message)
            }
        }
    };

    const handleaddnote=()=>{
        if(!title){
            seterror("please enter the title");
            return
        }
        if(!content){
            seterror("please enter the content");
            return
        }
        seterror("")
        if(type==="edit"){
            editNote()
        }else{
            addnewnote()
        }
    }


  return (
    <div className="relative">
        <button
            className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
            onClick={onclose}
        >
            <MdClose className="text-xl text-slate-400"/>
        </button>



        <div className="flex flex-col gap-2">
            <label className="input-label">TITLE</label>
            <input 
                type="text" 
                className="text-2xl text-slate-950 outline-none"
                placeholder ="Go To Gym At 5"
                value={title}
                onChange={({target})=>{settitle(target.value)}}
            />
        </div>
        <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">CONTENT</label>
            <textarea 
                type="text" 
                className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                placeholder ="content"
                rows={10}
                value={content}
                onChange={({target})=>setcontent(target.value)}
            />
        </div>
        <div className="mt-3">
            <label className="input-label">TAGS</label>
            <Taginputs tags={tags} setTags={setTags}></Taginputs>
        </div>
        {error&& <p className="text-red-500 text-xs pt-4">{error}</p>}

        <button 
            className="btn-primary font-medium mt-5 p-3"
            onClick={handleaddnote}
            >{type==="edit"?"UPDATE":"ADD"}
        </button>
    </div>
  )
}

export default AddEditNotes