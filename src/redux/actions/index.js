import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
//Türkiye üzerinde uçan tüm uçakların verilerini çeken action
export const getFlights = createAsyncThunk("flight/getFlights", async () => {
  const params = {
    bl_lat: "34.457212",
    bl_lng: "24.609666",
    tr_lat: "43.68837",
    tr_lng: "47.224147",
    limit: "300",
    speed: "2,9999999999",
  };
  const res = await api.get("/flights/list-in-boundary", { params });

  // Api den gelen veri formatı

  //! [["edlc46",123,455]]

  // Projede kullanmamız gereken daha okunaklı olan veri formatı

  //! [{id:"edlc46",lat:123,lng:455}]

  const formatted = res.data.aircraft.map((item) => ({
    id: item[0],
    code: item[1],
    lat: item[2],
    lng: item[3],
    deg: item[4],
  }));

  return formatted;
});

// id üzerinden uçuş detaylarını sağlayan action

export const getDetail = createAsyncThunk(
  "detail/getDetails",
  async (flightId) => {
    const params = {
      flight: flightId,
    };

    const res = await api.get(`/flights/detail`, { params });

    return res.data;
  }
);
