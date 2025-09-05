# Keyword List App

A React + TypeScript + TailwindCSS + Vite single-page application for analyzing keyword data from advertising campaigns.

## Features

- **Campaign & Ad Group Selection**: Dropdown menus with status badges (ENABLED=green, others=red)
- **Date Range Picker**: Select custom date ranges for keyword analysis (defaults to last 30 days)
- **Keyword Table**: Paginated table with search and sorting capabilities
- **Dark Mode**: Toggle between light and dark themes with localStorage persistence
- **Responsive Design**: Split layout (1/3 left panel, 2/3 right panel) that stacks on mobile

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## API Contract

The application connects to the API at `https://ads-script-api.onrender.com` through a proxy configuration.

### Endpoints

#### GET /api/campaign
Returns a list of campaigns.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Campaign Name",
    "status": "ENABLED"
  }
]
```

#### GET /api/adgroup/{campaignId}
Returns ad groups for a specific campaign.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Ad Group Name",
    "status": "ENABLED"
  }
]
```

#### GET /api/keyword/{adGroupId}
Returns keywords for a specific ad group with optional query parameters.

**Query Parameters:**
- `start` (required): Start date in YYYY-MM-DD format
- `end` (required): End date in YYYY-MM-DD format
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 10)
- `search` (optional): Search term to filter keywords
- `sortField` (optional): Field to sort by ('keyword' or 'avgQs')
- `sortDirection` (optional): Sort direction ('asc' or 'desc')

**Response:**
```json
{
  "keywords": [
    {
      "id": 1,
      "keyword": "example keyword",
      "avgQs": 7.5
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 10
}
```

## Usage Flow

1. **Select Campaign**: Choose a campaign from the dropdown
2. **Select Ad Group**: Choose an ad group from the dropdown (enabled after campaign selection)
3. **Set Date Range**: Select start and end dates (enabled after ad group selection)
4. **View Keywords**: The keyword table will automatically load with pagination, search, and sorting capabilities

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **React Query** - Server state management
- **Axios** - HTTP client
- **react-day-picker** - Date range selection
- **date-fns** - Date utilities
- **Bun** - Package manager and runtime

## Project Structure

```
src/
├── components/          # React components
│   ├── AdGroupDropdown.tsx
│   ├── CampaignDropdown.tsx
│   ├── DateRangePicker.tsx
│   ├── DarkModeToggle.tsx
│   ├── KeywordTable.tsx
│   └── StatusBadge.tsx
├── hooks/              # Custom React hooks
│   ├── useDarkMode.ts
│   └── useDebounce.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── api.ts
├── App.tsx             # Root component
├── main.tsx            # Application entry point
└── index.css           # Global styles with Tailwind imports
```
