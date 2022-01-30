import React , {useState} from "react";

const Notification = (props) => {

    //props - type, title, text

    const [title, setTitle] = useState(props.title);
    const [text, setText] = useState(props.text);
    const [show, setShow] = useState(true);

    const onClose = () => {
        
        setShow(false);

        setTimeout(() => {
            setTitle("");
            setText("");
        }, 300)
    }
    return(
        <div name="notifications" className='notification-area'>
			<div name="notification" className={`notification ${props.type} ${show ? 'transition-in' : 'transition-out'}`}>
				<div name="note-content" className="note-content">
					<strong>{props.title}</strong>
					<p>{props.text}</p>
				</div>
				<div name="close" className="close" onClick={onClose}>×</div>
			</div>
		</div>
    )
}

export default Notification;