import { useEffect, useState } from "react";
import { toaster } from "../ui/toaster";
import { Flex, Input, NativeSelect, Text, Box } from "@chakra-ui/react";
import axiosInstance from "../api/axiosInstance";
import Buttons from "../sections/Buttons";
import TablesSection from "../sections/TablesSection";

import type { Links } from "./DashBoardPage";

const HistoryPage = () => {
  const [links, setLinks] = useState<Links[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("-created_at");
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await axiosInstance.get(`/shorten-url/list-urls`, {
          params: { page, page_size: 10, search, ordering },
        });
        setLinks(res.data.results);
        setHasNext(Boolean(res.data.next));
        setHasPrev(Boolean(res.data.previous));
      } catch (err: any) {
        console.error("Error fetching links:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, [page, search, ordering]);

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/shorten-url/list-urls/${id}/`);

      setLinks((prev) => prev.filter((link) => link.id !== id));

      toaster.create({
        title: "Deleted",
        description: "Link deleted successfully",
        type: "success",
        duration: 2000,
      });
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <Box width="100%" padding={{ base: "5px", sm: "25px" }} pt="30px">
      <Input
        placeholder="Search links..."
        focusRingColor="#14B8A6"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        mb='5px'
      />

      <NativeSelect.Root>
        <NativeSelect.Field
          placeholder="Sort by"
          focusRingColor="#14B8A6"
          value={ordering}
          onChange={(e) => {
            setOrdering(e.target.value);
            setPage(1);
          }}
        >
          <option value="-created_at">Newest first</option>
          <option value="created_at">Oldest first</option>
          <option value="-clicks">Most clicked</option>
          <option value="clicks">Least clicked</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>

      <TablesSection links={links} loading={loading} onDelete={handleDelete} />
      <Flex
        width="50%"
        justify="space-between"
        mt={6}
        justifyContent="right"
        justifySelf="right"
      >
        <Buttons
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={!hasPrev}
        >
          Previous
        </Buttons>

        <Text m="0 10px" fontWeight="medium" fontSize="lg">
          Page {page}
        </Text>

        <Buttons onClick={() => setPage((p) => p + 1)} disabled={!hasNext}>
          Next
        </Buttons>
      </Flex>
    </Box>
  );
};

export default HistoryPage;
