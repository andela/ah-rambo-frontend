import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import Skeleton from 'react-skeleton-loader';
import getArticle from '../../actions/article/readArticle';
import ArticleAuthor from './ArticleAuthor';
import ArticleTags from './ArticleTags';
import ArticleOptions from './ArticleOptions';
import { getFromStorage } from '../../helpers/storageHelper';
import { isEmpty } from '../../helpers/utils';
import './ReadArticle.scss';

/**
 * @class
 * @param {String} userName
 */
export class ReadArticle extends Component {
  /**
   * @name componentDidMount
   * @returns {Null} null
   */
  componentDidMount() {
    const {
      getArticle: userArticles, history, match, article
    } = this.props;
    const { slug } = match.params;
    if (isEmpty(article)) userArticles(slug, history);
  }

  checkAuthor = (userName) => getFromStorage('username') === userName;

  /**
   * @name render
   * @returns {HTML} HTML DOM elements
   */
  render() {
    const { article, loading } = this.props;
    return (
      <div className="container">
        <main className="article-page">
          <section className="likes" />
          <section className="article">
            <div className="article-title-details">
              <b className="article-title">{article.title}</b>
              {(!article.Author && (
                <Skeleton count={2} width="700px" widthRandomness={0} />
              ))
                || (this.checkAuthor(article.Author.userName) && (
                  <ArticleOptions />
                ))}
            </div>
            <ArticleAuthor article={article} />
            <div>
              {(loading && <Skeleton count={1} width="800px" />) || (
                <img
                  src={article.image}
                  alt="article"
                  className="article-image"
                />
              )}
            </div>
            {(loading && <Skeleton count={3} width="800px" />)
              || (article.articleBody && (
                <div className="article-body">
                  {renderHTML(article.articleBody)}
                </div>
              ))}
            <ArticleTags article={article} />
            <ArticleAuthor article={article} />
          </section>
          <section className="aside" />
        </main>
      </div>
    );
  }
}

ReadArticle.propTypes = {
  getArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
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
