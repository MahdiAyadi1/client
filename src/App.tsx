import { useEffect, useState } from "react";
import "./App.css";
import DocumentsTable from "./DocumentsTable";
import Document from "./interfaces/Document";
import DocumentApi from "./api/DocumentApi";
import Pagination from "./interfaces/Pagination";
import { Button, Form, Modal } from "react-bootstrap";
import { DocumentType } from "./interfaces/Document";
function App() {
  const axios = require("axios").default;
  const paginationStep = 5;
  const [show, setShow] = useState(false);
  const [editedDocument, setEditedDocument] = useState<Document | null>(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    start: 0,
    end: paginationStep - 1,
  });
  const [refresh, setRefresh] = useState(0);
  const fetchData = async () => {
    try {
      const api = new DocumentApi();
      const response = await api.get(pagination);
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };
  const updateDocument = async (documentToUpdate: Document) => {
    try {
      const api = new DocumentApi();
      const response = await api.update(documentToUpdate);
      setRefresh((old) => old + 1);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  const deleteDocument = async (documentId: string) => {
    try {
      const api = new DocumentApi();
      const response = await api.delete(documentId);
      setRefresh((old) => old + 1);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  const createDocument = async (documentToAdd: Document | null) => {
    try {
      const api = new DocumentApi();
      const documentWithCorrectType: Document = {
        ...documentToAdd!,
        type: documentToAdd?.type || DocumentType.PDF,
      };
      const response = await api.create(documentWithCorrectType as Document);
      setRefresh((old) => old + 1);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pagination, refresh]);
  return (
    <div className="App">
      <h4>Documents Table</h4>
      <DocumentsTable
        documents={documents}
        delete={deleteDocument}
        edit={updateDocument}
        pagination={pagination}
      />

      <Button
        style={{ margin: 10 }}
        onClick={() => {
          setPagination((old) => {
            return {
              start: old.start + paginationStep,
              end: old.end + paginationStep,
            };
          });
        }}
      >
        Next
      </Button>
      <Button
        style={{ margin: 10 }}
        onClick={() => {
          setPagination((old) => {
            return {
              start: old.start - paginationStep,
              end: old.end - paginationStep,
            };
          });
        }}
      >
        Back
      </Button>
      <Button
        style={{ margin: 10 }}
        onClick={() => {
          handleShow();
          setEditedDocument(null);
        }}
      >
        Add Document
      </Button>
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
                <option value="XDOC">XDOC</option>
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
          <Button
            variant="primary"
            onClick={() => {
              createDocument(editedDocument);
              console.log(editedDocument);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
