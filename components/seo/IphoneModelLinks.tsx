/**
 * IphoneModelLinks — crawlable links from the general service pages and the
 * iPhone brand page to the per-model iPhone pages, grouped by generation.
 */
import Link from "next/link";
import { iphoneModels, type IphoneServiceSlug } from "@/data/iphoneModels";
import { getIphoneService, iphoneServices, iphoneGuideSlug, iphoneGuideMeta } from "@/data/iphoneServicePages";

/** General /[service]-hyderabad page → matching per-model iPhone service. */
export const IPHONE_SERVICE_FOR_GENERAL_PAGE: Record<string, IphoneServiceSlug | undefined> = {
  "screen-replacement-hyderabad": "screen-replacement",
  "battery-replacement-hyderabad": "battery-replacement",
  "charging-port-service-hyderabad": "charging-port-service",
  "camera-service-hyderabad": "camera-service",
  "speaker-service-hyderabad": "speaker-microphone-service",
  "back-panel-replacement-hyderabad": "back-panel-replacement",
  "motherboard-service-hyderabad": "motherboard-replacement",
};

export default function IphoneModelLinks({ service }: { service?: IphoneServiceSlug }) {
  const svc = service ? getIphoneService(service) : undefined;
  const generations = Array.from(new Set(iphoneModels.map((m) => m.generation)));
  const heading = svc ? `${svc.h1Label(iphoneModels[0]).replace("Back Glass", "Back Glass / Panel")} by iPhone model` : "iPhone model guides";

  return (
    <section aria-labelledby="iphone-models-h" className="relative py-12 border-t border-slate-100 bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <h2 id="iphone-models-h" className="font-display text-2xl font-bold text-slate-900 mb-2">{heading}</h2>
        <p className="text-slate-500 text-sm mb-6">
          Symptoms, model-specific details and FAQs for each iPhone from the iPhone 11 to the iPhone 18 Pro Max.
        </p>
        <p className="text-sm text-slate-600 mb-6">
          {svc ? (
            <>All models compared: <Link href={`/${iphoneGuideSlug(svc.slug)}`} className="text-blue-700 hover:underline">{iphoneGuideMeta(svc).title}</Link></>
          ) : (
            <>Service guides:{" "}
              {iphoneServices.map((s, i) => (
                <span key={s.slug}>{i > 0 && " · "}<Link href={`/${iphoneGuideSlug(s.slug)}`} className="text-blue-700 hover:underline">{iphoneGuideMeta(s).title.replace(" in Hyderabad", "")}</Link></span>
              ))}
            </>
          )}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {generations.map((g) => (
            <div key={g}>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">iPhone {g} generation</h3>
              <ul className="space-y-1.5">
                {iphoneModels.filter((m) => m.generation === g).map((m) => (
                  <li key={m.slug}>
                    <Link href={svc ? `/${m.slug}/${svc.slug}` : `/${m.slug}`} className="text-sm text-blue-700 hover:underline">
                      {svc ? `${m.name} ${svc.label(m).toLowerCase()}` : m.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
