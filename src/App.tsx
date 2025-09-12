import { useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { Account, Campaign, AdGroup } from "./types";
import { AccountDropdown } from "./components/AccountDropdown";
import { CampaignDropdown } from "./components/CampaignDropdown";
import { AdGroupDropdown } from "./components/AdGroupDropdown";
import { DateRangePicker } from "./components/DateRangePicker";
import { KeywordTable } from "./components/KeywordTable";
import { DarkModeToggle } from "./components/DarkModeToggle";

function App() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );
  const [selectedAdGroup, setSelectedAdGroup] = useState<AdGroup | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const handleAccountChange = (account: Account | null) => {
    setSelectedAccount(account);
    setSelectedCampaign(null);
    setSelectedAdGroup(null);
  };

  const handleCampaignChange = (campaign: Campaign | null) => {
    setSelectedCampaign(campaign);
    setSelectedAdGroup(null);
  };

  const handleAdGroupChange = (adGroup: AdGroup | null) => {
    setSelectedAdGroup(adGroup);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-1">
            <svg
              className="h-8 w-8 text-emerald-500 dark:text-emerald-400"
              viewBox="0 0 50 50"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M9.037,40.763h4.286c0.552,0,1-0.447,1-1v-7.314c0-0.553-0.448-1-1-1H9.037c-0.552,0-1,0.447-1,1v7.314
	C8.037,40.315,8.485,40.763,9.037,40.763z M10.037,33.448h2.286v5.314h-2.286V33.448z"
              />
              <path
                d="M21.894,40.763c0.552,0,1-0.447,1-1v-20.64c0-0.553-0.448-1-1-1h-4.286c-0.552,0-1,0.447-1,1v20.64
	c0,0.553,0.448,1,1,1H21.894z M18.608,20.123h2.286v18.64h-2.286V20.123z"
              />
              <path
                d="M30.465,40.763c0.552,0,1-0.447,1-1V25.96c0-0.553-0.448-1-1-1H26.18c-0.552,0-1,0.447-1,1v13.803
	c0,0.553,0.448,1,1,1H30.465z M27.18,26.96h2.286v11.803H27.18V26.96z"
              />
              <path
                d="M33.751,9.763v30c0,0.553,0.448,1,1,1h4.286c0.552,0,1-0.447,1-1v-30c0-0.553-0.448-1-1-1h-4.286
	C34.199,8.763,33.751,9.21,33.751,9.763z M35.751,10.763h2.286v28h-2.286V10.763z"
              />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Keyword Analytics
            </h1>
          </div>
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
                <AccountDropdown
                  selectedAccount={selectedAccount}
                  onAccountChange={handleAccountChange}
                />

                <CampaignDropdown
                  selectedAccount={selectedAccount}
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
