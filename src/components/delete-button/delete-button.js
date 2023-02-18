import './delete-button.css'

function DeleteButton(props) {
    return (
        <button title={props.title} onClick={props.cb} className={`${props.classes} delete-button`}>
            <i className="fa-solid fa-trash-can"></i>
        </button>
    )
}

export default DeleteButton;