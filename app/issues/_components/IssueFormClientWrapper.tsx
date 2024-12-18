// IssueFormClientWrapper.tsx (component côté client)
"use client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./IssueFormSkeleton";
import { Issue } from "@prisma/client";

interface Props {
  issue?: Issue;
}

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export default function IssueFormClientWrapper(props: Props) {
  return <IssueForm {...props} />;
}
