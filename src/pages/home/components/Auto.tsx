import { Button, Form, Modal } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import { FaPlay, FaPen, FaStopCircle } from "react-icons/fa";
import { useEffect, useMemo, useRef, useState } from "react";
import { useWebsocket } from "../../../hook/useWebsocket";
import EventEmitter from "events";
import { useGameHistory } from "../../../hook/useGameHistory";

const Auto = () => {
  const eventEmitter = useMemo(() => {
    return new EventEmitter();
  }, []);
  const defaultData = [
    {
      name: "Martingel",
      code: `
      var betAmount = 10;
      var bust = 2;
      eventEmitter.on("starting", () => {
        engine.current.doBet(betAmount, bust);
      });
      
      eventEmitter.on("ongame", () => {
      });
      
      eventEmitter.on("ended", () => {
        if (engine.current.history[0].bust < bust) {
          betAmount = betAmount * bust;
        } else {
          betAmount = 10;
        }
      });`,
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const { status, doBet } = useWebsocket();
  const { history } = useGameHistory();

  const engine = useRef({
    history,
    doBet,
    Log: (data: string) => setLogs((prevLogs) => [...prevLogs, data]),
  });

  useEffect(() => {
    engine.current.history = history;
  }, [history]);

  useEffect(() => {
    eventEmitter.emit(status); // Emit starting event
  }, [status, eventEmitter]);

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

  const runScript = (scriptCode: string) => {
    engine.current.Log("Script has been started");
    try {
      const wrappedScript = `
        (function() {
          try {
            ${scriptCode}
          } catch (error) {
            throw error;
          }
        })();
      `;
      eval(wrappedScript);
    } catch (error: any) {
      console.error("Error running script:", error);
      setLogs((prevLogs) => [...prevLogs, `Error: ${error.message}`]);
    }
  };

  const handlePlay = (ind: number) => {
    setIndex(ind);
    setTitle(logics[ind].name);
    setCode(logics[ind].code);
    setIsPlaying(true);
    setLogs([]);
    runScript(logics[ind].code);
  };

  const handleStop = () => {
    setIsPlaying(false);
    eventEmitter.removeAllListeners();
  };

  return (
    <>
      {!isPlaying ? (
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
                      <Button
                        variant="success"
                        style={{ marginRight: "10px" }}
                        onClick={() => handlePlay(ind)}
                      >
                        <FaPlay />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SimpleBar>
        </>
      ) : (
        <>
          <Button
            variant={isPlaying ? "danger" : "success"}
            onClick={isPlaying ? handleStop : () => handlePlay(index)}
            style={{
              width: "100%",
              display: "block",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            {isPlaying ? (
              <>
                <FaStopCircle /> Stop
              </>
            ) : (
              <>
                <FaPlay /> Start
              </>
            )}
          </Button>
          <SimpleBar className="log-table table-color-white">
            <table>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={index}>
                    <td>{log}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SimpleBar>
        </>
      )}

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
