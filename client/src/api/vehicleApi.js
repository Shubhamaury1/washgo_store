import API from "./axios";

const vehicleApi = {
  getVehicles: () => API.get("/vehicles"),

  createVehicle: (data) =>
    API.post("/vehicles", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  
  updateVehicle: (id, data) =>
    API.put(`/vehicles/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  toggleStatus: (id) => API.patch(`/vehicles/${id}/status`),
  deleteVehicle: (id) => API.delete(`/vehicles/${id}`),
};

export default vehicleApi;
