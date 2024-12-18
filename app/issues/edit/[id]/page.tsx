import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueFormClientWrapper from "../../_components/IssueFormClientWrapper";

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(resolvedParams.id) },
  });

  if (!issue) notFound();

  return <IssueFormClientWrapper issue={issue} />;
};

export default EditIssuePage;
