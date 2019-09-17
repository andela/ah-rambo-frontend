import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getArticle from '../../actions/comment/articleAction';
import Comment from '../Comment/Comment';


let slug;
let comments;
/**
 * @class
 */
class ReadArticle extends Component {
  /**
   * @name componentDidMount
   * @returns {Null} null
   */


  componentDidMount = async () => {
    const { props: { getComment, match: { params } }, getUserArticle } = this;
    slug = params.slug;
    await this.props.getArticle(slug);
    const { article } = this.props;
    comments = article.comments;
  }

  /**
   * @name render
   * @returns {HTML} HTML DOM elements
   */
  render() {
    const { article } = this.props;
    return (
      <>
        <div>Article</div>
        { article.comments && <Comment slug={slug} />}
      </>
    );
  }
}

ReadArticle.props = {
  getUserArticle: PropTypes.func.isRequired
};

export const mapStateToProps = ({
  readArticle: { loading, article, error }
}) => ({
  loading,
  article,
  error
});

const mapDispatchToProps = {
  getArticle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadArticle);
