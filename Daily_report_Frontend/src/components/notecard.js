import { useState,useEffect } from "react"

export default function NoteCard({id,isediting,noteText,onEdit, onDelete, onSave }){
    const [currentText, setCurrentText] = useState(noteText);
    const [editing, setEditing] = useState(isediting);

    useEffect(() => {
        setCurrentText(currentText);
        setEditing(editing);
    }, [currentText,editing]);

     // Handle text changes
    const handleTextChange = (e) => {
        setCurrentText(e.target.value);
    }

     // Toggle editing state
     const toggleEdit = () => {
        setEditing(!editing);
    }

    // Save and exit editing mode
    const handleSave = () => {
        onEdit(id,currentText);  // Update note text before saving
        onSave(id,currentText);
        toggleEdit();
    }

    return(
        <div className="w-56 md:w-56 md:h-80 w-1/2 h-1/2 shadow-2xl bg-gray-500  overflow-y-auto  scroll-auto m-2 p-2" style={{boxShadow:"1px 1px 20px red"}}>
        <div className="border  border-gray-800 p-2 w-full h-full flex flex-col">
        {
            editing?
            <textarea 
             className="w-full text-black focus:outline-none" 
             style={{height:'90%'}} 
             value={currentText}
             onChange={handleTextChange}  
            ></textarea>
            :<div  className=" text-black w-full font-semibold " style={{height:'90%',
                                                    wordWrap: "break-word", 
                                                    whiteSpace: "pre-wrap",
                                                    overflow: "auto",
                                                    WebkitOverflowScrolling:"touch",
                                                    msOverflowStyle:"none",
                                                    scrollbarWidth:"none" }} >
            {currentText}</div>
        }
        <div className="flex justify-end items-center space-x-2">
            {
                editing?
                <div className="text-bold cursor-pointer"  onClick={handleSave}>save</div>
                :<div className="text-bold cursor-pointer" onClick={toggleEdit}>edit</div>
            }
            <div className="text-bold"  onClick={() => onDelete(id)}>delete</div>

        </div>  
        </div> 
        </div>
    )
}