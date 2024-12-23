"use client"


import {useState} from 'react'
import {GOOGLE_API,Map_ID} from '@/lib/server/environment'


import {APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow
} from '@vis.gl/react-google-maps'

export default function Intro(){
    const position= {lat:38.897699700000004,lng:-77.03655315}
    const [open,setOpen] = useState(false)
    return(
        <APIProvider apiKey={GOOGLE_API || ''}>
            <div style={{height:"100vh",width:"100%"}}>
               <Map zoom={9} center={position} mapId={Map_ID}>
                    <AdvancedMarker position={position} onClick={()=>setOpen(true)}>
                        <Pin background={'grey'} borderColor={'green'} glyphColor={"purple"}/>
                    </AdvancedMarker>
                    {
                        open && <InfoWindow position={position} onCloseClick={()=>setOpen(false)}><h2>Your location</h2></InfoWindow>
                    }
               </Map>
            </div>
        </APIProvider>
    )
}
