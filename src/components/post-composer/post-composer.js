import { useCallback, useEffect, useRef } from 'react';

import { PrimaryButton, SecondaryButton } from '../';
import './post-composer.css'

function submitOnEnter(event) {
    if (event.which === 13 && !event.shiftKey) {
        if (!event.repeat) {
            const newEvent = new Event("submit", { bubbles: true, cancelable: true });
            event.target.form.dispatchEvent(newEvent);
        }

        event.preventDefault();
    }
}

function PostCompose({ create, profile_id, isCreating }) {

    const textInput = useRef(null);
    const imagePreview = useRef(null);
    const previewContainer = useRef(null);
    const cancelButton = useRef(null);
    const postForm = useRef(null);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        const post = new FormData();

        if (e.target.image.files[0])
            post.append('image', e.target.image.files[0]);

        post.append('text', e.target.text.value);

        create(post, profile_id);

        e.target.reset();

        if (imagePreview.current) {
            imagePreview.current.removeAttribute('src');
            previewContainer.current.style.display = 'none';
        }

        cancelButton.current.style.opacity = 0;
        cancelButton.current.style.visibility = 'hidden';

    }, []);

    const handleFileUpload = useCallback((e) => {
        if (e.target.files) {
            var reader = new FileReader();

            reader.onload = (e) => {
                imagePreview.current.setAttribute('src', e.target.result);
            }

            previewContainer.current.style.display = 'block';
            reader.readAsDataURL(e.target.files[0]);

            cancelButton.current.style.opacity = 1;
            cancelButton.current.style.visibility = 'visible';
        }
    }, []);

    const clearInput = useCallback(() => {
        previewContainer.current.style.display = 'none';
        imagePreview.current.removeAttribute('src');

        postForm.current.reset();

        cancelButton.current.style.opacity = 0;
        cancelButton.current.style.visibility = 'hidden';
    }, []);

    const resizeTextArea = useCallback(() => {
        textInput.current.style.height = "";
        textInput.current.style.height = textInput.current.scrollHeight + "px";
    }, []);

    useEffect(() => {
        textInput.current.addEventListener("keydown", submitOnEnter);
        previewContainer.current.style.display = 'none';
    }, [textInput]);

    return (
        <>
            <div className='post-compose'>
                <div ref={previewContainer} className='post-image-preview'>
                    <img ref={imagePreview} />
                </div>
                <form ref={postForm} onSubmit={handleSubmit}>
                    <textarea ref={textInput} type='text' name='text' className='compose-body' onInput={resizeTextArea} placeholder='Write something...' />

                    <div className='compose-operations'>
                        <SecondaryButton refs={cancelButton} text={'Cancel'} classes={'cancel-button'} onClick={clearInput} />

                        <div className='file-upload'>
                            <label>
                                <input type="file" name='image' onChange={(e) => handleFileUpload(e)} />Upload image
                            </label>
                        </div>

                        <PrimaryButton classes={'submit-post'} text={'Post'} />
                    </div>
                </form>
            </div>

            {isCreating &&
                <div className='post-creating-loader'>
                    <div className='post-creating-animation'></div>
                </div>
            }
        </>
    )
}

export default PostCompose;