import {
  deserializeDataInPlace,
  getByRange,
  group,
  parseRange,
} from "@/_data/events";
import { json, notFound } from "@/lib/responses";
import { NextRequest } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: { name: string; range: string } },
) => {
  const range = parseRange(params.range);

  if (range) {
    const data = await getByRange(params.name, range);
    deserializeDataInPlace(data);
    return json(group(data, range));
  } else {
    return notFound({ error: "Invalid range" });
  }
};
