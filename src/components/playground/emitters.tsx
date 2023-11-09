"use client";

import { Button } from "@/lib/ui/button";
import { Card } from "@/lib/ui/card";
import { Input } from "@/lib/ui/input";
import { trackerClient } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";

export function EventEmitter({
  label,
  event,
}: {
  label: string;
  event: string;
}) {
  const onClick = () => {
    trackerClient.send(event, {});
  };
  return (
    <Button
      className="w-full md:w-fit active:shadow-inner active:scale-95"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export function TextEventEmitter({
  label,
  event,
  placeholder,
}: {
  label: string;
  event: string;
  placeholder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    if (!inputRef.current) return;
    const value = inputRef.current.value;
    if (!value || value.length < 3) return;

    trackerClient.send(event, { text: inputRef.current.value });
    inputRef.current.value = "";
  };
  const enterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      onClick();
    }
  };

  return (
    <Card className="w-full flex gap-1 p-2 flex-wrap">
      <Input
        className="w-full md:flex-1"
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onKeyDown={enterPressed}
      />
      <Button
        className="w-full md:w-fit active:shadow-inner active:scale-95"
        onClick={onClick}
      >
        {label}
      </Button>
    </Card>
  );
}

export function OrderEventEmitter({
  label,
  products,
}: {
  label: string;
  products: {
    title: string;
    description: string;
    price: number;
    img: string;
  }[];
}) {
  const init = {} as Record<string, number>;
  products.forEach((p) => (init[p.title] = 0));
  const [cart, setCart] = useState(init);

  const onClick = () => {
    const size = Object.keys(cart).reduce((p, n) => p + cart[n], 0);
    if (size == 0) return;

    Object.keys(cart).forEach((k) => {
      if (cart[k] > 0) {
        trackerClient.send("product-purchase", {
          product: k,
          quantity: cart[k],
        });
      }
    });

    const total = Object.keys(cart).reduce(
      (p, n) => p + (products.find((p) => p.title == n)?.price || 0) * cart[n],
      0,
    );

    trackerClient.send("order", { total: total });
    setCart(init);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="grid crid-cols-1 md:grid-cols-2 gap-2">
        {products.map(({ title, description, img, price }, i) => {
          const update = (v: number) => {
            setCart((c) => {
              if (c[title] + v < 0) return c;
              return {
                ...cart,
                [title]: c[title] + v,
              };
            });
          };

          return (
            <Card key={title} className="rounded p-2">
              <div className="flex flex-col md:flex-row">
                <div className="w-full h-[300px] md:h-[200px] md:w-[200px] relative rounded overflow-hidden">
                  <div className="absolute h-full w-full p-1 bg-muted animate-pulse"></div>
                  <Image
                    className="absolute z-10 h-full w-full object-cover"
                    src={img}
                    alt={title}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="flex-1 flex flex-col p-2 gap-4">
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="flex-1">{description}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xl text-muted-foreground font-bold">
                      {price.toFixed(2)}$
                    </p>
                    <div className="flex gap-1">
                      <div className="h-10 w-10 border border-border rounded flex items-center justify-center">
                        {cart[title]}
                      </div>
                      <Button
                        className="h-10 w-10 active:shadow-inner active:scale-95 bg-violet-500 dark:bg-violet-600 text-xl"
                        onClick={() => update(+1)}
                      >
                        +
                      </Button>
                      <Button
                        className="h-10 w-10 active:shadow-inner active:scale-95 bg-violet-500 dark:bg-violet-600 text-xl"
                        onClick={() => update(-1)}
                      >
                        -
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <Card className="p-2 w-full md:w-fit">
        <Button
          className="active:shadow-inner active:scale-95 w-full md:w-fit"
          onClick={onClick}
        >
          {label}
        </Button>
      </Card>
    </div>
  );
}

function getButtonColor(i: number) {
  const colors = ["#22c55e", "#10b981", "#14b8a6", "#06b6d4"];
  return colors[i % colors.length];
}
