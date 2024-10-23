import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Card, Col, Row } from "react-bootstrap";

const paginationModel = { page: 0, pageSize: 10 };

export default function TableViewComp({ name, columns, rows }) {
  return (
    <Card className="mb-4">
      <Card.Header
        as="h2"
        className="text-uppercase text-center"
        style={{ fontSize: "1.5rem", fontWeight: "bold" }}
      >
        {!name ? "Information" : name}
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Paper sx={{ height: "calc(100vh - 200px)", width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 15, 20, 25, 50, 100]}
                sx={{
                  border: "1px solid #eee",
                  padding: "2rem",
                  "& .MuiDataGrid-root": {
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f5f5f5",
                    borderBottom: "2px solid rgba(0, 0, 0, 0.12)",
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    fontWeight: "bold",
                  },
                }}
              />
            </Paper>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
