import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import { usePostComments } from '../../services/comment.service'
import CommentCompose from '../comment-composer/comment-composer';
import { getToken } from '../../services/storage.service';
import { useAuth } from '../../providers/auth.provider';
import api from '../../services/axios.service';
import Comment from '../comment/comment'
import Loader from '../loader/loader';
import config from '../../config';
import './post.css'


function Post(props) {

    const { user } = useAuth();

    const { comments, setComments, isLoading, isError, fetchComments } = usePostComments();

    useEffect(() => {
        if (props.comments){
            setComments(props.comments);
        }
    }, []);
    
    return (
        <div className='post-container'>
            <div className='post'>
                { props.image &&
                   <div className='post-image'>
                    <img src={config.media_url + 'posts/' + props.image}/>
                   </div>
                }
                <div className='post-details'>
                    <div className='post-author'>
                        <Link to={`/profile/${props.owner._id}`}>{props.owner.name}&nbsp;{props.owner.surname}</Link>
                    </div>
                    <div className='post-meta'>
                        <span>{props.timestamp}</span>
                    </div>
                    {(user.isAdmin || user._id === props.owner._id ) &&
                        <button onClick={() => props.delete(props._id)}>Delete</button>
                    }
                </div>
                <div className='post-body'>
                    <span>{props.text}</span>
                </div>
            </div>
            <CommentCompose parent={props._id} refresh={fetchComments} />
            {comments && !isError &&
                comments.map((item, index) =>
                    <Comment key={item._id} refresh={fetchComments} {...item} />)
            }
            {isLoading && !isError &&
                <Loader />
            }
            {isError &&
                <div>
                    Oops
                </div>
            }
        </div>

    )
}

export default Post;