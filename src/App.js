import React, { useEffect, useState, useRef } from "react";

function App() {
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  function handleEnter(e) {
    if (e.key === "Enter") {
      setTexts((prev) => [...prev, text]);
      setText("");
    }
  }
  function handleOpenModal(index) {
    if (texts[index].length < 6) return;
    setContent(texts[index]);
    setIsOpen(true);
  }
  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <div className="grid place-items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleEnter}
        className="pl-2 border-[1px] border-black rounded-md text-black outline-none focus:ring-lime-500 focus:ring-2"
      />
      {texts.length > 0 && (
        <ul className="grid gap-4">
          {texts.map((text, index) => (
            <li key={index} onClick={() => handleOpenModal(index)}>
              {text.length < 6 ? text : text.slice(0, 5) + "..."}
            </li>
          ))}
        </ul>
      )}
      {isOpen && (
        <Modal
          content={content}
          isOpen={isOpen}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}

function Modal({ content, isOpen, handleCloseModal }) {
  const modalRef = useRef(null);

  function handleClick(e) {
    if (!modalRef.current.contains(e.target)) handleCloseModal();
  }
  useEffect(() => {
    if (isOpen) document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen]);
  return (
    <div
      ref={modalRef}
      className="bg-lime-500 text-white fixed inset-12 md:inset-24 text-center p-4 rounded-lg"
    >
      <div className="h-full rounded-lg bg-slate-700 p-4">
        Full Text: {`"${content}"`}
      </div>
    </div>
  );
}

export default App;
