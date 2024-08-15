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
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Col, Container, Row, Card, Button, Form, Modal } from "react-bootstrap";
import { fetchNews } from "./api/newService";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import NewsComponent from "./components/Search";

function App() {
  const [news, setNews] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);

  const handleFetchNews = async (category = "") => {
    setError("");
    setIsLoading(true);
    try {
      const data = await fetchNews(category);
      console.log("Fetched News Data:", data); // Debugging
      setNews(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error in handleFetchNews:", error);
      setError(`Failed to fetch news: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = queryParams.get("category");

    // Default to "Technology" if no category is found in the URL
    const defaultCategory = categoryFromUrl || "technology";
    
    setSelectedCategory(defaultCategory);
    handleFetchNews(defaultCategory);

    // Update the URL if no category was originally provided
    if (!categoryFromUrl) {
      window.history.pushState({}, "", `/?category=${defaultCategory}`);
    }
  }, []);

  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected === "All categories" ? "" : selected);
    const newUrl = selected ? `/?category=${selected}` : "/";
    window.history.pushState({}, "", newUrl);
    handleFetchNews(selected);
  };

  const renderNewsCard = (article) => (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            className="card-img-top"
            alt={article.title}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">
            {article.description || "No description available"}
          </p>
          <p className="card-text">
            <small className="text-muted">
              {article.author ? `By ${article.author}` : "Unknown author"} |
              {new Date(article.publishedAt).toLocaleDateString()}
            </small>
          </p>
          <p className="card-text">
            <strong>Sentiment: </strong>
            {article.sentiment}
          </p>
        </div>
        <div className="card-footer">
          <a
            href={article.url}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <Container fluid className="py-5">
      <Row>
        <Navbar />
        <Col md={2} className="p-0">
          <Sidebar />
        </Col>
        <Col md={9} className="pt-5">
          <div className="feedpage">
            <div className="text-center mb-4 mt-3">
              <h1>Insight News</h1>
            </div>
            <NewsComponent />
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Button onClick={() => handleFetchNews(selectedCategory)} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <i className="bi bi-arrow-clockwise"></i> Refreshing...
                  </>
                ) : (
                  <>
                    <i className="bi bi-arrow-clockwise"></i> Refresh
                  </>
                )}
              </Button>
              {lastUpdated && (
                <p className="mb-0">
                  Last updated: {lastUpdated.toLocaleString()}
                </p>
              )}
            </div>
            <Form.Control
              as="select"
              className="arrow"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All categories</option>
              {Object.keys(news).map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </Form.Control>
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div>
                {error && <p className="text-danger">{error}</p>}
                {Object.keys(news).length === 0 && !error && (
                  <p className="text-center">No news articles found.</p>
                )}
                {selectedCategory ? (
                  <div>
                    <h1 className="mb-4">
                      {selectedCategory.charAt(0).toUpperCase() +
                        selectedCategory.slice(1)}{" "}
                      News
                    </h1>
                    {news[selectedCategory] &&
                    news[selectedCategory].length > 0 ? (
                      <div className="row">
                        {news[selectedCategory].map((article, index) => (
                          <React.Fragment key={index}>
                            {renderNewsCard(article)}
                          </React.Fragment>
                        ))}
                      </div>
                    ) : (
                      <p>No articles found for this category.</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <h1 className="mb-4">Select a Category</h1>
                    <p>
                      Please choose a category from the dropdown menu above to
                      view news articles.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Col>
      </Row>

{/* Welcome Popup */}
<Modal
  show={showWelcomePopup}
  onHide={() => setShowWelcomePopup(false)}
  centered
  backdrop="static"
  keyboard={false}
  dialogClassName="welcome-modal"
>
  <Modal.Header  className="border-0 justify-content-center">
    <Modal.Title className="w-100 text-center">👋 Welcome to Insight News!</Modal.Title>
  </Modal.Header>
  <Modal.Body className="text-center p-5">
    <p className="lead mb-4">Stay ahead with the latest updates. Let’s dive into the world of news!</p>
    <Button
      variant="primary"
      onClick={() => setShowWelcomePopup(false)}
      className="animate__animated animate__pulse animate__infinite"
    >
      Let’s Go!
    </Button>
  </Modal.Body>
</Modal>



    </Container>
  );
}

export default App;
