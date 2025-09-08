import { useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { Campaign, AdGroup } from "./types";
import { CampaignDropdown } from "./components/CampaignDropdown";
import { AdGroupDropdown } from "./components/AdGroupDropdown";
import { DateRangePicker } from "./components/DateRangePicker";
import { KeywordTable } from "./components/KeywordTable";
import { DarkModeToggle } from "./components/DarkModeToggle";

function App() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );
  const [selectedAdGroup, setSelectedAdGroup] = useState<AdGroup | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const handleCampaignChange = (campaign: Campaign | null) => {
    setSelectedCampaign(campaign);
    setSelectedAdGroup(null); // Reset ad group when campaign changes
  };

  const handleAdGroupChange = (adGroup: AdGroup | null) => {
    setSelectedAdGroup(adGroup);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Keyword Analytics Dashboard
          </h1>
          <DarkModeToggle />
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - 1/3 width on desktop */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Filters
              </h2>

              <div className="space-y-4">
                <CampaignDropdown
                  selectedCampaign={selectedCampaign}
                  onCampaignChange={handleCampaignChange}
                />

                <AdGroupDropdown
                  selectedCampaign={selectedCampaign}
                  selectedAdGroup={selectedAdGroup}
                  onAdGroupChange={handleAdGroupChange}
                />

                <DateRangePicker
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                  disabled={!selectedAdGroup}
                />
              </div>
            </div>
          </div>

          {/* Right Panel - 2/3 width on desktop */}
          <div className="lg:col-span-2">
            <KeywordTable
              selectedAdGroup={selectedAdGroup}
              start={dateRange?.from || null}
              end={dateRange?.to || null}
              disabled={!selectedAdGroup || !dateRange?.from || !dateRange?.to}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
