import axios from "axios";
import { Campaign, AdGroup, Keyword } from "../types";

const api = axios.create({
  baseURL: "/api",
});

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  const res = await api.get("/campaign");
  return res.data.data.map((c: any) => ({ ...c, id: Number(c.id) }));
};

export const fetchAdGroups = async (campaignId: number): Promise<AdGroup[]> => {
  const res = await api.get(`/adgroup/${campaignId}`);
  return res.data.data.map((c: any) => ({ ...c, id: Number(c.id) }));
};

export const fetchKeywords = async (
  adGroupId: number,
  startDate: string,
  endDate: string,
  page: number = 1,
  limit: number = 10,
  search?: string,
  sortField?: string,
  sortDirection?: string,
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

  if (search) params.append("search", search);
  if (sortField) params.append("sortField", sortField);

  if (sortDirection) params.append("sortDirection", sortDirection);

  const res = await api.get(`/keyword/${adGroupId}?${params}`);
  return res.data.data.map((c: any) => ({ ...c, id: Number(c.id) }));
};
