import React from 'react'

export default function CloudinaryImageUpload(props) {
    function handleWidget() {
        var myWidget = window.cloudinary.createUploadWidget({
            cloudName: 'duujsfghz', 
            uploadPreset: 'nweojrbp',
            sources: ['local', 'url', 'camera'], // Specify where images can be uploaded from
            clientAllowedFormats: ['image'], // Only allow image formats
            maxFileSize: 5000000, // Optional: Set a max file size (5MB in this case)
        }, 
        (error, result) => { 
            if (!error && result && result.event === "success") { 
                props.seturl(result.info.secure_url);
                props.setName(result.info.original_filename);
            }
        });
        myWidget.open();
    }

    return (
        <button 
            id="upload_widget" 
            className="cloudinary-button bg-white text-black font-semibold rounded-full p-2" 
            onClick={(e)=>{e.preventDefault(); handleWidget();}}>
            Select Image
        </button>
    );
}
