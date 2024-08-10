import NoteCard from "../components/notecard";
import { useEffect, useState } from "react";

export default function Notes(){
    const [notecard,setNotecard]=useState([{id:0,editing:true,text:""}]);
    // Load notes from localStorage on initial render
    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotecard(storedNotes);
    }, []);

    //save note to local storage
    useEffect(()=>{
        console.log(notecard);
        localStorage.setItem('notes',JSON.stringify(notecard))
    },[notecard]);

     //add a new note card
     console.log(NoteCard)
     const setnote=()=>{
         setNotecard([...notecard,{id:Date.now(),editing:true,text:""}]);
     }

    //update note card
    const updateNote=(id,updatedText)=>{
        console.log(updatedText);
        setNotecard(notecard.map(note=>
            note.id === id ? { ...note, text: updatedText } : note
        ))
        console.log(notecard);
    }

    //delete note card
    const deleteNote = (id) => {
        setNotecard(notecard.filter(note => note.id !== id));
    }

     // Function to save a note
     const saveNote = (id,updatedText) => {
        setNotecard(notecard.map(note =>
            note.id === id ? { ...note, editing: false,text:updatedText } : note
        ));
        console.log(notecard);
    }
    
    return(
        <div className="bg-gray-900 flex flex-wrap m-auto overflow-y-auto justify-center   items-center   text-white w-full h-full p-3">
        {/*note card */}
        {
            notecard.map((note)=>{
               return <NoteCard 
               key={note.id}
                    id={note.id}
                    isediting={note.editing}
                    noteText={note.text}
                    onEdit={updateNote}  // Pass the update function
                    onDelete={() => deleteNote(note.id)}
                    onSave={saveNote}    // Pass the save function

                />
            })
        }
        {/*button */}
        
            <div className=" text-4xl p-2 font-bold rounded-full w-16 hover:bg-yellow-800 h-10 flex justify-center items-center bg-yellow-500 border borde-black text-black bottom-5 right-5 fixed cursor-pointer m-2" 
            onClick={(e)=>{e.preventDefault(); setnote();}}>+</div>
        </div>
    )
}