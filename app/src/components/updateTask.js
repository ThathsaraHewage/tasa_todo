import React, { useState } from 'react';
import Popup from './update_popup';

function PopupUpdate() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return <div>
    <input
      type="button"
      value="Click to Open Popup"
      onClick={togglePopup}
    />
    <p></p>
    {isOpen && <Popup
      content={<>
        <b>Design your Popup</b>
        <p></p>
        <button>Test button</button>
      </>}
      handleClose={togglePopup}
    />}
  </div>
}

export default PopupUpdate;