import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import request from "utils/request";
import ProductCarousel from "components/ProductCarousel";
import { Helmet } from "react-helmet";

const StoreDetail = () => {
  const { slug } = useParams(); // Get the store ID from the URL
  const [store, setStore] = useState(null); // Store data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [activeIndex, setactiveIndex] = useState(0);

  useEffect(() => {
    // Fetch store details from the API
    const fetchStoreDetails = async () => {
      try {
        const response = await request.get(`/store/${slug}`);
        setStore(response.data.data);
      } catch (err) {
        setError("Failed to fetch store details.");
      } finally {
        setLoading(false);
      }
    };

    fetchStoreDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center mt-4">{error}</p>;
  }

  if (!store) {
    return <p className="text-center mt-4">Store not found.</p>;
  }

  const slides =
    store && store.product_images_url.length != 0
      ? store.product_images_url.split(",").map((item, id) => {
          return (
            <img
              key={id}
              style={{
                height: "400px",
                objectFit: "cover",
                width: "100%",
              }}
              src={`https://wisnuadiwardhana.my.id/psr/img/${item.replace(
                "public/images/",
                ""
              )}`}
            />
          );
        })
      : [];

  return (
    <div className="container mt-4">
      <Helmet>
        <title>{store.store_name}</title>
        <meta name="description" content={store.description} />
        <meta property="og:title" content={store.store_name} />
        <meta property="og:description" content={store.description} />
        {store.product_images_url != null && store.product_images_url != "" && (
          <meta
            property="og:image"
            content={`https://wisnuadiwardhana.my.id/psr/img/${store.product_images_url
              .split(",")[0]
              .replace("public/images/", "")}`}
          />
        )}
        <meta
          property="og:url"
          content={`https://barayaswarga.com/lapak/${store.slug}`}
        />
      </Helmet>
      <Card>
        <Card.Header>
          <h3>{store.store_name}</h3>
        </Card.Header>
        <ProductCarousel products={slides} />
        <Card.Body>
          <Card.Text>{store.description}</Card.Text>
          <Card.Text className="font-md">
            Posting oleh <strong> {store.owner} </strong> ({store.address})
          </Card.Text>
          <Card.Text className="font-md" style={{ marginTop: -10 }}>
            {store.tags}
          </Card.Text>
          <a
            href={`https://api.whatsapp.com/send?phone=${store.phone}&text=Assalamu'alaikum kak ${store.owner}. Jualan kah hari ini? Saya mau pesan ...`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#36a054",
            }}
            className="btn w-100"
          >
            Pesan via Whatsapp
          </a>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StoreDetail;