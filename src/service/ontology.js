import { apiRequest, axiosInstance, ontologyApiRequest } from "./core/axios";

export const createOntology = async (data) => {
  return await apiRequest(() => axiosInstance.post("/api/ontology/generate-ontology", data));
};

export const getOntology = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();

  const endpoint = `/api/ontology/file/${queryString ? `?${queryString}` : ""}`;

  const markdown = await ontologyApiRequest(() => axiosInstance.get(endpoint));

  return markdown.data;
};

export const updateOntology = async (data) => {
  console.log(data);
  return await apiRequest(() => axiosInstance.put("/api/ontology/modify-ontology", data));
};

export const checkOntologyExists = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const endpoint = `/api/ontology/exists${queryString ? `?${queryString}` : ""}`;
  const response = await apiRequest(() => axiosInstance.get(endpoint));

  return response.data;
};
