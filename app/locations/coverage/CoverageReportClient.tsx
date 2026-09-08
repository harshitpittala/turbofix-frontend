"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { LocationInventoryEntry } from "@/data/locationInventory";

interface Props {
  inventory: LocationInventoryEntry[];
}

const ZONES = ["central", "west", "north", "south", "east", "outskirts", "unknown"] as const;

type CategoryFilter = "all" | "published" | "draft" | "alias" | "not-viable" | "needs-review";

const CATEGORY_LABELS: Record<CategoryFilter, string> = {
  all: "All",
  published: "Published",
  draft: "Draft",
  alias: "Duplicate / Alias",
  "not-viable": "Sub-unit (not standalone)",
  "needs-review": "Needs review",
};

function categoryOf(i: LocationInventoryEntry): Exclude<CategoryFilter, "all" | "needs-review"> {
  if (i.aliasOf) return "alias";
  if (!i.viable) return "not-viable";
  return i.status === "published" ? "published" : "draft";
}

export default function CoverageReportClient({ inventory }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [zoneFilter, setZoneFilter] = useState<string>("all");
  const [parentFilter, setParentFilter] = useState<string>("all");

  const parentOptions = useMemo(() => {
    const set = new Set<string>();
    for (const i of inventory) if (i.parentName) set.add(i.parentName);
    return [...set].sort();
  }, [inventory]);

  const stats = useMemo(() => {
    const published = inventory.filter((i) => categoryOf(i) === "published").length;
    const alias = inventory.filter((i) => categoryOf(i) === "alias").length;
    const notViable = inventory.filter((i) => categoryOf(i) === "not-viable").length;
    const draft = inventory.filter((i) => categoryOf(i) === "draft").length;
    const needsReview = inventory.filter((i) => i.flagForReview).length;
    return { total: inventory.length, published, alias, notViable, draft, needsReview };
  }, [inventory]);

  // "Where to look next": drafts grouped by zone and by parent locality, so
  // the next verification batch can be picked by cluster rather than
  // scrolling 337 rows alphabetically.
  const byZone = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const i of inventory) {
      if (categoryOf(i) !== "draft") continue;
      counts[i.zoneHint] = (counts[i.zoneHint] || 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [inventory]);

  const byParent = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const i of inventory) {
      if (categoryOf(i) !== "draft") continue;
      const key = i.parentName || "(no parent hint)";
      counts[key] = (counts[key] || 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 20);
  }, [inventory]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return inventory.filter((i) => {
      if (category === "needs-review") {
        if (!i.flagForReview) return false;
      } else if (category !== "all" && categoryOf(i) !== category) {
        return false;
      }
      if (zoneFilter !== "all" && i.zoneHint !== zoneFilter) return false;
      if (parentFilter !== "all" && i.parentName !== parentFilter) return false;
      if (q && !i.name.toLowerCase().includes(q) && !i.slug.includes(q)) return false;
      return true;
    });
  }, [inventory, query, category, zoneFilter, parentFilter]);

  return (
    <div style={{ background: "#02040F", minHeight: "100vh", color: "#e5e7eb", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 20px 80px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Location Coverage Report</h1>
        <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 24 }}>
          Internal review tool — not indexed, not linked from the public site. Every location from the
          supplied master list, deduplicated, cross-referenced against live pages.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
          {[
            { label: "Total distinct locations", value: stats.total, key: "all" as CategoryFilter },
            { label: "Published / indexable", value: stats.published, color: "#22C55E", key: "published" as CategoryFilter },
            { label: "Alias / duplicate", value: stats.alias, color: "#06B6D4", key: "alias" as CategoryFilter },
            { label: "Sub-unit (not standalone)", value: stats.notViable, color: "#8B5CF6", key: "not-viable" as CategoryFilter },
            { label: "Draft — needs research", value: stats.draft, color: "#F59E0B", key: "draft" as CategoryFilter },
            { label: "Flagged for review", value: stats.needsReview, color: "#EC4899", key: "needs-review" as CategoryFilter },
          ].map((s) => (
            <button
              key={s.label}
              onClick={() => setCategory(s.key)}
              style={{
                background: category === s.key ? "rgba(0,170,255,0.12)" : "rgba(255,255,255,0.04)",
                border: category === s.key ? "1px solid rgba(0,170,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "12px 18px",
                minWidth: 160,
                cursor: "pointer",
                textAlign: "left",
                font: "inherit",
                color: "inherit",
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 700, color: s.color || "#fff" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#9ca3af" }}>{s.label}</div>
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 24 }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 16, minWidth: 220 }}>
            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Drafts by zone — where to look next
            </div>
            {byZone.map(([zone, count]) => (
              <button
                key={zone}
                onClick={() => { setCategory("draft"); setZoneFilter(zone); }}
                style={{ display: "flex", justifyContent: "space-between", width: "100%", background: "none", border: "none", color: "#e5e7eb", padding: "3px 0", cursor: "pointer", font: "inherit", fontSize: 13 }}
              >
                <span>{zone}</span>
                <span style={{ color: "#F59E0B" }}>{count}</span>
              </button>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 16, minWidth: 280, flex: "1 1 320px" }}>
            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Top 20 parent localities by draft count — where to look next
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 16 }}>
              {byParent.map(([parent, count]) => (
                <button
                  key={parent}
                  onClick={() => { setCategory("draft"); setParentFilter(parent === "(no parent hint)" ? "all" : parent); }}
                  style={{ display: "flex", justifyContent: "space-between", background: "none", border: "none", color: "#e5e7eb", padding: "3px 0", cursor: "pointer", font: "inherit", fontSize: 13, textAlign: "left" }}
                >
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{parent}</span>
                  <span style={{ color: "#F59E0B", marginLeft: 8 }}>{count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
          <input
            placeholder="Search name or slug…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              padding: "8px 12px",
              color: "#fff",
              minWidth: 220,
            }}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryFilter)}
            style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", color: "#fff" }}
          >
            {(Object.keys(CATEGORY_LABELS) as CategoryFilter[]).map((c) => (
              <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
            ))}
          </select>
          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", color: "#fff" }}
          >
            <option value="all">All zones</option>
            {ZONES.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>
          <select
            value={parentFilter}
            onChange={(e) => setParentFilter(e.target.value)}
            style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", color: "#fff" }}
          >
            <option value="all">All parents</option>
            {parentOptions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <span style={{ marginLeft: "auto", fontSize: 13, color: "#6b7280", alignSelf: "center" }}>
            Showing {filtered.length} of {inventory.length}
          </span>
        </div>

        <div style={{ overflowX: "auto", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.04)", textAlign: "left" }}>
                <th style={{ padding: "10px 12px" }}>Name</th>
                <th style={{ padding: "10px 12px" }}>Slug</th>
                <th style={{ padding: "10px 12px" }}>Parent</th>
                <th style={{ padding: "10px 12px" }}>Zone</th>
                <th style={{ padding: "10px 12px" }}>Status</th>
                <th style={{ padding: "10px 12px" }}>Verified</th>
                <th style={{ padding: "10px 12px" }}>Indexable</th>
                <th style={{ padding: "10px 12px" }}>Sitemap</th>
                <th style={{ padding: "10px 12px" }}>Page URL</th>
                <th style={{ padding: "10px 12px", minWidth: 260 }}>Reason / status note</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((i) => {
                const cat = categoryOf(i);
                const catColor = { published: "#22C55E", alias: "#06B6D4", "not-viable": "#8B5CF6", draft: "#F59E0B" }[cat];
                return (
                  <tr key={i.name + i.slug} style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "8px 12px", fontWeight: 500 }}>
                      {i.name}
                      {i.flagForReview && <span title="Flagged for review" style={{ marginLeft: 6 }}>⚑</span>}
                    </td>
                    <td style={{ padding: "8px 12px", color: "#6b7280", fontSize: 12 }}>{i.slug}</td>
                    <td style={{ padding: "8px 12px", color: "#9ca3af" }}>{i.parentName || (i.status === "published" ? "—" : "—")}</td>
                    <td style={{ padding: "8px 12px", color: "#9ca3af" }}>{i.zoneHint}</td>
                    <td style={{ padding: "8px 12px" }}>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: `${catColor}22`, color: catColor }}>
                        {CATEGORY_LABELS[cat]}
                      </span>
                    </td>
                    <td style={{ padding: "8px 12px" }}>{i.verified ? "✓" : "—"}</td>
                    <td style={{ padding: "8px 12px" }}>{i.indexable ? "✓" : "—"}</td>
                    <td style={{ padding: "8px 12px" }}>{i.inSitemap ? "✓" : "—"}</td>
                    <td style={{ padding: "8px 12px" }}>
                      {i.status === "published" && i.publishedSlug ? (
                        <Link href={`/locations/${i.publishedSlug}`} style={{ color: "#00AAFF" }}>
                          /locations/{i.publishedSlug}
                        </Link>
                      ) : (
                        <span style={{ color: "#4b5563" }}>none yet</span>
                      )}
                    </td>
                    <td style={{ padding: "8px 12px", color: "#6b7280", fontSize: 12 }}>{i.reason}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
