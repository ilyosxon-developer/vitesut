
import React from "react";
import { Table, Button, Dropdown, ButtonGroup, Form } from "react-bootstrap";
import { FaDownload, FaEye, FaEdit, FaTrash, FaUndo, FaSync } from "react-icons/fa";

const Invoice = () => {
  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form.Select style={{ width: "100px" }}>
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </Form.Select>

        <div>
          <Button variant="info" className="me-2">
            <FaUndo />
          </Button>
          <Button variant="warning" className="me-2">
            <FaSync />
          </Button>
          <Form.Control type="text" placeholder="Search..." style={{ display: "inline", width: "200px" }} />
        </div>
      </div>

      <Table bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>NO</th>
            <th>INVOICE</th>
            <th>ACCOUNT TYPE</th>
            <th>ISSUE DATE</th>
            <th>DUE DATE</th>
            <th>TOTAL AMOUNT</th>
            <th>DUE AMOUNT</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <Button variant="outline-success" size="sm">
                #FAKTURA00009
              </Button>
            </td>
            <td>Account</td>
            <td>03-02-2025</td>
            <td className="text-danger">03-02-2025</td>
            <td>UZS1.105.000,00</td>
            <td>UZS1.000.000,00</td>
            <td>
              <Button variant="warning" size="sm">
                Partially Paid
              </Button>
            </td>
            <td>
              <Button variant="success" size="sm" className="me-1">
                <FaDownload />
              </Button>
              <Button variant="primary" size="sm" className="me-1">
                <FaEye />
              </Button>
              <Button variant="secondary" size="sm" className="me-1">
                <FaEdit />
              </Button>
              <Button variant="danger" size="sm">
                <FaTrash />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <div className="d-flex justify-content-between">
        <div>Showing 1 to 1 of 1 entries</div>
        <div>
          <Button variant="success" size="sm" className="me-1">
            1
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
