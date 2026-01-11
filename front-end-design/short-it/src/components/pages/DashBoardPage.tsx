import { useEffect, useState } from "react";
import { toaster } from "../ui/toaster";
import { Box, Flex } from "@chakra-ui/react";
import IntentionalSection from "../sections/IntentionalSection";
import TablesSection from "../sections/TablesSection";
import axiosInstance from "../api/axiosInstance";
import Buttons from "../sections/Buttons";
import { useNavigate } from "react-router-dom";

export interface Links {
  id: number;
  long_url: string;
  short_url: string;
  created_at: string;
  clicks: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

const DashBoardPage = () => {
  const [links, setLinks] = useState<Links[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchLinks = async () => {
    try {
      const res = await axiosInstance.get<PaginatedResponse<Links>>(
        "/shorten-url/list-urls",
        {
          params: { page: 1, page_size: 5 },
        }
      );
      setLinks(res.data.results);
    } catch (err: any) {
      console.error("Error fetching links:", err);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchLinks();

    const interval = setInterval(() => {
      fetchLinks();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("loginSuccess")) {
      toaster.create({
        title: "Login successful",
        description: "Welcome back!",
        type: "success",
        duration: 3000,
        closable: true,
      });

      localStorage.removeItem("loginSuccess");
    }
  }, []);

  const handleHistoryClick = () => {
    navigate("/history");
  };

  return (
    <Box width="100%" padding={{ base: "5px", sm: "35px" }} pt="30px">
      <IntentionalSection isAuthenticated={true} onLinkCreated={fetchLinks} />
      <TablesSection links={links} loading={loading} onDelete={handleDelete} />
      <Flex
        justifyContent="right"
        justifySelf="right"
        width={{ base: "100%", md: "50%" }}
      >
        <Buttons mt="20px" onClick={handleHistoryClick}>
          View All Links
        </Buttons>
      </Flex>
    </Box>
  );
};

export default DashBoardPage;
