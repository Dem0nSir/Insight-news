import React, { useState, useEffect } from 'react';
import { fetchCategorizedNews, searchNews } from "../api/newService";
import 'bootstrap/dist/css/bootstrap.min.css';

const NewsComponent = () => {
  const [categorizedNews, setCategorizedNews] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCategorizedNews()
      .then(data => {
        const filteredData = Object.fromEntries(
          Object.entries(data).map(([category, articles]) => [
            category,
            articles.filter(isValidArticle)
          ])
        );
        setCategorizedNews(filteredData);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSearch = async () => {
    try {
      const data = await searchNews(searchQuery);
      setSearchResults(data.articles.filter(isValidArticle));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const isValidArticle = (article) => {
    return !(
      article.title === "[Removed]" &&
      article.description === "[Removed]" &&
      article.content === "[Removed]" &&
      article.author === null &&
      article.urlToImage === null &&
      article.url === "https://removed.com" &&
      article.publishedAt === "1970-01-01T00:00:00Z"
    );
  };

  const renderNewsCard = (article) => (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        {article.urlToImage && (
          <img src={article.urlToImage} className="card-img-top" alt={article.title} />
        )}
        <div className="card-body">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">{article.description || 'No description available'}</p>
          <p className="card-text">
            <small className="text-muted">
              {article.author ? `By ${article.author}` : 'Unknown author'} | 
              {new Date(article.publishedAt).toLocaleDateString()}
            </small>
          </p>
        </div>
        <div className="card-footer">
          <a href={article.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read More</a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4">News Search</h1>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control"
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Enter search query"
        />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>

      {searchResults.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-3">Search Results</h2>
          <div className="row">
            {searchResults.map((article, index) => (
              <React.Fragment key={index}>
                {renderNewsCard(article)}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      <h1 className="mb-4">Categorized News</h1>
      {Object.entries(categorizedNews).map(([category, articles]) => (
        articles.length > 0 && (
          <div key={category} className="mb-5">
            <h2 className="mb-3">{category}</h2>
            <div className="row">
              {articles.map((article, index) => (
                <React.Fragment key={index}>
                  {renderNewsCard(article)}
                </React.Fragment>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default NewsComponent;