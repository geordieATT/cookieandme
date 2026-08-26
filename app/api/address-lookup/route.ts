import { NextRequest, NextResponse } from "next/server";

// Address autocomplete is proxied through here rather than called from the browser so the
// provider can be swapped (or given a key) without touching the client.
//
// Default provider is the public Photon instance, which is built on OpenStreetMap data,
// needs no API key, and is intended for type-ahead search. Set ADDRESS_LOOKUP_URL to point
// at a self-hosted Photon instance if the public one gets rate limited.
const PHOTON_URL = process.env.ADDRESS_LOOKUP_URL || "https://photon.komoot.io/api";

// Bounding box around New Zealand: minLon, minLat, maxLon, maxLat.
const NZ_BBOX = "166.0,-47.5,179.0,-34.0";

type PhotonFeature = {
  properties?: {
    countrycode?: string;
    housenumber?: string;
    street?: string;
    name?: string;
    district?: string;
    locality?: string;
    city?: string;
    county?: string;
    state?: string;
    postcode?: string;
  };
};

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q")?.trim() ?? "";

  // Too short to be meaningful — don't spend a request on it.
  if (query.length < 3) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const url = `${PHOTON_URL}?q=${encodeURIComponent(query)}&limit=8&lang=en&bbox=${NZ_BBOX}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "cookieandme.nz (address autocomplete)" },
      signal: AbortSignal.timeout(4000),
    });

    if (!res.ok) {
      console.error("Address lookup provider returned", res.status);
      return NextResponse.json({ suggestions: [] });
    }

    const data = (await res.json()) as { features?: PhotonFeature[] };
    const seen = new Set<string>();
    const suggestions: { address: string; postcode: string }[] = [];

    for (const feature of data.features ?? []) {
      const p = feature.properties;
      if (!p || p.countrycode !== "NZ") continue;

      const streetLine = p.housenumber && p.street
        ? `${p.housenumber} ${p.street}`
        : p.street || p.name;
      if (!streetLine) continue;

      const suburb = p.district || p.locality;
      const town = p.city || p.county;
      const address = [streetLine, suburb, town]
        .filter((part, i, arr) => part && arr.indexOf(part) === i)
        .join(", ");

      if (seen.has(address)) continue;
      seen.add(address);

      suggestions.push({ address, postcode: p.postcode ?? "" });
      if (suggestions.length >= 6) break;
    }

    return NextResponse.json({ suggestions });
  } catch (error) {
    // Autocomplete is a convenience: on any failure the customer can still type freely.
    console.error("Address lookup failed:", error);
    return NextResponse.json({ suggestions: [] });
  }
}
