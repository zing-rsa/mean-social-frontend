import './button-primary.css'

const PrimaryButton = (props) => {
    return <button ref={props.refs} type='submit' className={`button-primary ${props.classes}`} onClick={props.onClick}>{props.text}</button>
}

export default PrimaryButton;