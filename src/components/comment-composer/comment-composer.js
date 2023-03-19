import { useCallback, useRef } from 'react';

import { Loader, SecondaryButton } from '../'
import './comment-composer.css'


function CommentCompose({ parent, create, createLoading }) {

    const postButton = useRef(null);
    const postInput = useRef(null);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        create(e.target.comment.value, parent);

        e.target.reset();

        postButton.current.style.visibility = 'hidden';
        postInput.current.blur();
    }, []);

    const updateButton = (show) => {
        if (show) {
            postButton.current.style.opacity = show ? '1' : '0'; 
            postButton.current.style.visibility = show ? 'visible' : 'hidden';
        } else {
            postButton.current.style.opacity = show ? '1' : '0'; 
            setTimeout(() => {
                postButton.current.style.visibility = show ? 'visible' : 'hidden';
            }, 200);
        }
    }

    return (
        <div className='comment-composer'>
            <form onSubmit={handleSubmit}>
                <input ref={postInput} type='text' name='comment' className='comment-composer-body' placeholder="reply..." 
                onFocus={() => updateButton(true)} onBlur={() => updateButton(false)}></input>

                <SecondaryButton submit={true} refs={postButton} classes={'submit-comment'} text={'Post'} />

                {createLoading &&
                    <div className='comment-create-loader-container'>
                        <Loader classes={'comment-create-loader'} />
                    </div>
                }
            </form>
        </div>
    )
}

export default CommentCompose;