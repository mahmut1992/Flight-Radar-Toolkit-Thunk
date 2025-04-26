import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import getIcon from "../utils/getIcon";
import { closePopup, open, openPopup } from "../redux/slices/detailSlice";
import c from "../utils/nullcheck";
import { useEffect } from "react";
import { getFlights } from "../redux/actions";

const Map = () => {
  const { flights } = useSelector((store) => store.flight);
  const { info, route, popupOpen } = useSelector((store) => store.detail);

  const dispatch = useDispatch();
  // useEffect(() => {
  //  const id= setInterval(() => {
  //     dispatch(getFlights());
  //   }, 2000);
  //! ComponontWillAmmount : map sayfasından çıkınca durmalı
  //return () => clearInterval(id)
  // }, []);
  return (
    <MapContainer
      center={[39.160034, 35.345581]}
      zoom={6}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {(info
        ? [flights.find((flight) => flight.id === info?.identification?.id)]
        : flights
      )
        ?.filter(Boolean)
        .map((flight) => (
          <Marker
            key={flight.id}
            position={[flight.lat, flight.lng]}
            icon={getIcon(flight.deg, info?.identification?.id === flight?.id)}
            eventHandlers={{
              click: () => dispatch(openPopup()),
            }}
          >
            {popupOpen && (
              <Popup>
                <div className="popup">
                  <span>Kod: {flight.code} </span>
                  <button
                    onClick={() => {
                      dispatch(open(flight.id));
                      dispatch(closePopup());
                    }}
                  >
                    Detay
                  </button>
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      {/* Uçağın rotasını çizdik */}
      {route?.length > 0 && <Polyline positions={route} />}
      {/* uçağın kalktığı ve ineceği havaalanı */}
      {info?.airport?.origin?.position && (
        <Marker
          position={[
            info?.airport?.origin?.position?.latitude,
            info?.airport?.origin?.position?.longitude,
          ]}
        >
          <Popup>
            <div className="popup">
              <span>Kalkış</span>
              <span>
                {c(info.airport.origin.position?.country?.name)} /{" "}
                {c(info.airport.origin.position.region?.city)}
              </span>
            </div>
          </Popup>
        </Marker>
      )}

      {info?.airport?.origin?.position && (
        <Marker
          position={[
            info?.airport?.destination?.position?.latitude,
            info?.airport?.destination?.position?.longitude,
          ]}
        >
          <Popup>
            <div className="popup">
              <span>Varış</span>
              <span>
                {c(info.airport.destination.position?.country?.name)} /{" "}
                {c(info.airport.destination.position?.region?.city)}
              </span>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
