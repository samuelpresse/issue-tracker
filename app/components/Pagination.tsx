"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Select, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  // if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  const changePageSize = (pageSize: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageSize", pageSize.toString());
    params.set("page", "1");
    router.push("?" + params.toString());
  };

  return (
    <Flex justify="between">
      {pageCount > 1 && (
        <Flex align="center" gap="2">
          <Text size="2">
            Page {currentPage} of {pageCount}
          </Text>
          <Button
            color="gray"
            variant="soft"
            disabled={currentPage === 1}
            onClick={() => changePage(1)}
          >
            <DoubleArrowLeftIcon />
          </Button>
          <Button
            color="gray"
            variant="soft"
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            color="gray"
            variant="soft"
            disabled={currentPage === pageCount}
            onClick={() => changePage(currentPage + 1)}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            color="gray"
            variant="soft"
            disabled={currentPage === pageCount}
            onClick={() => changePage(pageCount)}
          >
            <DoubleArrowRightIcon />
          </Button>
        </Flex>
      )}

      <Flex align="center" gap="2">
        <Text size="2">Rows per page:</Text>
        <Select.Root
          defaultValue="10"
          onValueChange={(value) => changePageSize(parseInt(value))}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="5">5</Select.Item>
            <Select.Item value="10">10</Select.Item>
            <Select.Item value="15">15</Select.Item>
            <Select.Item value="20">20</Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Flex>
  );
};

export default Pagination;
