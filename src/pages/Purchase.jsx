// Purchase.js
import React from "react";
import { Table, Button, Dropdown, ButtonGroup } from "react-bootstrap";

const Purchase = () => {
  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>All Purchases</h4>
        <Button variant="primary">+ Add</Button>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          Show
          <select className="mx-2">
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          entries
        </div>
        <div>
          <Button variant="outline-secondary" className="me-2">Export CSV</Button>
          <Button variant="outline-secondary" className="me-2">Export Excel</Button>
          <Button variant="outline-secondary" className="me-2">Print</Button>
          <Button variant="outline-secondary" className="me-2">Column visibility</Button>
          <Button variant="outline-secondary">Export PDF</Button>
        </div>
        <input type="text" placeholder="Search..." className="form-control w-auto" />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Action</th>
            <th>Date</th>
            <th>Reference No</th>
            <th>Location</th>
            <th>Supplier</th>
            <th>Purchase Status</th>
            <th>Payment Status</th>
            <th>Grand Total</th>
            <th>Payment due</th>
            <th>Added By</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Dropdown as={ButtonGroup}>
                <Button variant="secondary">Actions</Button>
                <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
            <td>30-01-2025 16:24</td>
            <td>PO2025/0034</td>
            <td>ustaxona</td>
            <td>BOZOR</td>
            <td><span className="badge bg-success">Received</span></td>
            <td><span className="badge bg-warning text-dark">Due</span></td>
            <td>$42,497.10</td>
            <td>Purchase: $42,497.10</td>
            <td>Erkinjon Xaydarov</td>
          </tr>
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center bg-light p-2">
        <strong>Total:</strong>
        <div>Due - 1</div>
        <div>$42,497.10</div>
        <div>
          Purchase Due - $42,497.10 <br /> Purchase Return - $0.00
        </div>
      </div>

      <div className="d-flex justify-content-end mt-2">
        <Button variant="outline-primary" className="me-2">Previous</Button>
        <Button variant="primary">1</Button>
        <Button variant="outline-primary" className="ms-2">Next</Button>
      </div>
    </div>
  );
};

export default Purchase;
