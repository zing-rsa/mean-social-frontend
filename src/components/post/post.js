import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import { PostInteractions, CommentCompose, DeleteButton, Comment, Loader, Avatar } from '../';
import { usePostComments } from '../../services/comment.service';
import { useAuth } from '../../providers/auth.provider';
import config from '../../config';
import './post.css'

const timestamp = (input) => {
    let date = input.split('T')[0]
    let time = input.split('T')[1]
    return date + ' ' + time.slice(0, 5)
}

function Post(props) {

    const { user } = useAuth();

    const { comments, setComments, isLoading, isError, createComment, deleteComment } = usePostComments();

    useEffect(() => {
        if (props.comments) {
            setComments(props.comments);
        }
    }, []);

    return (
        <div className='post-container' id={props._id}>
            <div className='post'>

                {props.image &&
                    <div className='post-image'>
                        <img src={config.media_url(props.image)} />
                    </div>
                }
                <div className='post-body'>
                    <div className='post-details'>
                        <div className='post-details-text'>

                            <div className='post-author'>
                                <Link to={`/profile/${props.owner._id}`}>{props.owner.name}&nbsp;{props.owner.surname}</Link>
                            </div>

                            <div className='post-meta'>
                                <div>{props.owner.username}</div>
                                <div>{timestamp(props.timestamp)}</div>
                            </div>

                        </div>
                        {(user.isAdmin || user._id === props.owner._id) &&
                            <div className='post-details-delete'>
                                <DeleteButton classes={'post-details-delete-button'} title={'Delete post'} cb={props.delete}/>
                            </div>
                        }
                        <div className='post-details-img'>
                            <Avatar classes={'author-avatar'} src={props.owner.avatar} link={`/profile/${props.owner._id}`}/> 
                        </div>
                    </div>

                    <div className='post-text-body'>
                        <span>{props.text}</span>
                    </div>

                    <div className='post-interactions'>
                        <PostInteractions post_id={props._id} likes={props.likes} />
                    </div>

                    <CommentCompose parent={props._id} create={createComment} />

                    {comments && !isError && !isLoading &&
                        comments.map((item, index) =>
                            <Comment key={item._id} delete={() => deleteComment(item._id, props._id)} {...item} />)
                    }
                    {isLoading && !isError &&
                        <Loader classes={'comments-loader'}/>
                    }
                    {isError &&
                        <div>
                            Oops
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}

export default Post;