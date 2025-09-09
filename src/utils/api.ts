import axios, { AxiosInstance } from "axios";
import { Account, Campaign, AdGroup, Keyword } from "../types";

let instance: AxiosInstance | null = null;

export const getApi = (): AxiosInstance => {
  if (!instance) {
    const baseURL = (import.meta as any).env?.VITE_API_URL + "/api";
    if (!baseURL) throw new Error("VITE_API_URL doesn't exist!");
    instance = axios.create({ baseURL });
  }
  return instance;
};

export const fetchAccounts = async (): Promise<Account[]> => {
  const api = getApi();
  const res = await api.get("/account");
  return res.data.data.map((c: any) => ({ ...c, id: Number(c.id) }));
};

export const fetchCampaigns = async (
  accountId?: number,
): Promise<Campaign[]> => {
  const api = getApi();
  const url = accountId ? `/campaign/${accountId}` : "/campaign";
  const res = await api.get(url);
  return res.data.data.map((c: any) => ({ ...c, id: Number(c.id) }));
};

export const fetchAdGroups = async (campaignId: number): Promise<AdGroup[]> => {
  const api = getApi();
  const res = await api.get(`/adgroup/${campaignId}`);
  return res.data.data.map((c: any) => ({ ...c, id: Number(c.id) }));
};

export const fetchKeywords = async (
  adGroupId: number,
  start: string,
  end: string,
  page: number = 1,
  limit: number = 50,
): Promise<{
  keywords: Keyword[];
  total: number;
  page: number;
  limit: number;
}> => {
  const params = new URLSearchParams({
    start: start,
    end: end,
    page: page.toString(),
    limit: limit.toString(),
  });

  const api = getApi();
  const res = await api.get(`/keyword/${adGroupId}?${params}`);
  const payload = res.data.data;

  return {
    ...payload,
    keywords: payload.keywords.map((k: any) => ({
      ...k,
      id: Number(k.id),
      avgQs: Number(k.avgQs),
    })),
  };
};
