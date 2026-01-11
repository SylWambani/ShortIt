import { Table, Skeleton, Box, Heading } from "@chakra-ui/react";

interface TableSkeletonProps {
  rows?: number;
}

const TableSkeleton = ({ rows = 5 }: TableSkeletonProps) => {
  return (
    <Box mt="30px" borderWidth="1px" borderRadius="md" overflowX="auto">
      <Heading textAlign="center">Your links</Heading>
      <Table.Root width="100%">
        <Table.Header>
          <Table.Row backgroundColor="#1E3A8A">
            <Table.ColumnHeader>Short link</Table.ColumnHeader>
            <Table.ColumnHeader>Original link</Table.ColumnHeader>
            <Table.ColumnHeader>Clicks</Table.ColumnHeader>
            <Table.ColumnHeader>Created</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Array.from({ length: rows }).map((_, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Skeleton height="16px" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton height="16px" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton height="16px" width="40px" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton height="16px" width="100px" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton height="32px" width="80px" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default TableSkeleton;
