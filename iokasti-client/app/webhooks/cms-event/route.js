import { revalidateTag } from "next/cache";
import { CMS_ABOUT } from "@/lib/about";
import { CMS_LANDING_PAGE } from "@/lib/landingPage";
import { CMS_NOTEBOOK } from "@/lib/notebook";
import { CMS_PROJECTS, CMS_PROJECTS_PAGE } from "@/lib/projects";
import { CMS_FACILITATING } from "@/lib/facilitating";

export async function POST(request) {
  const payload = await request.json();

  if (payload.model === "about") {
    revalidateTag(CMS_ABOUT);
  }
  if (payload.model === "project") {
    revalidateTag(CMS_PROJECTS);
  }
  if (payload.model === "facilitating") {
    revalidateTag(CMS_FACILITATING);
  }
  if (payload.model === "landing-page") {
    revalidateTag(CMS_LANDING_PAGE);
  }
  if (payload.model === "notebook") {
    revalidateTag(CMS_NOTEBOOK);
  }
  if (payload.model === "project-page") {
    revalidateTag(CMS_PROJECTS_PAGE);
  }

  return new Response(null, { status: 204 });
}
