import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEventTransfer } from 'slate-react';
import Plain from 'slate-plain-serializer';
import Html from 'slate-html-serializer';
import Icon from 'react-icons-kit';
import { Value } from 'slate';
import {
  createArticle,
  getTags,
  getCategories
} from '../../actions/article/createArticle';
import ArticleBody from './ArticleBody';
import ArticleDescription from './ArticleDescription';
import { tagsValidity } from './CreateArticleValidations';
import './CreateArticle.scss';
import initialValue from './initialValue.json';
import { Button } from '../common';
import RULES from './SlateRules';

const serializer = new Html({ rules: RULES });

/**
 *
 *
 * @class CreateArticle
 * @extends {Component}
 */
export class CreateArticle extends Component {
  state = {
    articleBody: Value.fromJSON(initialValue),
    file: '',
    title: '',
    imageError: '',
    image: '',
    stage: 1,
    category: '',
    categoryError: '',
    tags: '',
    tagError: '',
    taglist: '',
    description: '',
    descriptionError: '',
    titleError: ''
  };

  schema = {
    blocks: {
      image: {
        isVoid: true,
      },
    },
  }

  /**
   *
   * @param {string} input input
   * @returns {function} event event
   * @memberof CreateArticle
   */
  handleChange = (input) => (event) => {
    const { value } = event.target || event;
    if (input === 'tags' && event.key === 'Enter') {
      this.handleTagChange(value);
    } else {
      this.setState({
        [input]: value
      });
    }
  };

  /**
   *
   * @param {string} value input
   * @returns {undefined} undefined
   * @memberof CreateArticle
   */
  handleTagChange = async (value) => {
    const { tags, taglist } = this.state;
    await this.setError('tagError',
      value.trim(),
      tagsValidity,
      taglist.split(','));
    const newTaglist = taglist ? `${taglist},${tags.trim()}` : `${tags.trim()}`;
    const { tagError } = this.state;
    if (tagError === '') {
      this.setState({
        tags: '',
        taglist: newTaglist
      });
    }
  };

  /**
   *
   * @param {string} input input
   * @returns {function} event event
   * @memberof CreateArticle
   */
  handleFocus = (input) => (event) => {
    if (event.key === 'Enter') return null;
    this.setState({
      [input]: ''
    });
  };

  /**
   *
   * @param {string} input input
   * @param {function} errorFunc validity function
   * @returns {function} event event
   * @memberof CreateArticle
   */
  handleBlur = (input, errorFunc) => (event) => {
    const { value } = event.target || event;
    this.setError(input, value, errorFunc);
  };

  /**
   *
   * @param {string} field field
   * @param {string} value value
   * @param {function} errorFunction validity function
   * @param {string} otherValue input
   * @returns {undefined} undefined
   * @memberof CreateArticle
   */
  setError = async (field, value, errorFunction, otherValue) => {
    const error = errorFunction(value, otherValue) || '';
    await this.setState({
      [field]: error
    });
  };

  /**
   *
   * @param {string} input input
   * @returns {function} e event
   * @memberof CreateArticle
   */
  removeTag = (input) => (e) => {
    const { taglist } = this.state;
    const newTagList = taglist
      .split(',')
      .filter((tag) => tag !== input)
      .join(',');
    this.setState({
      taglist: newTagList
    });
  };

  /**
   *
   * @param {string} input input
   * @returns {function} event event
   * @memberof CreateArticle
   */
  handleKeyPress = (input) => (event) => {
    if (event.key === 'Enter' || event.target.name === 'myTags') {
      return (this.handleChange('tags'))(event);
    }
    return (this.handleSubmit(input))(event);
  };

  /**
   *
   * @param {string} type input
   * @returns {function} event event
   * @memberof CreateArticle
   */
  handleSubmit = (type) => async (event) => {
    event.preventDefault();
    const {
      title,
      file,
      articleBody,
      description,
      tags,
      category,
      taglist,
      tagError,
      descriptionError,
      categoryError
    } = this.state;
    if (tagError || descriptionError || categoryError) return null;
    const status = articleBody && Plain.serialize(articleBody) < 1 ? 'draft' : type;
    const {
      history: { push },
      createArticleDispatch
    } = this.props;
    const formData = new FormData();
    if (file) {
      formData.append('image', file, file.filename);
    }
    if (title) {
      formData.append('title', title);
    }
    if (description) {formData.append('description', description);}
    formData.append('status', status);
    if (category) {formData.append('category', category);}
    if (taglist) { 
      formData.append('tags', taglist);
    }
    if (articleBody && Plain.serialize(articleBody)) {
      formData.append('articleBody', serializer.serialize(articleBody));
    }
    await createArticleDispatch(formData, push);
  };

  /**
   *
   * @param {element} editor editor
   * @returns {undefined} undefined
   * @memberof CreateArticle
   */
  ref = (editor) => {
    this.editor = editor;
  };

  /**
   *
   * @param {json} e event
   * @returns {undefined} undefined
   * @memberof CreateArticle
   */
  nextStage = (e) => {
    e.preventDefault();
    const { titleError, articleBodyError } = this.state;
    if (titleError || articleBodyError) return null;
    const { getAllTags, getAllCategories } = this.props;
    getAllTags();
    getAllCategories();
    const { stage } = this.state;
    this.setState({
      stage: stage + 1
    });
  };

  /**
   *
   * @returns {undefined} undefined
   * @memberof CreateArticle
   */
  prevStage = () => {
    const { stage } = this.state;
    this.setState({
      stage: stage - 1
    });
  };

  /**
   *
   * @returns {undefined} undefined
   * @param {object} event event
   * @param {object} editor editor
   * @param {func} next next
   * @memberof CreateArticle
   */
  onPaste = (event, editor, next) => {
    const transfer = getEventTransfer(event);
    if (transfer.type !== 'html') return next();
    const { document } = serializer.deserialize(transfer.html);
    editor.insertFragment(document);
  }

  /**
   *
   * @returns {undefined} undefined
   * @memberof CreateArticle
   */
  removeImage = () => {
    this.setState({
      image: '',
      file: ''
    });
  };

  /**
   *
   * @param {object} e event
   * @param {string} type type
   * @returns {undefined} undefined
   * @memberof CreateArticle
   */
  onMarkClick = (e, type) => {
    e.preventDefault();
    this.editor.toggleMark(type);
  };

  /**
   *
   * @param {object} img image
   * @returns {function} event event
   * @memberof CreateArticle
   */
  handleFileChange = (img) => (event) => {
    img.src = URL.createObjectURL(event.target.files[0]);
    const file = new Blob([event.target.files[0]], { type: 'image/png' });
    img.onload = () => {
      if (img.width > 500 && img.height > 500) {
        this.setState({
          image: img.src,
          file
        });
      } else {
        this.setState({
          imageError: 'Image size too small'
        });
      }
    };
  };

  /**
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = (type) => {
    const { articleBody } = this.state;
    return articleBody.activeMarks.some((mark) => mark.type === type);
  };

  /**
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = (type) => {
    const { articleBody } = this.state;
    return articleBody.blocks.some((node) => node.type === type);
  };

  /**
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickBlock = (event, type) => {
    event.preventDefault();
    const { editor } = this;
    const { value } = editor;
    const { document } = value;
    if (type !== 'unordered-list' && type !== 'ordered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        editor
          .setBlocks(isActive ? 'paragraph' : type)
          .unwrapBlock('unordered-list')
          .unwrapBlock('ordered-list');
      } else {
        editor.setBlocks(isActive ? 'paragraph' : type);
      }
    } else {
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some((block) => !!document.getClosest(block.key, (parent) => parent.type === type));

      if (isList && isType) {
        editor
          .setBlocks('paragraph')
          .unwrapBlock('unordered-list')
          .unwrapBlock('ordered-list');
      } else if (isList) {
        editor.unwrapBlock(
          type === 'ordered-list' ? 'ordered-list' : 'unordered-list'
        ).wrapBlock(type);
      } else {
        editor.setBlocks('list-item').wrapBlock(type);
      }
    }
  };

  /**
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (['ordered-list', 'unordered-list'].includes(type)) {
      const { articleBody: { document, blocks } } = this.state;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock('list-item') && parent && parent.type === type;
      }
    }

    return (
      <Button
        className={isActive ? 'tools darken' : 'tools lighten'}
        type="button"
        onPointerDown={(event) => this.onClickBlock(event, type)}
        label={<Icon icon={icon} />}
      />
    );
  };

  /**
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);

    return (
      <Button
        className={isActive ? 'tools darken' : 'tools lighten'}
        type="button"
        onPointerDown={(event) => this.onMarkClick(event, type)}
        label={<Icon icon={icon} />}
      />
    );
  }

  /**
   *
   *
   * @returns {JSX} jsx element
   * @memberof CreateArticle
   */
  render() {
    const {
      data: {
        createArticleReducer: {
          isLoading, allTags, allCategories, error
        }
      }
    } = this.props;
    const {
      image,
      title,
      stage,
      articleBody,
      tags,
      category,
      description,
      taglist,
      tagError,
      descriptionError,
      categoryError
    } = this.state;
    const passedState = { ...this.state };
    switch (stage) {
      case 1:
        return (
          <ArticleBody
            handleSubmit={this.nextStage}
            handleFileChange={this.handleFileChange}
            handleChange={this.handleChange}
            onMarkClick={this.onMarkClick}
            state={passedState}
            editorRef={this.ref}
            removeImage={this.removeImage}
            handleBlur={this.handleBlur}
            handleFocus={this.handleFocus}
            schema={this.schema}
            onPaste={this.onPaste}
            renderBlockButton={this.renderBlockButton}
            renderMarkButton={this.renderMarkButton}
          />
        );
      case 2:
        return (
          <ArticleDescription
            taglist={taglist}
            image={image}
            title={title}
            onSubmit={this.handleKeyPress}
            onClick={this.prevStage}
            body={Plain.serialize(articleBody)}
            category={category}
            tag={tags}
            description={description}
            handleChange={this.handleChange}
            removeTag={this.removeTag}
            disable={isLoading}
            allTags={allTags}
            tagError={tagError}
            descriptionError={descriptionError}
            allCategories={allCategories}
            handleBlur={this.handleBlur}
            handleFocus={this.handleFocus}
            articleBody={Plain.serialize(articleBody)}
            error={error}
            categoryError={categoryError}
          />
        );
      default:
        return <h1>Last Page</h1>;
    }
  }
}

export const mapDispatchToProps = (dispatch) => ({
  createArticleDispatch: (body, push) => dispatch(createArticle(body, push)),
  getAllTags: () => dispatch(getTags()),
  getAllCategories: () => dispatch(getCategories())
});

const mapStateToProps = (state) => ({
  data: state
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateArticle);

CreateArticle.propTypes = {
  history: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.any])
  ).isRequired,
  createArticleDispatch: PropTypes.func.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  getAllTags: PropTypes.func.isRequired,
  data: PropTypes.objectOf(
    PropTypes.oneOf([PropTypes.object, PropTypes.array])
  ).isRequired,

};
