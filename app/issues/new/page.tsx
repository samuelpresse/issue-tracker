import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

// dynamic import are no longer supported for server component in newer version of next.js
// For a newer version of next.js, this need to be exported in a client component and then imported here
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
