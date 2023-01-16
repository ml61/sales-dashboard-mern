import React, { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";

function Customers() {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();

  const columns = useMemo(() => {
    return [
      {
        field: "_id",
        headerName: "ID",
        flex: 1,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 0.5,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "phoneNumber",
        headerName: "Phone Number",
        flex: 0.5,
        renderCell: (params) =>
          params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3"),
      },
      {
        field: "country",
        headerName: "Country",
        flex: 0.4,
      },
      {
        field: "role",
        headerName: "Role",
        flex: 1,
      },
    ];
  }, []);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Customers" subtitle="List of Customers" />
      <Box
        mt="20px"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
}

export default Customers;
