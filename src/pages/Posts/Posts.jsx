import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "../../components/Modal/Modal";
import { UserContext } from "../../context/UserContext";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

export const Posts = () => {
  const { user } = useContext(UserContext);

  const [postModal, setPostModal] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postsId, setPostId] = useState(0);

  const initialValues = {
    post_title: "",
    post_desc: "",
  };

  const validateSchema = Yup.object({
    post_title: Yup.string().required("Required!!!"),
    post_desc: Yup.string().required("Required!!!"),
  });

  const getPost = async () => {
    const data = await axios.get("http://localhost:8080/posts");

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

  const handlePost = (values) => {
    axios
      .post("http://localhost:8080/posts", {
        title: values.post_title,
        desc: values.post_desc,
        author: user.first_name + " " + user.last_name,
      })
      .then((data) => {
        if (data.status === 201) {
          setPostModal(false);
          getPost();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (values) => {
    const findedPost = posts.findIndex((post) => {
      if (post.id === postsId) {
        axios
          .put(`http://localhost:8080/posts/${post.id}`, {
            title: values.post_title,
            desc: values.post_desc,
            author: user.first_name + " " + user.last_name,
          })
          .catch((err) => console.log(err));
        getPost();
      }

      setEditPostModal(false);
    });
  };

  return (
    <div>
      <button
        onClick={() => setPostModal(true)}
        className="mt-4 btn btn-success"
      >
        Add New Post
      </button>

      <h2 className="h2 text-center my-5">Posts</h2>

      {posts.length ? (
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 w-50 mx-auto">
          {posts.map((post) => (
            <div key={post.id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.desc}</p>
                <p className="card-text">{post.author}</p>
                <button
                  onClick={() => {
                    editPosts();
                    setPostId(post.id);
                  }}
                  className="btn btn-warning"
                >
                  EDIT
                </button>
                <button
                  onClick={() => deletePosts(post.id)}
                  className="btn btn-danger ms-3"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      {postModal ? (
        <Modal modal={postModal} setModal={setPostModal} title="Add Post">
          <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
            onSubmit={handlePost}
          >
            <Form>
              <div>
                <Field
                  className="form-control"
                  name="post_title"
                  type="text"
                  placeholder="Post title"
                />
                <span className="text-danger">
                  <ErrorMessage name="post_title" />
                </span>
              </div>
              <div className="my-3">
                <Field
                  className="form-control"
                  name="post_desc"
                  type="text"
                  placeholder="Post desc"
                />
                <span className="text-danger">
                  <ErrorMessage name="post_desc" />
                </span>
              </div>
              <button type="submit" className="btn btn-primary">
                SEND
              </button>
            </Form>
          </Formik>
        </Modal>
      ) : (
        ""
      )}

      {editPostModal ? (
        <Modal
          modal={editPostModal}
          setModal={setEditPostModal}
          title="Edit Post"
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
            onSubmit={handleEdit}
          >
            <Form>
              <div>
                <Field
                  className="form-control"
                  name="post_title"
                  type="text"
                  placeholder="Edit Post Title"
                />
                <span className="text-danger">
                  <ErrorMessage name="post_title" />
                </span>
              </div>
              <div className="my-3">
                <Field
                  className="form-control"
                  name="post_desc"
                  type="text"
                  placeholder="Edit Post Desc"
                />
                <span className="text-danger">
                  <ErrorMessage name="post_desc" />
                </span>
              </div>
              <button type="submit" className="btn btn-success">
                SEND
              </button>
            </Form>
          </Formik>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};
