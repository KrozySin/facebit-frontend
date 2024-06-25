import { Button, Form, Modal } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import { FaPlay, FaPen } from "react-icons/fa";
import { useState } from "react";

const Auto = () => {
  const defaultData = [
    {
      name: "Martingel",
      code: "",
    },
    {
      name: "Hello World",
      code: "",
    },
  ];
  const [logics, setLogics] = useState(defaultData);

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [editHeader, setEditHeader] = useState(false);

  const [index, setIndex] = useState(-1);

  const handleClose = () => {
    setShow(false);
  };
  const createNew = () => {
    setIndex(-1);
    setTitle("untitled script");
    setCode("");
    setShow(true);
  };

  const update = (ind: number) => {
    console.log(ind);
    setIndex(ind);
    setTitle(logics[ind].name);
    setCode(logics[ind].code);
    setShow(true);
  };

  const onSave = () => {
    if (index === -1) {
      setLogics([
        ...logics,
        {
          name: title,
          code,
        },
      ]);
    } else {
      const data = [...logics];
      data[index].name = title;
      data[index].code = code;
      setLogics(data);
    }
    handleClose();
  };
  return (
    <>
      <Button
        variant="primary"
        className="mt-4 mb-4 button-30 small"
        size="sm"
        style={{
          height: "30px",
          float: "right",
        }}
        onClick={createNew}
      >
        Add New
      </Button>
      <SimpleBar className="logic-table table-color-white">
        <table>
          <tbody>
            {logics.map((data, ind) => (
              <tr key={`act_${ind}`}>
                <td>{data.name}</td>
                <td className="td_action">
                  <Button variant="danger" onClick={() => update(ind)}>
                    <FaPen />
                  </Button>
                  <Button variant="success" style={{ marginRight: "10px" }}>
                    <FaPlay />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SimpleBar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {editHeader ? (
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setEditHeader(false)}
            />
          ) : (
            <Modal.Title>{title}</Modal.Title>
          )}
          <FaPen
            style={{
              marginLeft: "10px",
            }}
            color="#777"
            onClick={() => setEditHeader(true)}
          />
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={10}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Auto;
