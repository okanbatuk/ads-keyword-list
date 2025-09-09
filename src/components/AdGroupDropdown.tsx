import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAdGroups } from "../utils/api";
import { AdGroup, Campaign } from "../types";
import { StatusBadge } from "./StatusBadge";

interface AdGroupDropdownProps {
  selectedCampaign: Campaign | null;
  selectedAdGroup: AdGroup | null;
  onAdGroupChange: (adGroup: AdGroup | null) => void;
}

export const AdGroupDropdown: React.FC<AdGroupDropdownProps> = ({
  selectedCampaign,
  selectedAdGroup,
  onAdGroupChange,
}) => {
  const {
    data: adGroups,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adGroups", selectedCampaign?.id],
    queryFn: () => fetchAdGroups(selectedCampaign!.id),
    enabled: !!selectedCampaign,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const adGroupId = e.target.value;
    const adGroup = adGroups?.find((ag) => ag.id === Number(adGroupId)) || null;
    onAdGroupChange(adGroup);
  };

  if (!selectedCampaign) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-400 dark:text-gray-500">
          Ad Group
        </label>
        <select
          disabled
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
        >
          <option>Select a campaign first</option>
        </select>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Ad Group
        </label>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-10 rounded-md"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Ad Group
        </label>
        <div className="text-red-500 text-sm">Error loading ad groups</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Ad Group
      </label>
      <div className="relative">
        <select
          value={selectedAdGroup?.id || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">Select an ad group</option>
          {adGroups?.map((adGroup) => (
            <option key={adGroup.id} value={adGroup.id}>
              {adGroup.name}
            </option>
          ))}
        </select>
        {selectedAdGroup && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            <StatusBadge status={selectedAdGroup.status} />
          </div>
        )}
      </div>
    </div>
  );
};
