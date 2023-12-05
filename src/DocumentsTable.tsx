import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Document from "./interfaces/Document";
import { Button, Form, Modal } from "react-bootstrap";
import { DocumentType } from "./interfaces/Document";
const DocumentsTable = (props: any) => {
  const [show, setShow] = useState(false);
  const [editedDocument, setEditedDocument] = useState<Document | null>(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.documents.map((item: Document, key: number) => {
            return (
              <tr>
                <td>{key + props.pagination.start}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item?.description}</td>
                <td>
                  <Button
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      setEditedDocument(item);
                      handleShow();
                    }}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => props.delete(item.id)}>Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editedDocument?.name || ""}
                onChange={(e) =>
                  setEditedDocument({
                    ...editedDocument!,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                value={editedDocument?.type || ""}
                onChange={(e) =>
                  setEditedDocument({
                    ...editedDocument!,
                    type: e.target.value as DocumentType,
                  })
                }
              >
                <option value="PDF">PDF</option>
                <option value="TXT">TXT</option>
                <option value="XDOC">IMG</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={editedDocument?.description || ""}
                onChange={(e) =>
                  setEditedDocument({
                    ...editedDocument!,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => props.edit(editedDocument)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DocumentsTable;
