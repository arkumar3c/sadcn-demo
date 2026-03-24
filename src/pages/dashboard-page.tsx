import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DashboardSection } from "@/components/dashboard-section"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"

import data from "@/data.json"

export function DashboardPage() {
  return (
    <DashboardSection>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </DashboardSection>
  )
}
