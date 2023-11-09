import { products } from "@/_data/products";
import {
  EventEmitter,
  OrderEventEmitter,
  TextEventEmitter,
} from "@/components/playground/emitters";
import { Card } from "@/lib/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
};

export default function Playground() {
  return (
    <div className="p-8 flex flex-col gap-4">
      <div>
        <p className="">
          This page contains event emitters for the events that are displayed in
          the dashboard.
          <br />
          Every time your reload this page, it counts as a page view.
          <br />
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Card className="flex gap-1 p-2 flex-wrap">
          <EventEmitter label={"Simulate User Login"} event={"login"} />
          <EventEmitter
            label={"Simulate User Registration"}
            event={"registration"}
          />
        </Card>

        <TextEventEmitter
          label={"Search"}
          event={"search"}
          placeholder="Search for something..."
        />
        <OrderEventEmitter label={"Place an order"} products={products} />
      </div>
    </div>
  );
}
