import {
  Table,
  Heading,
  Link,
  Text,
  Box,
  HStack,
  Flex,
} from "@chakra-ui/react";
import type { Links } from "../pages/DashBoardPage";
import { formatDateTimeInput } from "./DateTime";
import Delete from "./Delete";
import Copying from "./Copying";
import Buttons from "./Buttons";
import { useNavigate } from "react-router-dom";

interface TablesSectionProps {
  links: Links[];
  loading: boolean;
  onDelete: (id: number) => void;
}

const TablesSection = ({ links, loading, onDelete }: TablesSectionProps) => {
  const navigate = useNavigate();
  
    
  if (loading) {
    return <Text mt='20px'>Loading...</Text>;
  }

  if (links.length === 0) {
    return (
      <Table.ScrollArea borderWidth="1px" maxW="xl">
        <Table.Root>
          <Table.Caption />
          <Table.Header>
            <Table.Row backgroundColor="#1E3A8A">
              <Table.ColumnHeader>Short link</Table.ColumnHeader>
              <Table.ColumnHeader>Original link</Table.ColumnHeader>
              <Table.ColumnHeader>Clicks</Table.ColumnHeader>
              <Table.ColumnHeader>Created </Table.ColumnHeader>
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign="center">
                You haven’t created any links yet
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    );
  }

  const handleHistoryClick = () => {
    navigate("/history");
  };

  return (
    <Box mt="30px" width="100%" overflowX={{ md: "hidden" }}>
      <Heading textAlign="center">Your links</Heading>
      <Table.ScrollArea
        borderWidth="1px"
        maxW={{ base: "100%", md: "100%" }}
        overflowX={{ base: "auto", md: "visible" }}
      >
        <Table.Root showColumnBorder size="md" width="100%">
          <Table.Caption />
          <Table.Header>
            <Table.Row backgroundColor="#1E3A8A">
              <Table.ColumnHeader>Short link</Table.ColumnHeader>
              <Table.ColumnHeader>Original link</Table.ColumnHeader>
              <Table.ColumnHeader>Clicks</Table.ColumnHeader>
              <Table.ColumnHeader>Created </Table.ColumnHeader>
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {links.map((link) => (
              <Table.Row key={link.id}>
                <Table.Cell>
                  <Link
                    href={link.short_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.short_url.length > 20
                      ? link.short_url.slice(0, 20) + "..."
                      : link.short_url}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  {link.long_url.length > 20
                    ? link.long_url.slice(0, 20) + "..."
                    : link.long_url}
                </Table.Cell>
                <Table.Cell>{link.clicks}</Table.Cell>
                <Table.Cell>
                  <Text></Text>

                  {formatDateTimeInput(link.created_at)}
                </Table.Cell>
                <Table.Cell>
                  <HStack>
                    <Delete id={link.id} onDelete={onDelete} />
                    <Copying value={link.short_url} />
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
      <Flex justifyContent="right" justifySelf="right" width={{base:"100%", md: "50%" }}>
        <Buttons mt="20px" onClick={handleHistoryClick}>View All Links</Buttons>
      </Flex>
    </Box>
  );
};

export default TablesSection;
