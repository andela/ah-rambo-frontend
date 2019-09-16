import React from 'react';
import PropTypes from 'prop-types';
import './ArticleSearchCard.scss';
import { Link } from 'react-router-dom';
import { clock } from '../../../assets/icons/index';

const dateTime = (date) => {
  const d = new Date(date);
  return d.toString().slice(0, 15);
};
const ArticleSearchCard = (props) => {
  const {
    searchResponse: {
      data
    }
  } = props;
  let totalResult;
  if (data.results.length) totalResult = Object.values(...data.results);
  return (
    <div>
      {
        (data.results.length !== 0) ? (
          totalResult.map((item, i) => (
            <Link to={`/article/${item.slug}`} key={i}>
              <div className="article__search__card">
                <div className="article__img__container">
                  <img src={item.image} alt="article Img" />
                </div>
                <div className="content">

                  <div>
                    <div className="article_title">{item.title.substring(0, 100)}</div>
                    <div className="article__description">
                      {item.description ? item.description.substring(0, 300) : ''}
                      {' '}
...
                    </div>
                  </div>
                  <div className="article_details__container">
                    <div className="article_details">
                      <span className="article__details__content">Authors Name</span>
                      <span className="article__details__content">{dateTime(item.publishedAt)}</span>
                      <span className="article__details__content">
                        <img src={clock} alt="read time" />
                    5min Read time
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : ' '
      }
    </div>
  );
};
ArticleSearchCard.propTypes = {
  searchResponse: PropTypes.shape({
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    itemsOnPage: PropTypes.number,
    data: PropTypes.shape({
      count: PropTypes.number,
      results: PropTypes.arrayOf(PropTypes.object)
    })
  }).isRequired
};

export default ArticleSearchCard;
