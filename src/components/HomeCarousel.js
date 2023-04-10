import React, { Component } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "react-bootstrap";
import request from "utils/request";

// const items = [
//   {
//     src: "/assets/1.jpeg",
//     altText: "Slide 1",
//     caption: "Slide 1",
//   },
//   {
//     src: "/assets/2.jpeg",
//     altText: "Slide 2",
//     caption: "Slide 2",
//   },
//   {
//     src: "/assets/3.jpeg",
//     altText: "Slide 3",
//     caption: "Slide 3",
//   },
//   {
//     src: "/assets/4.jpeg",
//     altText: "Slide 4",
//     caption: "Slide 4",
//   },
//   {
//     src: "/assets/5.jpeg",
//     altText: "Slide 5",
//     caption: "Slide 5",
//   },
//   {
//     src: "/assets/6.jpeg",
//     altText: "Slide 6",
//     caption: "Slide 6",
//   },
//   {
//     src: "/assets/7.jpeg",
//     altText: "Slide 7",
//     caption: "Slide 7",
//   },
//   {
//     src: "/assets/8.jpeg",
//     altText: "Slide 8",
//     caption: "Slide 8",
//   },
// ];

class HomeCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0, items: [] };
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
    request.get("/ext/banners").then((res) => {
      if (res.data.code === 200 || res.data.code === 201) {
        this.setState({
          items: res.data.docs,
        });
      }
    });
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
            style={{ height: "300px", objectFit: 'cover', width: "100%" }}
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
