import axios, { AxiosInstance } from "axios";
import { Campaign, AdGroup, Keyword } from "../types";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL + "/api",
// });
//
let instance: AxiosInstance | null = null;

export const getApi = (): AxiosInstance => {
  if (!instance) {
    const baseURL = (import.meta as any).env?.VITE_API_URL + "/api";
    if (!baseURL) throw new Error("VITE_API_URL doesn't exist!");
    instance = axios.create({ baseURL });
  }
  return instance;
};

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  const api = getApi();
  const res = await api.get("/campaign");
  return res.data.data.map((c: any) => ({ ...c, id: Number(c.id) }));
};

export const fetchAdGroups = async (campaignId: number): Promise<AdGroup[]> => {
  const api = getApi();
  const res = await api.get(`/adgroup/${campaignId}`);
  return res.data.data.map((c: any) => ({ ...c, id: Number(c.id) }));
};

export const fetchKeywords = async (
  adGroupId: number,
  startDate: string,
  endDate: string,
  page: number = 1,
  limit: number = 50,
): Promise<{
  keywords: Keyword[];
  total: number;
  page: number;
  limit: number;
}> => {
  const params = new URLSearchParams({
    start: startDate,
    end: endDate,
    page: page.toString(),
    limit: limit.toString(),
  });

  const api = getApi();
  const res = await api.get(`/keyword/${adGroupId}?${params}`);
  const payload = res.data.data;

  return {
    ...payload,
    keywords: payload.keywords.map((k: any) => ({ ...k, id: Number(k.id) })),
  };
};
