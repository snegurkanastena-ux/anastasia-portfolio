import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/pages/ServiceDetailContent";
import { translate } from "@/lib/i18n";
import { isServiceSlug, SERVICE_PAGES } from "@/lib/service-pages";

type Props = { params: Promise<{ service: string }> };

export function generateStaticParams() {
  return Object.keys(SERVICE_PAGES).map((service) => ({ service }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  if (!isServiceSlug(service)) notFound();

  const { path } = SERVICE_PAGES[service];
  const title = translate("ru", "serviceDetails." + service + ".title");
  const description = translate("ru", "serviceDetails." + service + ".intro");

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { service } = await params;
  if (!isServiceSlug(service)) notFound();

  return <ServiceDetailContent service={service} />;
}
