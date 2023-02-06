import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Modal } from '../../components/Modal/Modal';
import { UserContext } from '../../context/UserContext';

export const Posts = () => {
  const { user } = useContext(UserContext);

  const title = useRef();
  const desc = useRef();
  const editTitle = useRef();
  const editDesc = useRef();

  const [postModal, setPostModal] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const [posts, setPosts] = useState([]);

  const getPost = async () => {
    const data = await axios.get('http://localhost:8080/posts');

    if (data) {
      setPosts(data.data);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const deletePosts = (postId) => {
    const filteredPost = posts.filter((post) => {
      if (post.id === postId) {
        axios
          .delete(`http://localhost:8080/posts/${postId}`)
          .catch((err) => console.log(err));

        getPost();
      }
    });
  };

  const editPosts = () => {
    setEditPostModal(true);
  };

  const handlePost = (evt) => {
    evt.preventDefault();

    axios
      .post('http://localhost:8080/posts', {
        title: title.current.value,
        desc: desc.current.value,
        author: user.first_name + ' ' + user.last_name,
      })
      .then((data) => {
        if (data.status === 201) {
          setPostModal(false);
          getPost();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (evt) => {
    evt.preventDefault();

    const findedPost = posts.find((post) => {
      if (post.id) {
        axios
          .put(`http://localhost:8080/posts/${post.id}`, {
            title: editTitle.current.value,
            desc: editDesc.current.value,
          })
          .catch((err) => console.log(err));
        getPost();
      }

      setEditPostModal(false);
    });

    posts.title = editTitle.current.value;
    posts.desc = editDesc.current.value;
  };

  return (
    <div>
      <button
        onClick={() => setPostModal(true)}
        className='mt-4 btn btn-success'
      >
        Add New Post
      </button>

      <h2 className='h2 text-center my-5'>Posts</h2>

      {posts.length ? (
        <div className='d-flex flex-wrap align-items-center justify-content-between gap-3 w-50 mx-auto'>
          {posts.map((post) => (
            <div
              key={post.id}
              className='card'
              style={{ width: '18rem' }}
            >
              <div className='card-body'>
                <h5 className='card-title'>{post.title}</h5>
                <p className='card-text'>{post.desc}</p>
                <p className='card-text'>{post.author}</p>
                <button
                  onClick={() => {
                    editPosts();
                  }}
                  className='btn btn-warning'
                >
                  EDIT
                </button>
                <button
                  onClick={() => deletePosts(post.id)}
                  className='btn btn-danger ms-3'
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
      {postModal ? (
        <Modal
          modal={postModal}
          setModal={setPostModal}
          title='Add Post'
        >
          <form onSubmit={handlePost}>
            <input
              className='form-control'
              ref={title}
              type='text'
              placeholder='Post title'
            />
            <input
              className='form-control my-3'
              ref={desc}
              type='text'
              placeholder='Post desc'
            />
            <button className='btn btn-primary'>SEND</button>
          </form>
        </Modal>
      ) : (
        ''
      )}

      {editPostModal ? (
        <Modal
          modal={editPostModal}
          setModal={setEditPostModal}
          title='Edit Post'
        >
          <form onSubmit={handleEdit}>
            <input
              className='form-control'
              ref={editTitle}
              type='text'
              placeholder='Edit Post Title'
            />
            <input
              className='form-control my-3'
              ref={editDesc}
              type='text'
              placeholder='Edit Post Desc'
            />
            <button className='btn btn-success'>SEND</button>
          </form>
        </Modal>
      ) : (
        ''
      )}
    </div>
  );
};
