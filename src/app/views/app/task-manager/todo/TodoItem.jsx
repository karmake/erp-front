import { Card, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  MdStar,
  MdError,
  MdOpenWith,
  MdMoreVert,
  MdStarBorder,
  MdErrorOutline
} from "react-icons/md";

export default function TodoItem({ todo = { tag: [] }, tagList, updateTodo, dragHandleProps }) {
  return (
    <Card className="rounded-0">
      <div className="d-flex align-items-center flex-wrap px-3 py-4">
        <Link
          as="div"
          to={`/todo/list/${todo.id}`}
          className="d-flex align-items-center flex-grow-1"
          {...dragHandleProps}>
          <MdOpenWith className="cursor-move mx-3" size={24} />

          <div>
            <p className="m-0 mb-12">{todo.title}</p>
            <p className="m-0 mb-12">{todo.note}</p>
            {todo.tag.map((tagId, index) => {
              let tagName = (tagList.find((tag) => tag.id === tagId) || {}).name;
              if (!tagName) return null;
              else {
                return (
                  <div
                    key={index}
                    className="me-12 badge rounded-pill bg-gray-400 text-13 text-primary p-2">
                    {tagList.find((tag) => tag.id === tagId).name}
                  </div>
                );
              }
            })}
          </div>
        </Link>

        <div className="d-flex flex-wrap align-items-center">
          <div
            className="p-2 btn-hover rounded-circle"
            onClick={() => updateTodo({ ...todo, important: !todo.important })}>
            {todo.important ? (
              <MdError className="text-danger cursor-pointer" size={24} />
            ) : (
              <MdErrorOutline className="cursor-pointer" size={24} />
            )}
          </div>

          <div
            className="p-2 btn-hover rounded-circle"
            onClick={() => updateTodo({ ...todo, starred: !todo.starred })}>
            {todo.starred ? (
              <MdStar className="text-warning cursor-pointer" size={24} />
            ) : (
              <MdStarBorder className="cursor-pointer" size={24} />
            )}
          </div>

          <Dropdown>
            <Dropdown.Toggle as="div" className="cursor-pointer toggle-hidden">
              <div className="p-2 btn-hover rounded-circle">
                <MdMoreVert size={24} />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div className="py-2 px-2">
                <label className="checkbox checkbox-primary mb-0">
                  <input
                    name="agree"
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => updateTodo({ ...todo, done: !todo.done })}
                  />
                  <span>{`Mark As ${todo.done ? "Und" : "D"}one`}</span>
                  <span className="checkmark" />
                </label>
              </div>

              <div className="py-2 px-2">
                <label className="checkbox checkbox-primary mb-0">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={todo.read}
                    onChange={() => updateTodo({ ...todo, read: !todo.read })}
                  />
                  <span>{`Mark As ${todo.read ? "Unr" : "R"}ead`}</span>
                  <span className="checkmark" />
                </label>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </Card>
  );
}
