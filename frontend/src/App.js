import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'react-bootstrap';
import { fetchNews } from './api/newService';

function App() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const handleFetchNews = async () => {
    setError('');
    setIsLoading(true);
    try {
      const data = await fetchNews();
      setNews(data.articles || []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error in handleFetchNews:', error);
      setError(`Failed to fetch news: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchNews();
  }, []);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Top Business News</h1>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button onClick={handleFetchNews} disabled={isLoading}>
          {isLoading ? 'Refreshing...' : 'Refresh News'}
        </Button>
        {lastUpdated && (
          <p className="mb-0">Last updated: {lastUpdated.toLocaleString()}</p>
        )}
      </div>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Row className="justify-content-center">
          {error && <p className="text-danger">{error}</p>}
          {!isLoading && news.length === 0 && !error && (
            <p className="text-center">No news articles found.</p>
          )}
          {news.map((article, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <Card>
                {article.urlToImage && (
                  <CardImg top src={article.urlToImage} alt={article.title} />
                )}
                <CardBody>
                  <CardTitle>{article.title}</CardTitle>
                  <CardText><strong>Author:</strong> {article.author || 'Unknown'}</CardText>
                  <CardText><strong>Date:</strong> {new Date(article.publishedAt).toLocaleDateString()}</CardText>
                  <CardText>{article.description}</CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default App;