import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import request from "utils/request";

const DetailNews = () => {
  const { id } = useParams();
  const [newsItem, setnewsItem] = useState({
    title: "",
    body: "",
    author: "",
  });

  const onGetNews = async () => {
    await request.get(`/news/${id}`).then((res) => {
      if (res.data.success) {
        setnewsItem(res.data.data);
      }
    });
  };

  useEffect(() => {
    onGetNews();
  }, []);

  const formattedMessage = newsItem.body.replace(/\r\n/g, "<br />");

  return (
    <>
      <div style={{ paddingLeft: 16, paddingRight: 16, textAlign: "justify" }}>
        <h5>{newsItem.title}</h5>
        <p style={{ fontSize: 12, fontWeight: "bold" }}>
          {moment(newsItem.created_at).format("DD MMMM YYYY")}
        </p>
        <div dangerouslySetInnerHTML={{ __html: formattedMessage }} />
        {/* <p style={{ fontSize: 14 }}>{newsItem.body}</p> */}
      </div>
    </>
  );
};

export default DetailNews;
