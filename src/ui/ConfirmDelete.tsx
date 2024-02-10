type ConfirmDeleteProps = {
  onCloseModal?: () => void;
};

function ConfirmDelete({ onCloseModal }: ConfirmDeleteProps): JSX.Element {
  return (
    <div>
      Do you confirm to delete ?
      <button onClick={() => onCloseModal?.()}>Close</button>
    </div>
  );
}

export default ConfirmDelete;
