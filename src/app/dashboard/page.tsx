import { parseRange } from "@/_data/events";
import { tz as timeZones } from "@/_data/timezones";
import ChartSkeleton from "@/components/dashboard/chart-skeleton";
import { TableSkeleton } from "@/components/dashboard/table-skeleton";
import { DashboardContext } from "@/components/dashboard/dashboard-context";
import { Card } from "@/lib/ui/card";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { RangeItem } from "@/components/dashboard/range-item";
import NextTopLoader from "nextjs-toploader";
import { createPortal } from "react-dom";

const VisitChart = dynamic(() => import("@/components/dashboard/range-chart"), {
  loading: () => <ChartSkeleton title="Visit" color="#9333ea" />,
  ssr: false,
});

const NewViewersChart = dynamic(
  () => import("@/components/dashboard/range-chart"),
  {
    loading: () => <ChartSkeleton title="New Viewers" color="#8b5cf6" />,
    ssr: false,
  },
);

const UserLoginChart = dynamic(
  () => import("@/components/dashboard/range-chart"),
  {
    loading: () => <ChartSkeleton title="User Login" color="#6366f1" />,
    ssr: false,
  },
);

const UserRegistrationChart = dynamic(
  () => import("@/components/dashboard/range-chart"),
  {
    loading: () => <ChartSkeleton title="User Registration" color="#3b82f6" />,
    ssr: false,
  },
);

const SearchesChart = dynamic(
  () => import("@/components/dashboard/range-chart"),
  {
    loading: () => <ChartSkeleton title="Searches" color="#0ea5e9" />,
    ssr: false,
  },
);

const OrdersChart = dynamic(
  () => import("@/components/dashboard/range-chart"),
  {
    loading: () => <ChartSkeleton title="Orders" color="#06b6d4" />,
    ssr: false,
  },
);

const PurchasedProductsChart = dynamic(
  () => import("@/components/dashboard/product-chart"),
  {
    loading: () => <ChartSkeleton title="Purchased Products" color="#14b8a6" />,
    ssr: false,
  },
);

const RevenueChart = dynamic(
  () => import("@/components/dashboard/total-chart"),
  {
    loading: () => <ChartSkeleton title="Revenue" color="#10b981" />,
    ssr: false,
  },
);

const TimezoneCombobox = dynamic(
  () => import("@/components/dashboard/timezone-combobox"),
  {
    loading: () => (
      <div className="h-10 w-full md:w-52 bg-muted rounded animate-pulse" />
    ),
    ssr: false,
  },
);

const TopSearchTable = dynamic(
  () => import("@/components/dashboard/top-search-table"),
  {
    loading: () => (
      <TableSkeleton title="Most frequent searches" term="Search" />
    ),
    ssr: false,
  },
);

const TopProductTable = dynamic(
  () => import("@/components/dashboard/top-product-table"),
  {
    loading: () => (
      <TableSkeleton title="Most purchased products" term="Product Purchase" />
    ),
    ssr: false,
  },
);

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const range = parseRange(cookies().get("dashboard-range")?.value) || "day";
  const timeZone =
    cookies().get("user-timezone")?.value ||
    Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
  const dataRange =
    parseRange(cookies().get("dashboard-range")?.value) || "day";

  return (
    <>
      <div className="p-8 flex flex-col gap-6">
        <DashboardContext timeZone={timeZone} dataRange={dataRange}>
          <Card className="p-2 flex flex-col md:flex-row justify-between flex-wrap gap-2 relative">
            <ul className="flex flex-row flex-wrap gap-1 w-full md:w-fit">
              <RangeItem target="hour">Last hour</RangeItem>
              <RangeItem target="day">Last day</RangeItem>
              <RangeItem target="week">Last week</RangeItem>
              <RangeItem target="month">Last month</RangeItem>
            </ul>
            <TimezoneCombobox className="w-full md:w-fit" zones={timeZones} />
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <VisitChart event={"visit"} title="Page Views" color="#9333ea" />
            <NewViewersChart
              event={"unique-user"}
              title="New Viewers"
              color="#8b5cf6"
            />
            <UserLoginChart
              event={"login"}
              title="User Login"
              color="#6366f1"
            />
            <UserRegistrationChart
              event={"registration"}
              title="User Registration"
              color="#3b82f6"
            />
            <SearchesChart event={"search"} title="Searches" color="#0ea5e9" />
            <OrdersChart event={"order"} title="Orders" color="#06b6d4" />
            <PurchasedProductsChart
              event={"product-purchase"}
              title="Purchased Products"
              color="#14b8a6"
            />
            <RevenueChart event={"order"} title="Revenue" color="#10b981" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TopSearchTable
              title={"Most frequent searches"}
              event={"search"}
              term={"Search"}
            />
            <TopProductTable
              title={"Most purchased products"}
              event={"product-purchase"}
              term={"Product Purchase"}
            />
          </div>
        </DashboardContext>
      </div>
    </>
  );
}
