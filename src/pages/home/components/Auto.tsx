import { Button } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import { FaPlay } from "react-icons/fa";

const Auto = () => {
  const defaultData = [
    {
      name: "Martingel",
    },
    {
      name: "Hello World",
    },
    {
      name: "Martingel",
    },
    {
      name: "Hello World",
    },
    {
      name: "Martingel",
    },
    {
      name: "Hello World",
    },
    {
      name: "Martingel",
    },
    {
      name: "Hello World",
    },
    {
      name: "Martingel",
    },
    {
      name: "Hello World",
    },
    {
      name: "Martingel",
    },
    {
      name: "Hello World",
    },
  ];
  return (
    <>
      <Button
        variant="primary"
        className="mt-4 mb-4 button-30 small"
        size="sm"
        style={{
          height: "30px",
        }}
      >
        Add New
      </Button>
      <SimpleBar className="logic-table table-color-white">
        <table>
          <tbody>
            {defaultData.map((data, index) => (
              <tr key={`act_${index}`}>
                <td>{data.name}</td>
                <td>
                  <Button>
                    <FaPlay />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SimpleBar>
    </>
  );
};

export default Auto;
