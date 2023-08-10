import { useState, useEffect } from "react"
import Placeholder from "../images/film-poster-placeholder.png"

export const useImage = src => {  
    const [sourceLoaded, setSourceLoaded] = useState(null)

    if(src === "https://image.tmdb.org/t/p/w500/undefined"){
      src = Placeholder
    }
  
    useEffect(() => {
      const img = new Image()
      img.src = src
      img.onload = () => setSourceLoaded(src)
    }, [src])
  
    return sourceLoaded 
  }

  export default useImage