import { DataRange, parseRange } from "@/_data/events";
import { tz as timeZones } from "@/_data/timezones";
import { DashboardContext } from "@/components/dashboard/timezone";
import { Button } from "@/lib/ui/button";
import { Card } from "@/lib/ui/card";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

const RangeChart = dynamic(() => import("@/components/dashboard/range-chart"));
const TimezoneCombobox = dynamic(
  () => import("@/components/dashboard/timezone-combobox"),
);
const TotalChart = dynamic(() => import("@/components/dashboard/total-chart"));
const ProductChart = dynamic(
  () => import("@/components/dashboard/product-chart"),
);
const TopSearchTable = dynamic(
  () => import("@/components/dashboard/top-search-table"),
);
const TopProductTable = dynamic(
  () => import("@/components/dashboard/top-product-table"),
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
          <RangeChart
            event={"visit"}
            range={range}
            title="Page Views"
            color="#9333ea"
          />
          <RangeChart
            event={"unique-user"}
            range={range}
            title="New Viewers"
            color="#8b5cf6"
          />
          <RangeChart
            event={"login"}
            range={range}
            title="User Login"
            color="#6366f1"
          />
          <RangeChart
            event={"registration"}
            range={range}
            title="User Registration"
            color="#3b82f6"
          />
          <RangeChart
            event={"search"}
            range={range}
            title="Searches"
            color="#0ea5e9"
          />
          <RangeChart
            event={"order"}
            range={range}
            title="Orders"
            color="#06b6d4"
          />
          <ProductChart
            event={"product-purchase"}
            range={range}
            title="Purchased Products"
            color="#14b8a6"
          />
          <TotalChart
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
