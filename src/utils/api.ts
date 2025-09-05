import axios from 'axios'
import { Campaign, AdGroup, Keyword } from '../types'

const api = axios.create({
  baseURL: '/api',
})

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  const response = await api.get('/campaign')
  return response.data
}

export const fetchAdGroups = async (campaignId: number): Promise<AdGroup[]> => {
  const response = await api.get(`/adgroup/${campaignId}`)
  return response.data
}

export const fetchKeywords = async (
  adGroupId: number,
  startDate: string,
  endDate: string,
  page: number = 1,
  limit: number = 10,
  search?: string,
  sortField?: string,
  sortDirection?: string
): Promise<{ keywords: Keyword[]; total: number; page: number; limit: number }> => {
  const params = new URLSearchParams({
    start: startDate,
    end: endDate,
    page: page.toString(),
    limit: limit.toString(),
  })

  if (search) {
    params.append('search', search)
  }
  if (sortField) {
    params.append('sortField', sortField)
  }
  if (sortDirection) {
    params.append('sortDirection', sortDirection)
  }

  const response = await api.get(`/keyword/${adGroupId}?${params}`)
  return response.data
}
