import React, { Component } from 'react';
import { connect } from 'react-redux'
import { uploadImage } from '../../utils/redux/actions/'
import { binder } from '../../utils/'

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tagName: '',
      tagList: []
    }
    binder(this, ['handleSubmitForm', 'handleTagInputChange', 'handleAddTag', 'renderTags'])
  }

  handleTagInputchange (e) {
    this.setState({
      tagName: e.target.value
    })
  }

  handleAddTag () {
    if (this.state.tagList.length < 5) {
        this.setState({
        tagList: this.state.tagList.push(this.state.tagName)
      })
    } else {
      alert('you have already selected five tags')
    }
    this.setState({
      tagName: ''
    })
    
  }


  handleSubmitForm (e) {
    e.preventDefault()
    const { files } = this.imgInput
    files.length > 0 && this.props.onUploadImage(files[0])
  }

  renderTags () {
    this.state.tagList.map((tag, i) => {
      return <div className='tag'></div>
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmitForm}>
          <fieldset>
            <legend>Add up to five tags that describe your image</legend>
            <input onChange={this.handleTagInputChange} value={this.state.tagName} id='tag-input' name='tag-input' placeholder='Enter tag name here' type="text"/>
            <button onClick={this.handleAddTag}>add tag</button>
          </fieldset>
          <div className='tags'>{ this.renderTags }</div>
          <fieldset>
            <legend>Upload Photo</legend>
            <input id='image-upload' name='image-upload' ref={ref => this.imgInput = ref} placeholder='Please upload image' type="file"/>
          </fieldset>
          <button type='submit'>Upload</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    onUploadImage: imageFile => dispatch(uploadImage(imageFile))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
