import React, { Component } from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import TagCards from './TagCards';
import Options from './Options';
import { Button, Input, Form } from '../common';
import {
  descriptionValidity,
  categoryValidity
} from './CreateArticleValidations';


const ArticleDescription = ({
  image,
  title,
  onSubmit,
  onClick,
  body,
  category,
  tag,
  description,
  handleChange,
  taglist,
  removeTag,
  disable,
  allTags,
  allCategories,
  tagError,
  articleBody,
  descriptionError,
  handleBlur,
  handleFocus,
  categoryError,
  error
}) => {
  const imgClass = `fa fa-camera image-placeholder
  ${image.length ? 'full-height' : 'content-height'}`;
  return (
    <div>
      <Form className='' onSubmit={onSubmit('publish')}>
        <div className="flex row article-preview-container">
          <div className="article-card-container">
            <div className="article-card ">
              <h2 className="mustard-text center MonserratFont">
                New Post Preview
              </h2>
              <div className="image-input">
                <img src={image} alt="" className={imgClass} />
              </div>
              <div className="flex article-title-preview MonserratFont">
                <span className="mustard-text big-font bold">Title:</span>
                <div><strong>{title}</strong></div>
              </div>
              <div className="flex article-body-preview MonserratFont">
                <span className="mustard-text big-font bold">Body:</span>
                { ' ' }
                <div>{renderHTML(body)}</div>
              </div>
              <div className="flex edit-btn-wrapper MonserratFont">
                <Button
                  type="button"
                  disabled={disable}
                  className="btn btn-md edit-btn"
                  onClick={onClick}
                  label="Edit"
                />
              </div>

            </div>
          </div>
          <div className="other-article-details-container MonserratFont">
            <div className="flex column other-article-details">
              <label className="tags-block" htmlFor="myTags">
                <span
                  className="input-text"
                >
                  Add tags relating to your story:
                </span>
                <Input
                  list="tags"
                  id="myTags"
                  name="myTags"
                  value={tag}
                  placeholder={
                    taglist.split(',').length === 15 ? 'Tags Maximum Reached'
                      : ''
                  }
                  disabled={disable || taglist.split(',').length === 15}
                  onChange={handleChange('tags')}
                  onFocus={handleFocus('tagError')}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      (handleChange('tags'))(e);
                      e.preventDefault();
                    }
                  }}
                />
                <datalist id="tags">
                  <Options options={allTags} />
                </datalist>
                { tagError
                  && (
                    <p className="no-margin input-width input-error">
                      {tagError}
                    </p>
                  )}
              </label>
              <TagCards
                tags={taglist}
                removeTag={removeTag}
                disable={disable}
              />
              <br />
              <label className="category-block" htmlFor="categories">
                <span className="input-text">Choose a Category:</span>
                <select
                  id="categories"
                  disabled={disable}
                  value={category}
                  onChange={handleChange('category')}
                  onFocus={handleFocus('categoryError')}
                  onBlur={handleBlur('categoryError', categoryValidity)}
                  className="capitalize"
                  required
                >
                  <option value="">--Please choose an option--</option>
                  <Options options={allCategories} />
                </select>
              </label>
              { categoryError
                && (
                  <p className="no-margin input-width input-error">
                    {categoryError}
                  </p>
                )}
              <br />
              <label className="description-block" htmlFor="description">
                <span>Write a short description:</span>
                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  cols="33"
                  placeholder="Short Description"
                  value={description}
                  onChange={handleChange('description')}
                  disabled={disable}
                  onFocus={handleFocus('descriptionError')}
                  onBlur={handleBlur('descriptionError', descriptionValidity)}
                />
              </label>
              { descriptionError
                && (
                  <p className="no-margin input-width input-error">
                    {descriptionError}
                  </p>
                )}
              { error
                && (
                  <p className="no-margin center input-width input-error">
                    {Object.values(error)}
                  </p>
                )}
              <div className="flex row btn-wrapper-container">

                <div className="btn-wrapper">
                  <button
                    className="btn btn-md"
                    disabled={disable}
                    onClick={onSubmit('draft')}
                    type="button"
                  >
                    { disable ? 'Loading' : 'Save' }
                  </button>
                </div>
                { articleBody.length > 2 && (
                  <div className="btn-wrapper">
                    <Button
                      className="btn btn-md"
                      disabled={disable}
                      type="submit"
                      label={disable ? 'Loading' : 'Publish'}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

ArticleDescription.propTypes = {
  image: PropTypes.string,
  taglist: PropTypes.string,
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  body: PropTypes.string,
  tag: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  error: PropTypes.objectOf(PropTypes.string),
  articleBody: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tagError: PropTypes.string.isRequired,
  categoryError: PropTypes.string.isRequired,
  descriptionError: PropTypes.string.isRequired,
  disable: PropTypes.bool.isRequired,
  allTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  allCategories: PropTypes.arrayOf(PropTypes.string).isRequired
};

ArticleDescription.defaultProps = {
  title: '',
  image: '',
  body: '',
  taglist: '',
  error: {}
};

export default ArticleDescription;
