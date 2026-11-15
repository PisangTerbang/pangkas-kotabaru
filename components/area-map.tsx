"use client";

import { IllustratedMap } from "@/components/illustrated-map";
import { map } from "@/lib/data";

export function AreaMap() {
  return (
    <IllustratedMap
      home={map.home}
      places={map.places}
      roads={map.roads}
      water={map.water}
      parks={map.parks}
      travel="jalan kaki"
      caption="Peta ilustrasi sekitar Pangkas Kotabaru"
      theme={{
        land: "#efe6d2",
        block: "#e4d8bf",
        road: "#f8f2e3",
        roadEdge: "#c9b48a",
        water: "#9fb8b0",
        park: "#cdd3a8",
        route: "#9c2a2f",
        pin: "#3d0f19",
        pinInk: "#d9b45a",
        place: "#3d0f19",
        label: "#3a2418",
      }}
      className="rounded-[16px]"
      listClassName="p-1 text-white sm:p-2"
      buttonClassName="rounded-lg border border-white/20 px-3.5 py-2.5 font-semibold text-white transition-colors hover:border-brass"
      activeButtonClassName="!border-brass !bg-brass !text-ink"
    />
  );
}
