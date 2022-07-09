import React, { useState } from 'react'
import ReactS3Uploader from 'react-s3-uploader'

import {connect} from 'react-redux'
import TextArea from '../../others/input/textArea'
import {CPP} from '../../../actions/post'
import ProgressBar from "@ramonak/react-progress-bar";

const PostItMiddle = ({postIt, session, dispatch}) => {
  let {username} = session
  let {fileChanged, desc, previewImg, filter} = postIt

  let dp = (...args) => dispatch(CPP(...args))
  const [percentUploading, SetPercentUploading] = useState(null)

  const onUploadFinish = (data, file) => {
    SetPercentUploading(null)
    const imgPreview = `https://test-chat-like.s3.us-west-2.amazonaws.com/${data.fileKey}`
    dp('fileChanged', true)
    dp('targetFile', file)
    dp('s3Path', imgPreview)
    dp('previewImg', imgPreview)
  }

  const onUploadProgress = (percent) => {
    SetPercentUploading(percent)
  }

  let valueChange = e => dp('desc', e.target.value)

  const renderWhenUploaded = () => (
    <div>
      <div className="i_p_ta">
        <TextArea
          placeholder={`What's new with you, @${username}?`}
          value={desc}
          valueChange={valueChange}
          className="t_p_ta"
        />
      </div>
      <div className="i_p_img">
        <img src={previewImg} className={filter} alt='Image'/>
      </div>
    </div>
  )

  const renderUploadForm = () => (
    <form className="post_img_form" method="post">
      <label htmlFor="file_input" className='pri_btn'>
        Choose an image
        <ReactS3Uploader
          signingUrl="/users/s3/sign"
          signingUrlMethod="GET"
          accept="image/*"
          s3path="uploads/"
          onProgress={onUploadProgress}
          onFinish={onUploadFinish}
          uploadRequestHeaders={{'x-amz-acl': 'public-read'}}
          contentDisposition="auto"
          scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
          server="http://localhost:4000"
          autoUpload={true}
          id='file_input'
        />
      </label>
    </form>
  )

  const renderProgress = () => (
    <form className="post_img_form" method="post">
      <label className='pri_btn'>
        <ProgressBar completed={percentUploading} />
      </label>
    </form>
  )

  return (
    <div className="i_p_main p_main" style={{height: 296}}>
      {
        percentUploading ? renderProgress() : ( fileChanged ? renderWhenUploaded() : renderUploadForm())
      }
    </div>
  )
}

const mapStateToProps = state => ({
  session: state.User.session,
  postIt: state.Post.postIt,
})

export default connect(mapStateToProps)(PostItMiddle)
export {PostItMiddle as PurePostItMiddle}
