"use client";
import { Select } from "@radix-ui/themes";
import { Issue, Status } from "@prisma/client";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const STATUS_LABELS: Record<Status, string> = {
  [Status.OPEN]: "Open",
  [Status.IN_PROGRESS]: "In Progress",
  [Status.CLOSED]: "Closed",
};

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const changeStatus = async (status: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, { status });
      toast.success("Status updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <Select.Root defaultValue={issue.status || ""} onValueChange={changeStatus}>
      <Select.Trigger placeholder="Select a status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          {Object.entries(Status).map(([key, value]) => (
            <Select.Item key={key} value={value}>
              {STATUS_LABELS[value]}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default StatusSelect;
