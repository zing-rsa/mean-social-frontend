import { useEffect, useRef, useState } from 'react';

import { CSSTransition } from 'react-transition-group';

import { useError } from '../../providers/error.provider';
import './error.css'

function Error() {

    const [ visible, setVisible ] = useState(false);
    const { error, setError } = useError();

    const errorDisplay = useRef();

    useEffect(() => {
        if (error) {
            setVisible(true);
            setTimeout(() => {
                setVisible(false);
            }, 5000);
            setTimeout(() => {
                setError(null);
            }, 5500);
        }
    }, [error]);
    
    return (
        <CSSTransition nodeRef={errorDisplay} in={visible} timeout={300} classNames='e-transition'>
            <div ref={errorDisplay} className='error'>
                <div className='error-text'>
                    {error}
                </div>
            </div>
        </CSSTransition>
    )

}

export default Error;