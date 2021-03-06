import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { postUpdated } from './postsSlice'

export const EditPostForm = ({ match }) => {
  const { postId } = match.params

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [userId, setUserId] = useState(post.user)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const dispatch = useDispatch()

  const users = useSelector((state) => state.users)
  const history = useHistory()
  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content, userId }))
      history.push(`/posts/${postId}`)
    }
  }
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <label htmlFor="postAuthor">Author:</label>

        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          {usersOptions}
        </select>
      </form>
      <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
        Save Post
      </button>
    </section>
  )
}
