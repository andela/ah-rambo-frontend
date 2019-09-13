import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  HorizontalArticleCards,
  CategoryCard,
  VerticalArticleCard
} from '../common';
import Nav from './Nav';
import {
  MostLikedArticles,
  TotalCategories, TopCategories
} from '../../helpers/HomeMockData';
import {
  EducationIcon,
  TechnologyIcon,
  HealthIcon,
  FamilyIcon,
  NoImageIcon
} from '../../../assets';
import './Home.scss';
import {
  setToStorage,
  getFromStorage,
  clearFromStorage
} from '../../helpers/storageHelper';

/**
 * @class
 */
class Home extends Component {
  /**
   * @name componentDidMount
   * @returns {Null} Null
   */
  componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search);
    const params = ['token', 'username'].reduce((acc, value) => {
      acc[value] = queryParams.get(value);
      return acc;
    }, {});
    if (!getFromStorage('token') && params.token) setToStorage(params);
    if (document.querySelectorAll('hr').length > 1) {
      document.querySelectorAll('hr')[0].style.display = 'none';
    }
  }

  /**
   * @name componentDidUnmount
   * @returns {Null} Null
   */
  componentWillUnmount() {
    document.querySelector('hr').style.display = 'block';
  }

  /**
   * @name render
   * @returns {HTML} HTML DOM elements
   */
  render() {
    return (
      <>
        <Nav TotalCategories={TotalCategories(TopCategories)} />
        <hr />
        <div className="home-container">
          <main>
            <div className="flex row first-section-container container-padding">
              <Link to="/article/slug">
                <figure className="flex column big-card article-card-link">
                  <img className="top-image" src="https://picsum.photos/id/127/600/600" alt="hey" />
                  <figcaption className="flex column">
                    <h6>{MostLikedArticles[0].title}</h6>
                    <p className="description">
                      the tails of science adventures of tailand sailors navigating the seas. the
                      tails of science adventures of tailand sailors navigating the season in this
                      event...
                    </p>
                    <div className="flex fig-bottom-container">
                      <p className="author">HUGO FERNANDES</p>
                      <p className="">1 min Read</p>
                      <div className="like-dislike">
                        <span className="like">{MostLikedArticles[0].likesCount}</span>
                        <span className="dislike">{MostLikedArticles[0].dislikesCount}</span>
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </Link>
              <div className="flex column first-section-right">
                <HorizontalArticleCards />
                <HorizontalArticleCards />
                <HorizontalArticleCards />
              </div>
            </div>
          </main>
          <section className="vertical-container container-padding">
            <VerticalArticleCard />
            <VerticalArticleCard />
            <VerticalArticleCard />
            <VerticalArticleCard />
          </section>
          <section className="category">
            <CategoryCard image={EducationIcon} category="Education" />
            <CategoryCard image={HealthIcon} category="Family" />
            <CategoryCard image={FamilyIcon} category="Health" />
            <CategoryCard image={TechnologyIcon} category="Technology" />
          </section>
        </div>
      </>
    );
  }
}

export default Home;
