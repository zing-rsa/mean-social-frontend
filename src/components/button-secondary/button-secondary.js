import './button-secondary.css'

const SecondaryButton = (props) => {
    return <button ref={props.refs} type='submit' className={`button-secondary ${props.classes}`} onClick={props.onClick}>{props.text}</button>
}

export default SecondaryButton;