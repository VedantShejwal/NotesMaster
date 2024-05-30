import {MdOutlinePushPin} from "react-icons/md"
import { MdCreate,MdDelete } from "react-icons/md"
import moment from "moment"

const Notecard = ({
    title,
    date,
    content,
    tags,
    ispinned,
    onedit,
    ondelete,
    onpinNote
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl tranition-all ease-in-out">
        <div className="flex items-center justify-between">
            <div>
                <h6 className="text-sm font-medium">{title}</h6>
                <span className="text-xs text-slate-500">{moment(date).format('Do MMM YYYY')}</span>
            </div>
            <MdOutlinePushPin className={`icon-btn ${ispinned?'text-primary':'text-slate-300'}`} onClick={onpinNote}/>
        </div>

        <p className="text-xs text-slate-600 mt-2">{content?.slice(0,60)}</p>
        
        <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-slate-500">{tags.map((item)=>`#${item} `)}</div>
            
            <div className="flex item-center gap-2">
                <MdCreate
                    className="icon-btn hover:text-green-600"
                    onClick={onedit}
                />

                <MdDelete
                    className="icon-btn hover:text-red-500"
                    onClick={ondelete}
                />
            </div>
        </div>
    </div>
  )
}

export default Notecard