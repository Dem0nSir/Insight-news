// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Col, Container, Row, Card, Button } from 'react-bootstrap';
// import { fetchNews } from './api/newService'
// import Sidebar from './components/Sidebar/Sidebar';
// import Likes from './components/Posts/Likes';
// import Save from './components/Posts/Save';
// import Comments from './components/Posts/Comments';
// import Navbar from './components/Navbar/Navbar';

// function App() {
//   const [news, setNews] = useState([]);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [likes, setLikes] = useState({});
//   const [saves, setSaves] = useState({});
//   const [comments, setComments] = useState({});

//   const handleFetchNews = async () => {
//     setError('');
//     setIsLoading(true);
//     try {
//       const data = await fetchNews();
//       setNews(data.articles || []);
//       setLastUpdated(new Date());
//     } catch (error) {
//       console.error('Error in handleFetchNews:', error);
//       setError(`Failed to fetch news: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     handleFetchNews();
//   }, []);

//   const handleLike = (index) => {
//     setLikes((prevLikes) => ({
//       ...prevLikes,
//       [index]: (prevLikes[index] || 0) + 1,
//     }));
//   };

//   const handleSave = (index) => {
//     setSaves((prevSaves) => ({
//       ...prevSaves,
//       [index]: !prevSaves[index],
//     }));
//   };

//   const handleComment = (index, comment) => {
//     if (comment) {
//       setComments((prevComments) => ({
//         ...prevComments,
//         [index]: [...(prevComments[index] || []), comment],
//       }));
//     }
//   };

//   return (
    
//     <Container fluid className="py-5">
//       <Row>
//       <Navbar/>
//         <Col md={3}>
//           <Sidebar />
//         </Col>
//         <Col md={9}>
//         <div className="feedpage">
//           <div className="text-center mb-4">
//             <h1>Top Business News</h1>
//           </div>
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <Button onClick={handleFetchNews} disabled={isLoading}>
//               {isLoading ? 'Refreshing...' : 'Refresh News'}
//             </Button>
//             {lastUpdated && (
//               <p className="mb-0">Last updated: {lastUpdated.toLocaleString()}</p>
//             )}
//           </div>
//           {isLoading ? (
//             <p className="text-center">Loading...</p>
//           ) : (
//             <div>
//               {error && <p className="text-danger">{error}</p>}
//               {!isLoading && news.length === 0 && !error && (
//                 <p className="text-center">No news articles found.</p>
//               )}
//               {news.map((article, index) => (
//                 <Card key={index} className="mb-4">
//                   {article.urlToImage && (
//                     <Card.Img variant="top" src={article.urlToImage} alt={article.title} />
//                   )}
//                   <Card.Body>
//                     <Card.Title>{article.title}</Card.Title>
//                     <Card.Text>
//                       <strong>Author:</strong> {article.author || 'Unknown'}
//                     </Card.Text>
//                     <Card.Text>
//                       <strong>Date:</strong> {new Date(article.publishedAt).toLocaleDateString()}
//                     </Card.Text>
//                     <Card.Text>{article.description}</Card.Text>
//                     <div className="d-flex justify-content-between mb-3">
//                       {/* <Likes count={likes[index] || 0} onLike={() => handleLike(index)} /> */}
//                       {/* <Comments
//                         comments={comments[index] || []}
//                         onComment={(comment) => handleComment(index, comment)}
//                       /> */}
//                       {/* <Save saved={saves[index]} onSave={() => handleSave(index)} /> */}
//                     </div>
//                   </Card.Body>
//                 </Card>
//               ))}
//             </div>
            
//           )}
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Card, Button, Form } from 'react-bootstrap';
import { fetchNews } from './api/newService';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  const [news, setNews] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const handleFetchNews = async () => {
    setError('');
    setIsLoading(true);
    try {
      const data = await fetchNews();
      setNews(data);
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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Container fluid className="py-5">
      <Row >
        <Navbar />
        <Col md={2} className="p-0">
          <Sidebar />
        </Col>
        <Col md={9} className='pt-5'>
          <div className="feedpage">
            <div className="text-center mb-4">
              <h1>Top News</h1>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Button onClick={handleFetchNews} disabled={isLoading}>
                {isLoading ? 'Refreshing...' : 'Refresh News'}
              </Button>
              {lastUpdated && (
                <p className="mb-0">Last updated: {lastUpdated.toLocaleString()}</p>
              )}
            </div>
            <Form.Group controlId="categorySelect" className="mb-4">
              <Form.Label>Select Category:</Form.Label>
              <Form.Control as="select" className="arrow" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">All categories</option>
                {Object.keys(news).map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div>
                {error && <p className="text-danger">{error}</p>}
                {Object.keys(news).length === 0 && !error && (
                  <p className="text-center">No news articles found.</p>
                )}
                {Object.entries(news).map(([category, articles]) => (
                  (selectedCategory === '' || selectedCategory === category) && (
                    <div key={category}>
                      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} News</h2>
                      {articles.map((article, index) => (
                        <Card key={index} className="mb-4">
                          {article.urlToImage && (
                            <Card.Img variant="top" src={article.urlToImage} alt={article.title} />
                          )}
                          <Card.Body>
                            <Card.Title>{article.title}</Card.Title>
                            <Card.Text>
                              <strong>Author:</strong> {article.author || 'Unknown'}
                            </Card.Text>
                            <Card.Text>
                              <strong>Date:</strong> {new Date(article.publishedAt).toLocaleDateString()}
                            </Card.Text>
                            <Card.Text>{article.description}</Card.Text>
                            <div className="d-flex justify-content-between mb-3">
                              {/* <Likes count={likes[index] || 0} onLike={() => handleLike(index)} /> */}
                              {/* <Comments
                                comments={comments[index] || []}
                                onComment={(comment) => handleComment(index, comment)}
                              /> */}
                              {/* <Save saved={saves[index]} onSave={() => handleSave(index)} /> */}
                            </div>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;