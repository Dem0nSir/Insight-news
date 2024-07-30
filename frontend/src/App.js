import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Col, Container, Row, Card, CardImg, CardBody, CardTitle, CardText } from 'react-bootstrap';
import { fetchNews } from './api/newService';

function App() {
  const [news, setNews] = useState({ title: '', publishDate: '', image: '', brief: '', fullContent: '', keywords: [], hashtags: [] });
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchNews = async () => {
    setError(''); 
    setIsLoading(true); 
    try {
      const data = await fetchNews(url);
      setNews({
        title: data.title || 'No title found',
        publishDate: data.publishDate || 'No date found',
        image: data.image || 'No image available',
        brief: data.brief || 'No brief available',
        fullContent: data.fullContent || '',
        keywords: data.keywords || [],
        hashtags: data.hashtags || []
      });
    } catch (error) {
      setError('Failed to fetch news. Please check the URL and try again.');
    } finally {
      setIsLoading(false); // Set loading state to false after fetching or error
    }
  };

  useEffect(() => {
    // Handle potential initial URL (if provided)
    if (url) {
      handleFetchNews();
    }
  }, [url]); // Run effect only when url changes

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">News Scraper</h1>
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="d-flex align-items-center mb-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter article URL"
              className="form-control me-2"
            />
            <button onClick={handleFetchNews} className="btn btn-primary">
              {isLoading ? 'Loading...' : 'Fetch News'}
            </button>
          </div>
          {error && <p className="text-danger mb-3">{error}</p>}
          {news.title && (
            <Card className="mb-3">
              {news.image && (
                <CardImg top src={news.image} alt={news.title} />
              )}
              <CardBody>
                <CardTitle>{news.title}</CardTitle>
                <CardText>
                  <strong>Date:</strong> {news.publishDate}
                </CardText>
                <CardText><strong>Brief:</strong> {news.brief}</CardText>
                {/* <CardText><strong>Full Content:</strong></CardText>
                <div dangerouslySetInnerHTML={{ __html: news.fullContent }} /> */}
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
