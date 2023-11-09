import { DataRange, parseRange } from "@/_data/events";
import { tz as timeZones } from "@/_data/timezones";
import ChartSkeleton from "@/components/dashboard/chart-skeleton";
import { TableSkeleton } from "@/components/dashboard/table-skeleton";
import { DashboardContext } from "@/components/dashboard/timezone";
import { Button } from "@/lib/ui/button";
import { Card } from "@/lib/ui/card";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import dynamic, { DynamicOptionsLoadingProps } from "next/dynamic";
import { cookies } from "next/headers";
import { Suspense } from "react";

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
    loading: () => <div className="h-10 w-full md:w-52 bg-muted rounded animate-pulse" />,
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
  return (
    <div className="p-8 flex flex-col gap-6">
      <DashboardContext timeZone={timeZone}>
        <Card className="p-2 flex flex-col md:flex-row justify-between flex-wrap gap-2 relative">
          <ul className="flex flex-row flex-wrap gap-1 w-full md:w-fit">
            <RangeItem range="hour" active={range == "hour"}>
              Last hour
            </RangeItem>
            <RangeItem range="day" active={range == "day"}>
              Last day
            </RangeItem>
            <RangeItem range="week" active={range == "week"}>
              Last week
            </RangeItem>
            <RangeItem range="month" active={range == "month"}>
              Last month
            </RangeItem>
          </ul>
          <TimezoneCombobox className="w-full md:w-fit" zones={timeZones} />
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <VisitChart
            event={"visit"}
            range={range}
            title="Page Views"
            color="#9333ea"
          />
          <NewViewersChart
            event={"unique-user"}
            range={range}
            title="New Viewers"
            color="#8b5cf6"
          />
          <UserLoginChart
            event={"login"}
            range={range}
            title="User Login"
            color="#6366f1"
          />
          <UserRegistrationChart
            event={"registration"}
            range={range}
            title="User Registration"
            color="#3b82f6"
          />
          <SearchesChart
            event={"search"}
            range={range}
            title="Searches"
            color="#0ea5e9"
          />
          <OrdersChart
            event={"order"}
            range={range}
            title="Orders"
            color="#06b6d4"
          />
          <PurchasedProductsChart
            event={"product-purchase"}
            range={range}
            title="Purchased Products"
            color="#14b8a6"
          />
          <RevenueChart
            event={"order"}
            range={range}
            title="Revenue"
            color="#10b981"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TopSearchTable
            title={"Most frequent searches"}
            event={"search"}
            term={"Search"}
            range={range}
          />
          <TopProductTable
            title={"Most purchased products"}
            event={"product-purchase"}
            term={"Product Purchase"}
            range={range}
          />
        </div>
      </DashboardContext>
    </div>
  );
}

function RangeItem({
  children,
  range,
  active,
}: {
  children: React.ReactNode;
  range: DataRange;
  active?: boolean;
}) {
  const action = async () => {
    "use server";
    cookies().set("dashboard-range", range, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  };

  return (
    <li className="flex-1 md:flex-none h-full">
      <form action={action} className="w-full">
        <Button
          variant="outline"
          className={cn("w-full", active && "border-primary")}
        >
          {children}
        </Button>
      </form>
    </li>
  );
}

function GhostChart() {
  return (
    <Card className="w-full p-4">
      <div className="w-full h-[14rem] bg-muted animate-pulse"></div>
    </Card>
  );
}
