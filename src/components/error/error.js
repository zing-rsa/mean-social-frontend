import { useEffect, useState } from 'react';

import { useError } from '../../providers/error.provider';
import './error.css'

function Error() {

    const [ visible, setVisible ] = useState(false);
    const { error, setError } = useError();

    useEffect(() => {
        if (error) {
            setVisible(true);
            setTimeout(() => {
                setError(null);
                setVisible(false);
            }, 5000);
        }
    }, [error]);
    
    return (
        visible && <div className="error">
            <button onClick={() => setError(null)}>click me</button>
        </div>
    )

}

export default Error;