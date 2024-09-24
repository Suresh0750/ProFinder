"use client"

import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

export default function Intro() {
    const position = { lat: 53.54, lng: 10 };
    const [open, setOpen] = useState(false);

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API}>
            <div className='absolute' style={{ height: "50vh", width: "50%" }}>
                {/* Map component */}
                <Map zoom={9} center={position} mapId={process.env.NEXT_PUBLIC_Map_ID}>
                    {/* Marker with Pin */}
                    <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                        <Pin background={'grey'} borderColor={'green'} glyphColor={"purple"} />
                    </AdvancedMarker>

                    {/* InfoWindow that opens on marker click */}
                    {open && (
                        <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                            <div>
                                <h2>Your location</h2>
                                <button 
                                    onClick={() => setOpen(false)} 
                                    style={{
                                        padding: '5px 10px', 
                                        backgroundColor: 'red', 
                                        color: 'white', 
                                        borderRadius: '5px',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </InfoWindow>
                    )}
                </Map>
            </div>
        </APIProvider>
    );
}
