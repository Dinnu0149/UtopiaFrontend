// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });

// const mapContainerStyle = {
//   width: "100%",
//   height: "400px",
// };

// function MapDisplay({ location }) {
//   return (
//     <div>
//       {location.latitude && location.longitude && (
//         <div className="mt-3">
//           <h5>Your Location on the Map</h5>
//           <MapContainer
//             center={[location.latitude, location.longitude]}
//             zoom={13}
//             style={mapContainerStyle}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution="&copy; OpenStreetMap contributors"
//             />
//             <Marker position={[location.latitude, location.longitude]}>
//               <Popup>Your Location</Popup>
//             </Marker>
//           </MapContainer>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MapDisplay;
