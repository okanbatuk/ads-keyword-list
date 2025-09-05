import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCampaigns } from '../utils/api'
import { Campaign } from '../types'
import { StatusBadge } from './StatusBadge'

interface CampaignDropdownProps {
  selectedCampaign: Campaign | null
  onCampaignChange: (campaign: Campaign | null) => void
}

export const CampaignDropdown: React.FC<CampaignDropdownProps> = ({
  selectedCampaign,
  onCampaignChange,
}) => {
  const { data: campaigns, isLoading, error } = useQuery({
    queryKey: ['campaigns'],
    queryFn: fetchCampaigns,
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const campaignId = parseInt(e.target.value)
    const campaign = campaigns?.find(c => c.id === campaignId) || null
    onCampaignChange(campaign)
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Campaign
        </label>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-10 rounded-md"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Campaign
        </label>
        <div className="text-red-500 text-sm">Error loading campaigns</div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Campaign
      </label>
      <div className="relative">
        <select
          value={selectedCampaign?.id || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">Select a campaign</option>
          {campaigns?.map((campaign) => (
            <option key={campaign.id} value={campaign.id}>
              {campaign.name}
            </option>
          ))}
        </select>
        {selectedCampaign && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            <StatusBadge status={selectedCampaign.status} />
          </div>
        )}
      </div>
    </div>
  )
}
