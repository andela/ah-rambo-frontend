/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'slate-react';
import Icon from 'react-icons-kit';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { underline } from 'react-icons-kit/feather/underline';
import { code } from 'react-icons-kit/feather/code';
import { list2 } from 'react-icons-kit/icomoon/list2';
import { listNumbered } from 'react-icons-kit/icomoon/listNumbered';
import { ic_format_quote } from 'react-icons-kit/md/ic_format_quote';
import { ic_strikethrough_s } from 'react-icons-kit/md/ic_strikethrough_s'
import { Input, Button, Form } from '../common';
import { Tools, Actions, renderBlock, renderInline } from './ActionTools';
import FormatToolbar from './FormatToolbar';
import { titleValidity } from './CreateArticleValidations';

const img = new Image();

const ArticleBody = ({
  handleSubmit,
  handleFileChange,
  handleChange,
  handleBlur,
  handleFocus,
  onMarkClick,
  state,
  editorRef,
  removeImage,
  schema,
  onPaste,
  renderBlockButton,
  renderMarkButton
}) => {
  const {
    image, title, articleBody, articleBodyError, titleError, imageError
  } = state;
  const imgClass = `fa fa-camera image-placeholder ${image
    ? 'full-height' : 'content-height'}`;
  const classname = image ? 'btn-remove MonserratFont' : 'noDisplay';
  return (
    <div className="editor-container">
      <Form className="" onSubmit={handleSubmit}>
        <div className="text-container">
          <div className="image-input">
            <input
              name="File"
              type="file"
              id="File"
              accept=".png, .jpg, .jpeg, .gif"
              onChange={handleFileChange(img)}
              onFocus={handleFocus('imageError')}
            />
            <img src={image} alt="" className={imgClass} />
            {image && (
              <button type="button" onClick={removeImage} className={classname}>
                Remove
              </button>
            )}
          </div>
          {imageError
            && (
              <p className="input-error MonserratFont">
                {imageError}
              </p>
            )}
          <div>
            <Input
              type="text"
              name="title"
              value={title}
              onBlur={handleBlur('titleError', titleValidity)}
              onFocus={handleFocus('titleError')}
              onChange={handleChange('title')}
              className="editor-title MonserratFont"
              placeholder="Title"
              required
            />
            {titleError
              && (
                <p className="input-error MonserratFont">
                  {titleError}
                </p>
              )}
          </div>
          <FormatToolbar>
            {renderMarkButton('bold', bold)}
            {renderMarkButton('italic', italic)}
            {renderMarkButton('underline', underline)}
            {renderMarkButton('code', code)}
            {renderMarkButton('strikethrough', ic_strikethrough_s)}
            {renderBlockButton('ordered-list', list2)}
            {renderBlockButton('unordered-list', listNumbered)}
            {renderBlockButton('quote', ic_format_quote)}
 
          </FormatToolbar>
          <Editor
            ref={editorRef}
            className="editor MonserratFont"
            spellCheck
            placeholder="Inspire others with your story...."
            value={articleBody}
            schema={schema}
            onPaste={onPaste}
            renderBlock={renderBlock}
            renderInline={renderInline}
            onKeyDown={Tools}
            onChange={handleChange('articleBody')}
            renderMark={Actions}
          />
        </div>
        <div className="btn-article-container MonserratFont">
          <Button className="btn btn-md btn-article" label="Submit" />
        </div>
      </Form>
    </div>
  );
};

ArticleBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired,
  state: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number])
  ),
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  onMarkClick: PropTypes.func.isRequired,
  editorRef: PropTypes.func.isRequired
};

ArticleBody.defaultProps = {
  state: {
    title: '',
    image: '',
    articleBody: ''
  }
};

export default ArticleBody;
