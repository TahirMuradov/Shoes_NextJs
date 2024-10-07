"use client"
import Image from "next/image";

const ProductAddedImage:React.FC<{
    Photo:File|null,
    onPhotoDelete: (name: string,dom:boolean) => void;
    CurrentPictureUrl:string|null|undefined,
    apiDomen:string
  }> = ({Photo,onPhotoDelete,CurrentPictureUrl,apiDomen}) => {
 
    if(CurrentPictureUrl){
        return(

        <div className="flex flex-wrap text-center" id={CurrentPictureUrl}>
            <input type="hidden" value={CurrentPictureUrl} name="CurrentPictureUrls" />
        <Image width={100} height={200} src={`${apiDomen}${CurrentPictureUrl}`} alt={CurrentPictureUrl} />
          <button 
          id={CurrentPictureUrl}
            type="button" 
            onClick={()=> onPhotoDelete(CurrentPictureUrl,true)}
            className="newPhotoDelete focus:outline-none
              text-white bg-red-700
               hover:bg-red-800 focus:ring-4 px-2
               focus:ring-red-300 font-medium rounded-lg text-sm
                me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900
                absolute">
            x
          </button>
        </div> 
        )
    }
    if (Photo) {
        const photoUrl=URL.createObjectURL(Photo);
        return (
            <div className="flex flex-wrap text-center" id={Photo.name}>
          <Image width={100} height={200} src={photoUrl} alt={Photo.name} />
            <button 
         
              type="button" 
              onClick={()=> onPhotoDelete(Photo.name,false)}
              className="newPhotoDelete focus:outline-none
                text-white bg-red-700
                 hover:bg-red-800 focus:ring-4 px-2
                 focus:ring-red-300 font-medium rounded-lg text-sm
                  me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900
                  absolute">
              x
            </button>
          </div>
          )  
    }

   return null
  }
  
  export default ProductAddedImage