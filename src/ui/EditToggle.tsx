import styled from "styled-components";
import "react-toggle/style.css";

const EditToggleStyled = styled.div`
  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 16px; /* Réduire la hauteur à 20px */
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-toggle);
    box-shadow: var(--shadow-toggle);

    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 16px; /* Réduire la hauteur à 16px */
    width: 16px; /* Réduire la largeur à 16px */
    left: 0px; /* Ajuster la position left en conséquence */
    bottom: 0px; /* Ajuster la position bottom en conséquence */
    background-color: white;
    box-sizing: border-box;
    border: var(--color-gray-600) 1px solid;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: var(--bg-toggle-active);
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 10px; /* Ajuster le rayon du border-radius en conséquence */
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

type EditToggleChecked = {
    isChecked: boolean,
    handleChange: () => void;
}

function EditToggle({isChecked, handleChange} : EditToggleChecked): JSX.Element {


  return (
    <EditToggleStyled>
      <label className="switch">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => handleChange()}
        />
        <span className="slider round"></span>
      </label>
    </EditToggleStyled>
  );
}

export default EditToggle;
