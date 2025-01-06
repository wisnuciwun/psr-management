import React, { Component } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "react-bootstrap";
import request from "utils/request";

const items = [
  {
    image_url: "/assets/1.webp",
    altText: "Slide 1",
    caption: "Slide 1",
  },
  {
    image_url: "/assets/2.webp",
    altText: "Slide 2",
    caption: "Slide 2",
  },
  {
    image_url: "/assets/3.webp",
    altText: "Slide 3",
    caption: "Slide 3",
  },
  {
    image_url: "/assets/4.webp",
    altText: "Slide 4",
    caption: "Slide 4",
  },
  {
    image_url: "/assets/5.webp",
    altText: "Slide 5",
    caption: "Slide 5",
  },
  {
    image_url: "/assets/6.webp",
    altText: "Slide 6",
    caption: "Slide 6",
  },
  {
    image_url: "/assets/7.webp",
    altText: "Slide 7",
    caption: "Slide 7",
  },
  {
    image_url: "/assets/8.webp",
    altText: "Slide 8",
    caption: "Slide 8",
  },
];

class HomeCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0, items: items };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === this.state.items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.state.items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  // const [index, setIndex] = useState(0);

  handleSelect = (selectedIndex, e) => {
    // setIndex(selectedIndex);
    this.setState({
      activeIndex: selectedIndex,
    });
  };

  componentDidMount() {
    // request.get("/ext/banners").then((res) => {
    //   if (res.data.code === 200 || res.data.code === 201) {
    //     this.setState({
    //       items: res.data.docs,
    //     });
    //   }
    // });
  }

  render() {
    const { activeIndex, items } = this.state;

    const slides = items.map((item) => {
      return (
        <Carousel.Item
          interval={2500}
          // onExiting={this.onExiting}
          // onExited={this.onExited}
          key={item.id}
          className="text-center"
        >
          <img
            style={{
              height: "300px",
              objectFit: "cover",
              width: "100%",
            }}
            src={item.image_url}
            alt={item.altText}
          />
          {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
        </Carousel.Item>
      );
    });

    return (
      <Carousel
        style={{ marginTop: "-20px" }}
        activeIndex={activeIndex}
        onSelect={this.handleSelect}
        prevIcon=""
        nextIcon=""
        // next={this.next}
        // previous={this.previous}
      >
        {slides}
        {/* <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} /> */}
      </Carousel>
    );
  }
}

export default HomeCarousel;
